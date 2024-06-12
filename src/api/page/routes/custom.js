module.exports = {
  routes: [
    {
      method: "GET",
      path: "/pages/lang/:slug",
      handler: "page.findOneBySlug",
    },
    {
      method: "PUT",
      path: "/pages/lang/:slug",
      handler: "page.findOneAndUpdateBySlug",
    }
  ],
};
