module.exports = {
    routes: [
      {
        method: "GET",
        path: "/hcp-registration-journeys/lang/:slug",
        handler: "hcp-registration-journey.findOneBySlug",
      },
    ],
  };