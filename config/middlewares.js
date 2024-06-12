module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: "strapi::body",
    config: {
      formLimit: "512mb",
      jsonLimit: "512mb",
      textLimit: "512mb",
      formidable: {
        maxFileSize: 512 * 1024 * 1024,
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  { resolve: './src/middlewares/admin-redirect' },
];
