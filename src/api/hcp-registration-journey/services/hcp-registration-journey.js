"use strict";

/**
 * hcp-registration-journey service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::hcp-registration-journey.hcp-registration-journey",
  ({ strapi }) => ({
    async findOneByLanguage(ctx) {
      const { results } = await super.find(ctx.query);
      const { slug } = ctx.params;
      const { runmode } = ctx.query;
      var result = {};
      console.log("done query printing===",runmode);

      results.forEach((element) => {
        if (element.slug === slug && element.RUNMODE) {
          // console.log(runmode=="preview" && element?.RUNMODE?.toLowerCase()==runmode);
          // console.log(runmode, element?.RUNMODE?.toLowerCase());
          if (runmode=="publish" && element?.RUNMODE?.toLowerCase()!=runmode) {
            result = {};
          }
          else  {
            result = element;
          }       
        }
      });
      return result;
      },
    })
);
