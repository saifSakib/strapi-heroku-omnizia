'use strict';

/**
 *  header-and-footer-layout controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
    "api::header-and-footer-layout.header-and-footer-layout",
    ({ strapi }) => ({
      async findOneBySlug(ctx) {
        const result = await strapi
          .service("api::header-and-footer-layout.header-and-footer-layout")
          .findOneByLanguage(ctx);
        return result;
      },
      async nightmodeToggler(ctx) {
        const { slug } = ctx.params;
        
        const result = await strapi
          .service("api::header-and-footer-layout.header-and-footer-layout")
          .findOneByLanguage(ctx, slug);

          if (result.hasOwnProperty("slug") && ctx.query.toggle=="true") {
          const entry = await strapi.entityService.update('api::header-and-footer-layout.header-and-footer-layout', result.id,{
            data:{
              Themes:{
                NightMode: !result.Themes.NightMode,
                theme: 'Police-Blue/Cerise-Pink',
              }
            },
            populate: ['Themes'],
          });
          console.log(entry);
          return {nightMode:entry.Themes.NightMode}
        }else{
          const entry = await strapi.entityService.findOne('api::header-and-footer-layout.header-and-footer-layout', result.id,{
            populate: ['Themes'],
          });
          return {nightMode:entry.Themes.NightMode}
        }
      },
    })
    
);