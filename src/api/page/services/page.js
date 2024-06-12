"use strict";

/**
 * page service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::page.page", ({ strapi }) => ({
  async findOneByLanguage(ctx) {
    // console.log("done query printing");
    const { slug } = ctx.params;
    const { results } = await super.find(ctx.query);
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
        // result = element;
      }
    });
    console.log(result);
    return result;
  },
}));
