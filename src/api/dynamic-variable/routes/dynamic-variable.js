'use strict';

/**
 * dynamic-variable router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::dynamic-variable.dynamic-variable');
