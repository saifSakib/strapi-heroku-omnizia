'use strict';

/**
 * article service.
 */

const { createCoreService } = require('@strapi/strapi').factories;
const { errors } = require('@strapi/utils');
// const path = require("path")
// const isUserValidated = require(path.join(process.cwd(),"omnizia/getViquiaHcpProfile"));
const {NotFoundError,ForbiddenError} = errors;

module.exports = createCoreService('api::article.article');

module.exports = createCoreService(
   "api::article.article",
   ({ strapi }) => ({
     async findArticle(ctx) {
       try {
          let result = {
            article : null,
            recommended_articles : null,
            related_articles : null,
          };
          
          let related_articles;
          let recommended_articles;
          let tagIDs;
          
          //get the article id from slug
          const {slug} = ctx.params;
          const entry = await strapi.entityService.findOne('api::article.article', slug , {
           populate:{
               tags:{
                  fields:["id","tagid","label","category","type"],
               },
               recommended_ids:true,
               default_img:true,
               article_img:true,
               Author_Ids:true
           },
          })
          .catch(e=>{
            console.log("entry error====",e);
          });
          
          //step 1 (recommended articles): if entry is found and the entry has tags 
          //find the the top 3 articles that has most likes
          //and matches atleast one tag
          
          //step 2 (related articles): if entry is found and the entry has tags 
          //find the the top 3 articles that is most recent
          //and matches atleast one tag
          
          if (entry) {
              //find recommended articles by recommended Ids
              if (entry.recommended_ids.length>0) {
                recommended_articles = await strapi.entityService.findMany('api::article.article', {
                    limit:5,

                    filters: {
                         id:{
                             $contains:entry.recommended_ids.map(m=>m.recommended_id),
                             $ne:slug
                         }      
                    },

                    populate:{
                        tags:{
                             fields:["id","tagid","label","category","type"],    
                        },
                        default_img:true,
                        article_img:true
                                       
                    },

                    sort: [  { published_time : 'desc' }, { publishedAt: 'desc' } , { label : 'asc' } ]   
                })
                .catch(e=>{
                    console.log("recommended ids found.... recommended articles error====",e);
                });
                
                if (Array.isArray(recommended_articles) && recommended_articles.length===0) {
                    recommended_articles = null
                }
              }  
              //get the tags
              if (entry.tags && entry.tags.length>0) {
                tagIDs = entry.tags.map(m=>m.tagid)
              }
              
              if (tagIDs && tagIDs.length>0) {           
                //if tags are present find the related 3 articles 
                related_articles = await strapi.entityService.findMany('api::article.article', {
                    limit:3,

                    filters: {
                            id:{
                                $ne:slug,
                            },

                            tags:{
                                tagid:{
                                    $contains:tagIDs,
                                }
                            }      
                    },

                    populate:{
                            tags:{
                                fields:["id","tagid","label","category","type"],  
                            },
                            default_img:true,
                            article_img:true
                                        
                    },

                    sort: [ { likes: 'desc' }, { publishedAt: 'desc' } , { label : 'asc' } ]   
                })
                .catch(e=>{
                    console.log("tags found... related articles error====",e);
                });
                
               if (Array.isArray(related_articles) && related_articles.length===0) {
                    related_articles = null
               }
                     
               //if tags are present find the recommended 3 articles
               if (entry.recommended_ids.length===0 || recommended_articles==null) {
                
                recommended_articles = await strapi.entityService.findMany('api::article.article', {
                    limit:3,

                    filters: {
                        id:{
                            $ne:slug,
                        },
                        
                        tags:{
                            tagid:{
                                $contains:tagIDs,
                            }
                        }      
                    },
                    
                    populate:{
                        tags:{
                             fields:["id","tagid","label","category","type"]
                        },
                        default_img:true,
                        article_img:true
                                       
                    },

                    sort: [ { published_time : 'desc' }, { publishedAt: 'desc' }, { label : 'asc' } ]   
                })
                .catch(e=>{
                    console.log("tags found recommended articles error",e);
                });;
                
                if (Array.isArray(recommended_articles) && recommended_articles.length===0) {
                    recommended_articles = null
                } 
               }
               
              }
              
              result.article = entry
              
              if (related_articles) {
               result.related_articles = related_articles
              }
              
              if (recommended_articles) {
               result.recommended_articles = recommended_articles
              }
              
              return {data:result,status:200,error:null};
          }

          //article not found and show error
          return {data:null,status:404,error:new NotFoundError({info:"article not found"},"no entry with this article id has been found")};
   
       } catch (error) {
         return ctx.internalServerError(error.toString());
       }    
     },
     async likeCounter(ctx){
        try {
            let result=null;
            const {slug} = ctx.params;
            const {body} = ctx.request    
            const {likes} = ctx.request.body.data    
            if (body && slug) {
                result = await strapi.entityService.update('api::article.article', slug,{
                    data:{
                        likes:typeof likes=='number'?parseInt(likes)+1:1
                    }
                })
                .catch(e=>{
                    console.log("error in updating likes counter",e);
                })
            }
            
            if (!result) {
                return {data:null,status:404,error:new NotFoundError({info:"article not found"},"no entry with this article id has been found")};
            }
            
            if (result && result.likes) {
                return {data:result.likes,status:200,error:null}
            }
        } catch (error) {
            console.log("internal server error",error);
            return ctx.internalServerError(error.toString());
        }
     }

    //  async likeHandler(ctx){
    //     try {
    //         const {slug} = ctx.params;
    //         const {userid} = ctx.query;
    //         const userIsValidated = await isUserValidated(userid);
    //         const article = await findArticleByID(slug);
            
    //         if (!slug) {
    //             return {data:null,status:404,error:new NotFoundError({info:"article not found"},"no entry with this article id has been found")};
    //         }
            
    //         if (!userid) {
    //             return {data:null,status:404,error:new NotFoundError({info:"user not found"},"no entry with this user id has been found")};
    //         }
            
    //         if (!userIsValidated) {
    //             return {data:null,status:403,error:new ForbiddenError({info:"user id is not validated"},"the user is not a valid hcp")};
    //         }
            
    //         if (!article) {
    //             return {data:null,status:404,error:new NotFoundError({info:"article is not found"},"no entry with this article id has been found")};
    //         }

    //         if (userIsValidated && article) {
    //             const entry = await strapi.db.query('api::article-like.article-like').findOne({
    //                 where:{
    //                   article_id:article.id,
    //                   user_id: userid
    //                 }
    //             })
    //             .catch(e=>{
    //                 console.log("findone like error===",e);
    //             });

    //             let result=null;
    //             if (entry) {
    //                 result = await strapi.db.query('api::article-like.article-like').delete({
    //                     where:{
    //                       article_id:article.id,
    //                       user_id: userid
    //                     }
    //                 })
    //                 .catch(e=>{
    //                     console.log("create like error=======",e);
    //                     result=null
    //                 });

    //             }else{
    //                 result = await strapi.db.query('api::article-like.article-like').create({
    //                     data:{
    //                       article_id:article.id,
    //                       user_id: userid
    //                     }
    //                 })
    //                 .catch(e=>{
    //                     console.log("delete like error=======",e);
    //                     result=null
    //                 });
    //             }

    //             const LikesInEntry = await strapi.entityService.findMany('api::article-like.article-like', {
    //                 filters:{
    //                     article_id:article.id
    //                 }
    //             })
    //             .catch(e=>{
    //                 console.log("entry error====",e);
    //             });

    //             await strapi.entityService.update('api::article.article',article.id, {
    //                 data:{
    //                     likes:LikesInEntry.length
    //                 }
    //             })
    //             .catch(e=>{
    //                 console.log("entry error====",e);
    //             });
    //             return {data:result,status:200,error:null}
    //         }
            
    //     } catch (error) {
    //         return ctx.internalServerError(error.toString());
    //     }

    //  },

    //  async getLikesCount(ctx){
    //     try {
    //         const {slug} = ctx.params;
    //         const {userid} = ctx.query;
    //         const userIsValidated = await isUserValidated(userid);
    //         const article = await findArticleByID(slug);
            
    //         if (!slug) {
    //             return {data:null,status:404,error:new NotFoundError({info:"article not found"},"no entry with this article id has been found")};
    //         }
    //         if (article) {
    //             let total_likes= null;
    //             let liked_by_user = null
    //             const entries = await strapi.db.query('api::article-like.article-like').findMany({
    //                 where:{
    //                     article_id:article.id,
    //                 }
    //             })
    //             .catch(e=>{
    //                 console.log("findmany like length error",e);
    //             });

    //             total_likes = entries.length || null;

    //             if (userid && userIsValidated) {
    //                 const entry = await strapi.db.query('api::article-like.article-like').findOne({
    //                     where:{
    //                         article_id:article.id,
    //                         user_id:userid
    //                     }
    //                 })
    //                 .catch(e=>{
    //                     console.log("findone user who like yhe article... error",e);
    //                 });

    //                 liked_by_user = entry

    //                 return {
    //                     data:{
    //                         total_likes,
    //                         liked_by_user:liked_by_user?true:false,
    //                     },
    //                     status:200,
    //                     error:null
    //                 }
    //             }
    //             return {
    //                 data:{
    //                     total_likes
    //                 },
    //                 status:200,
    //                 error:null
    //             }
    //         }
    //         return {data:null,status:404,error:new NotFoundError({info:"article not found"},"no entry with this article id has been found")};
            
    //     } catch (error) {
    //         return ctx.internalServerError(error.toString());
    //     }

    //  }
   })
);


 async function findArticleByID(id){
    try {
        const entry = await strapi.entityService.findOne('api::article.article', id , {
            populate:{
                tags:{
                   fields:["id","tagid","label","category","type"],
                },
                default_img:true,
                article_img:true,
                recommended_ids:true
            },
        })
        .catch(e=>{
            console.log("find one article error===",e);
        });
        
        if (entry) {
           return entry  
        }else{
           return null  
        }
        

    } catch (error) {
        return ctx.internalServerError(error.toString());
    }
}
