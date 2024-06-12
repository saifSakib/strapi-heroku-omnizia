"use strict";

/**
 *  aboutpage controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::aboutpage.aboutpage",
  ({ strapi }) => ({
    async findOneBySlug(ctx) {
      const result = await strapi
        .service("api::aboutpage.aboutpage")
        .findOneByLanguage(ctx);
      return result;
    },
  })
);
