/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  exclude: ["**/node_modules/**/*", ".vscode"],
  mount: {
    public: { url: "/" },
    src: { url: "/dist" },
  },
  plugins: [
    /* ... */
  ],
  routes: [
    {
      match: "routes",
      src: ".*",
      dest: "/musix-app/index.html",
    },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    openUrl: "/musix-app/",
  },
  buildOptions: {
    clean: true,
    jsxInject: `import React from 'react'`,
  },
};
