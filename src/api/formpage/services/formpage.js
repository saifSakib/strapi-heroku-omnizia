"use strict";

/**
 * formpage service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::formpage.formpage", ({ strapi }) => ({
  async findOneByLanguage(ctx) {
    const { results } = await super.find(ctx.query);
    const { slug } = ctx.params;
    var result = {};
    results.forEach((element) => {
      if (element.slug === slug) {
        result = element;
        return result;
      }
    });
    return result;
  },
}));
