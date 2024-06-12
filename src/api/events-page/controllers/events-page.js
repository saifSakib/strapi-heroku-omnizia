'use strict';

/**
 *  events-page controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::events-page.events-page",
  ({ strapi }) => ({
    async findOneBySlug(ctx) {
      const result = await strapi
        .service("api::events-page.events-page")
        .findOneByLanguage(ctx);
      return result;
    },
  })
);