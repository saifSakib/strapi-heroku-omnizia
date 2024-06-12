module.exports = {
    routes: [
      {
        method: "GET",
        path: "/about/lang/:slug",
        handler: "aboutpage.findOneBySlug",
      },
    ],
};