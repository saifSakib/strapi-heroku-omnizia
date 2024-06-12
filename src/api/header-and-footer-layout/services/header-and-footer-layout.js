'use strict';

/**
 * header-and-footer-layout service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::header-and-footer-layout.header-and-footer-layout",
  ({ strapi }) => ({
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
  })
);