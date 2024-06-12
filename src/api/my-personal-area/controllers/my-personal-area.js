'use strict';

/**
 *  my-personal-area controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
    "api::my-personal-area.my-personal-area",
    ({ strapi }) => ({
      async findOneBySlug(ctx) {
        const result = await strapi
          .service("api::my-personal-area.my-personal-area")
          .findOneByLanguage(ctx);
        return result;
      },
    })
  );