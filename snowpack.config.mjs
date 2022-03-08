/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  exclude: ["**/node_modules/**/*", ".vscode"],
  mount: {
    public: { url: "/" },
    src: { url: "/dist" },
  },
  plugins: ["@snowpack/plugin-dotenv", "@snowpack/plugin-webpack"],
  routes: [
    {
      match: "routes",
      src: ".*",
      dest: "/index.html",
    },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {},
  buildOptions: {
    clean: true,
    jsxInject: `import React from 'react'`,
  },
};
