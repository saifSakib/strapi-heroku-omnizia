module.exports = {
    routes: [
      {
        method: "GET",
        path: "/tags/:slug",
        handler: "tag.findOneByTagID",
      },
      {
        method: "POST",
        path: "/tags/sync",
        handler: "tag.syncTags",
        config:{
          middlewares: ["api::tag.tag-sync"]
        }
      },
      {
        method: "POST",
        path: "/tags/create",
        handler: "tag.createOneTag",
        config:{
          middlewares: ["api::tag.tag"]
        }
      },
      {
        method: "PUT",
        path: "/tags/update/:slug",
        handler: "tag.updateOneByTagID",
        config:{
          middlewares: ["api::tag.tag"]
        }
      },
      {
        method: "DELETE",
        path: "/tags/delete/:slug",
        handler: "tag.deleteOneByTagID",
      },
      {
        method: "DELETE",
        path: "/tags/sync/delete",
        handler: "tag.deleteAllSyncedTags",
      },
    ],
};