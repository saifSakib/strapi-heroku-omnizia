module.exports = {
    routes: [
      {
        method: "GET",
        path: "/my-personal-areas/lang/:slug",
        handler: "my-personal-area.findOneBySlug",
      },
    ],
};