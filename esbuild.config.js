// filepath: esbuild.config.js
const esbuild = require("esbuild");
const main = require("./release.copier");
const alias = require("esbuild-plugin-alias");

esbuild
  .build({
    entryPoints: [
      "src/sunan/index.tsx",
      "src/sunan/my.tsx",
      "src/sunan/global.tsx",
      "src/kanal/update-schedule.tsx",
      "src/sunan/course-view.tsx",
      "src/sunan/loginfalidation.tsx",
      "src/popup.tsx",
      "src/background.ts",
      // "src/krs/krs-helper.tsx",
    ],
    outdir: "dist",
    bundle: true,
    minify: true,
    splitting: false,
    format: "iife",
    target: ["chrome58", "firefox57"],
    loader: { ".tsx": "tsx", ".ts": "ts" },
    define: { "process.env.NODE_ENV": '"production"' },
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsx: "automatic",
    plugins: [
      alias({
        react: require.resolve("preact/compat"),
        "react-dom": require.resolve("preact/compat"),
        "react/jsx-runtime": require.resolve("preact/jsx-runtime"),
        "react/jsx-dev-runtime": require.resolve("preact/jsx-runtime"),
      }),
    ],
  })
  .then(main)
  .catch(() => process.exit(1));
