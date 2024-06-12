"use strict";

/**
 *  formpage controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::formpage.formpage",
  ({ strapi }) => ({
    async findOneBySlug(ctx) {
      const result = await strapi
        .service("api::formpage.formpage")
        .findOneByLanguage(ctx);
      return result;
    },
  })
);
