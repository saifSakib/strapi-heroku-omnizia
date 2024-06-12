module.exports = {
    routes: [
      {
        method: "GET",
        path: "/reset-passwords/lang/:slug",
        handler: "reset-password.findOneBySlug",
      },
    ],
};