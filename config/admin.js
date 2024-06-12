module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '5d0a3894a8914d175b94f72e80b48e88'),
  },
});
