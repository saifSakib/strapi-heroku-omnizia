'use strict';

/**
 * tag service.
 */


const { createCoreService } = require("@strapi/strapi").factories;
const path = require("path");
const {Worker} = require('node:worker_threads');
const { errors } = require('@strapi/utils');
const {NotFoundError ,ForbiddenError} = errors;
module.exports = createCoreService("api::tag.tag", ({ strapi }) => ({
  
  async findOneByTagID(ctx) {
    try {
      const { slug } = ctx.params;
      const entry = await strapi.db.query('api::tag.tag').findOne({
          where: { tagid: slug },
          populate: {
            articles: true,
          },
      });
      return entry
    } catch (error) {
      console.log("error=======",error); 
    }
  },
  
  async syncTags(ctx) {
    try {
        const payload = ctx.request.body.data;
        let result = []
        let res;
        const MAX_SIZE = 1000;
        const chunkSize = 500;
        for (let i = 0; i < MAX_SIZE; i += chunkSize) {
          const chunk = payload.slice(i, i + chunkSize);
          console.log("sending chunks to each thread by ...",chunk.length);
          // do work thread tag sync implementation 
          if (chunk.length>0) {
            runThreadService(chunk)
            .then((data)=>{
              result.push(...data)
              console.log("total result is ......."+ result.length);
            })
            .catch(e=>{
              console.log("thread error...." , e);
            })
          }
        } 
        
        return {data:"sync started",status:200,error:null};
    } catch (error) {
        console.log("error====",error);
        return ctx.internalServerError(error.toString());
    }
  },
  
  async createOneTag(ctx) {
    try {
      const {tagid,label,type,category,updated_published_time} = ctx.request.body.data;
      const entry = await strapi.db.query('api::tag.tag').create({
        data:{
          tagid,
          label,
          type,
          category,
          updated_published_time,
          synced:true
        }
      });
      ctx.response.status = 201;
      return {data:entry,status:201,error:null};
    } catch (error) {
      return ctx.internalServerError(error.toString());
    }
  },

  async updateOneByTagID(ctx) {
    const { slug } = ctx.params;
    const {label,type,category,updated_published_time} = ctx.request.body.data;
    try {
      await strapi.db.query('api::tag.tag').update({
        where: { tagid: slug },
        data:{
          label,
          type,
          category,
          updated_published_time,
          synced:true 
        }
      });
      const result = await strapi.db.query('api::tag.tag').findOne({
        where: { tagid: slug },
      });
      if (!result) {
        return {data:null,status:404,error:new NotFoundError({info:"tagid not found"},"no entry with this tagid has been found")};
      }

      return {data:result,status:200,error:null};
    } catch (error) {
      return ctx.internalServerError(error.toString());
    }
  },
  
  async deleteOneByTagID(ctx) {
    try {
      const { slug } = ctx.params;
      const entry = await strapi.db.query('api::tag.tag').findOne({
          where: { tagid: slug },
          populate: {
            articles: true,
          },
      });
      // console.log(entry);
      if (!entry) {
        return {data:null,status:404,error:new NotFoundError({info:"tagid not found"},"no entry with this tagid has been found")};
      }
      if (entry.articles.length==0) {
        await strapi.db.query('api::tag.tag').delete({
          where: { tagid: slug },
          populate: {
            articles: true,
          },
        });

        return {data:entry,status:200,error:null};
      }else{
        return {data:null,status:403,error:new ForbiddenError('Tag can’t be deleted because it is already assigned to an article')}
      }
    } catch (error) {
      console.log('er,',e);
      return ctx.internalServerError(error.toString());
    }  
  },
  
  async deleteAllSyncedTags(){
    console.log("deleting all tags");
    await deleteSynedTagsService();
    return "all tags are deleted"
  },
  
}));

async function syncTagsService(payload){
  const result = [];
  const createEntryData = [];
  try {
    if (payload.length>0) {
      while(payload.length){
        //distributing the request body payload to chunks of 500 entries
        const subPayloadArray = payload.splice(0, 500);
        await Promise.all(subPayloadArray.map(async datum=>{
          //updating the data according to new updated published time
          const {tagid,label,type,category,updated_published_time} = datum;

          const foundEntrytoUpdate = await strapi.db.query('api::tag.tag').update({
            where:{
              $and: [
                {
                  tagid: tagid,
                },
                {
                  updated_published_time: { $lt: new Date(datum.updated_published_time) },
                },
              ]
            },
            
            data:{
              label,
              type,
              category,
              updated_published_time,
              synced:true
            }
          })
          
          if (foundEntrytoUpdate){
            console.log(foundEntrytoUpdate);
            result.push(datum)
          }

          if (!foundEntrytoUpdate) {
            const foundEntry = await strapi.db.query('api::tag.tag').findOne({
              where:{
                $and: [
                  {
                    tagid: datum.tagid,
                  },
                  {
                    synced: true,
                  }
                ]
              }
            });
            if (!foundEntry) {
              //create action before storing the data
              await strapi.db.query('api::tag.tag').create({data:datum});
              result.push(datum)
            }
          }
        }));
      }  
    }

    // if (createEntryData.length>0) {
    //   while(createEntryData.length){
    //     //distributing the data to be created into chunks of 500 entries
    //     const subCreatedArray = createEntryData.splice(0, 500);
    //     await strapi.db.query('api::tag.tag').createMany({data:subCreatedArray});
    //     // await Promise.all(subCreatedArray.map(async item=>{
    //     //   await strapi.db.query('api::tag.tag').create({data:item});
    //     // }));
    //     console.log("created====",subCreatedArray.length);
    //     //implementing bulk creation
    //   }  
    // }
    // console.log(result.length);
    
  } catch (error) {
    console.log(error);
    // return []
  }
  return result;
}

async function deleteSynedTagsService(){
  await strapi.db.query("api::tag.tag").deleteMany({
    where: {
      synced:true
    },
  });
}

const runThreadService = (payload) => {
  return new Promise((res,rej)=>{
    const worker = new Worker(path.join(process.cwd(),'config/work-thread.js'));
    worker.postMessage(payload)
    worker.on('message',res);
    worker.on('error',rej)
  })
}
