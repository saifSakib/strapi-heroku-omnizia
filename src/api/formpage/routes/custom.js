module.exports = {
  routes: [
    {
      method: "GET",
      path: "/formpages/lang/:slug",
      handler: "formpage.findOneBySlug",
    },
  ],
};
