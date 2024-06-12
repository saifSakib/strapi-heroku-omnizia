'use strict';

/**
 * my-personal-area service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService(
    "api::my-personal-area.my-personal-area",
    ({ strapi }) => ({
      async findOneByLanguage(ctx) {
        const { results } = await super.find(ctx.query);
        const { slug } = ctx.params;
        var result = {};
        results.forEach((element) => {
          if (element.slug === slug) {
              result = element;       
          }
        });
        return result;
      },
    })
  );