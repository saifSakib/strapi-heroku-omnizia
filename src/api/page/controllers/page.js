"use strict";

/**
 *  page controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::page.page", ({ strapi }) => ({
  async findOneBySlug(ctx) {
    const { slug } = ctx.params;
    // console.log(slug);
    const result = await strapi
      .service("api::page.page")
      .findOneByLanguage(ctx, slug);
    // console.log(result);
    return result;
  },
  
  async findOneAndUpdateBySlug(ctx) {
    const { slug } = ctx.params;

    const result = await strapi
      .service("api::page.page")
      .findOneByLanguage(ctx, slug);
    
    if (result.hasOwnProperty("cardAlignment") && result.hasOwnProperty("slug")) {
      const entry = await strapi.entityService.update('api::page.page', result.id, {
        data: {
          cardAlignment:ctx.query.cardAlignment
        },
      });
      return {cardAlignment:entry.cardAlignment}
    }
    return result
  },
}));
