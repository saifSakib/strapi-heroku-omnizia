'use strict';

/**
 *  article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

 module.exports = createCoreController(
   "api::article.article",
   ({ strapi }) => ({
     async findArticle(ctx) {
       try {
        const result = await strapi
         .service("api::article.article")
         .findArticle(ctx);
          return result;
       } catch (error) {
        return ctx.internalServerError(error.toString());
       }
     },
     async likeCounter(ctx) {
      try {
       const result = await strapi
        .service("api::article.article")
        .likeCounter(ctx);
         return result;
      } catch (error) {
       return ctx.internalServerError(error.toString());
      }
    },

    //  async likeHandler(ctx) {
    //   try {
    //     const result = await strapi
    //     .service("api::article.article")
    //     .likeHandler(ctx);
    //   return result;
    //   } catch (error) {
    //     return ctx.internalServerError(error.toString());
    //   }
    // },

    // async getLikesCount(ctx) {
    //   try {
    //     const result = await strapi
    //     .service("api::article.article")
    //     .getLikesCount(ctx);
    //     return result;  
    //   } catch (error) {
    //     return ctx.internalServerError(error.toString());
    //   }
    // },
   })
 );
