'use strict';

/**
 * dynamic-variable service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dynamic-variable.dynamic-variable');
