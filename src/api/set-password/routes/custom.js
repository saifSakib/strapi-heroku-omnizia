module.exports = {
    routes: [
      {
        method: "GET",
        path: "/set-passwords/lang/:slug",
        handler: "set-password.findOneBySlug",
      },
    ],
};