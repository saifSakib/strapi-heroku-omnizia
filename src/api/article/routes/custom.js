module.exports = {
    routes: [
      {
        method: "GET",
        path: "/get-articles/:slug",
        handler: "article.findArticle",
      },
      {
        method: "PUT",
        path: "/articles/like-counter/:slug",
        handler: "article.likeCounter",
      },
      // {
      //   method: "PUT",
      //   path: "/articles/like/:slug",
      //   handler: "article.likeHandler",
      // },
      // {
      //   method: "GET",
      //   path: "/articles/like/:slug",
      //   handler: "article.getLikesCount",
      // }
    ],
};