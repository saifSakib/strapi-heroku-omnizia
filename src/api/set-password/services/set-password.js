'use strict';

/**
 * set-password service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService(
  "api::set-password.set-password",
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
