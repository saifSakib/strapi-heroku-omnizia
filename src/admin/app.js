import logo from "./extensions/logo.svg";
import logoSmall from "./extensions/logo-small.svg";
export default {
  config: {
    auth: { logo: logo },
    menu: { logo: logoSmall },
    head: { favicon: logoSmall },
    translations: {
      fr: {
        "app.components.LeftMenu.navbrand.title": "Super dashboard",
        "app.components.LeftMenu.navbrand.workplace": "Administration",
        "Auth.form.welcome.title": "Welcome to Omnizia Author",
        "Auth.form.welcome.subtitle": "Log in to your Omnizia Author account",
      },
      en: {
        "app.components.LeftMenu.navbrand.title": "Omnizia Author",
        "app.components.LeftMenu.navbrand.workplace": "Workspace",
        "Auth.form.welcome.title": "Welcome to Omnizia Author",
        "Auth.form.welcome.subtitle": "Log in to your Omnizia Author account",
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },
  bootstrap() {},
};
