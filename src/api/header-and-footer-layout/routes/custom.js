module.exports = {
    routes: [
      {
        method: "GET",
        path: "/header-and-footer-layouts/lang/:slug",
        handler: "header-and-footer-layout.findOneBySlug",
      },
      {
        method: "PUT",
        path: "/header-and-footer-layouts/lang/:slug/togglenightmode",
        handler: "header-and-footer-layout.nightmodeToggler",
      }
    ]
};