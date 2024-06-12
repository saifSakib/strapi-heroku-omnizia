'use strict';

/**
 *  reset-password controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  "api::login-page.login-page",
  ({ strapi }) => ({
    async findOneBySlug(ctx) {
      const result = await strapi
        .service("api::login-page.login-page")
        .findOneByLanguage(ctx);
      return result;
    },
  })
);
