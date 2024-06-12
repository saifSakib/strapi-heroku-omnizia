'use strict';

/**
 *  set-password controller
 */

 const { createCoreController } = require('@strapi/strapi').factories;

 module.exports = createCoreController(
   "api::set-password.set-password",
   ({ strapi }) => ({
     async findOneBySlug(ctx) {
       const result = await strapi
         .service("api::set-password.set-password")
         .findOneByLanguage(ctx);
       return result;
     },
   })
 );