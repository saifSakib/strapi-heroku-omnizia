'use strict';

/**
 *  reset-password controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  "api::reset-password.reset-password",
  ({ strapi }) => ({
    async findOneBySlug(ctx) {
      const result = await strapi
        .service("api::reset-password.reset-password")
        .findOneByLanguage(ctx);
      return result;
    },
  })
);
