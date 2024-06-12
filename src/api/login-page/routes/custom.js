module.exports = {
    routes: [
      {
        method: "GET",
        path: "/login-pages/lang/:slug",
        handler: "login-page.findOneBySlug",
      },
    ],
};