module.exports = {
    routes: [
      {
        method: "GET",
        path: "/event/lang/:slug",
        handler: "events-page.findOneBySlug",
      },
    ],
};