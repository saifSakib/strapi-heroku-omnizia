"use strict";

/**
 *  hcp-registration-journey controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::hcp-registration-journey.hcp-registration-journey",
  ({ strapi }) => ({
    async findOneBySlug(ctx) {
      const result = await strapi
        .service("api::hcp-registration-journey.hcp-registration-journey")
        .findOneByLanguage(ctx);
      return result;
    },
  })
);
