'use strict';

/**
 * reset-password router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::reset-password.reset-password');
