'use strict';

/**
 * client-configuration service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::client-configuration.client-configuration');
