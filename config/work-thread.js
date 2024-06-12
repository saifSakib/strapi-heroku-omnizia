const {parentPort, workerData, Worker, isMainThread} = require('node:worker_threads')
  
try {
    parentPort && parentPort.on("message",async(data)=>{
        if (!isMainThread) {
            const Strapi = require("@strapi/strapi");
            //accesing strapi 
            await Strapi().load();
            //sending data to main Thread
            console.log('working thread',"proccesing  "+data.length);
            parentPort.postMessage(await syncTagsService(data))
        }
    })
} catch (error) {
    console.log(error);
}  
  
  
async function syncTagsService(payload){
    try {
      const result = [];
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
            .then((data)=>{
              if (data) {
                result.push(data.json())
              }
            })
            .catch(e=>{
              console.log("update error",e.toString());
            });
  
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
                await strapi.db.query('api::tag.tag').create({data:datum})
                .then((data)=>{
                  if (data) {
                    result.push(data)
                  }
                })
                .catch(e=>{
                  console.log("create error",e.toString());
                });
                
              }
            }
          }));
        }  
      }
      return result
    } catch (error) {
      console.log('err===',error);
      return []     
    }
  }
    