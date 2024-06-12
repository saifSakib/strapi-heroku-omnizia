'use strict';

/**
 * events-page service.
 */
const { createCoreService } = require("@strapi/strapi").factories;



module.exports = createCoreService(
  "api::events-page.events-page",
  ({ strapi }) => ({
    async findOneByLanguage(ctx) {
      const { results } = await super.find(ctx.query);
      const { slug } = ctx.params;
      const { runmode } = ctx.query;
      
      if (slug && runmode) {
        var result = {};
        results.forEach((element) => {
          console.log(element);
          if (element.slug === slug && element.RUNMODE) {
            if (runmode=="publish" && element?.RUNMODE?.toLowerCase()!=runmode) {
              result = {};
            }
            else  {
              result={data:results.filter(f=>f.slug==slug)}
            }      
          }
        });
        return result;
      }
    },
  })
);