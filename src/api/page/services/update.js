const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::page.page", ({ strapi }) => ({
    async findOneAndUpdateByLanguage(ctx) { 
      return ctx.query.param;
    },
}));