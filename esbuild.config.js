// filepath: esbuild.config.js
const esbuild = require("esbuild");
const main = require("./release.copier");
const alias = require("esbuild-plugin-alias");
const timestart = new Date();

esbuild
  .build({
    entryPoints: {
      "sunan/index": "src/features/sunan/Index/Main.tsx",
      "sunan/my": "src/features/sunan/Dashboard/Main.tsx",
      // "sunan/global": "src/features/sunan/Global/Main.tsx",
      "sunan/popup": "src/features/sunan/popup/Main.tsx",
      "kanal/update-schedule": "src/features/kanal/UpdateSchedule/Main.tsx",
      "portalkawe/update-schedule": "src/features/portal-kawe/update-kawe/Main.tsx",
      "sunan/course-view": "src/features/sunan/CourseView/Main.tsx",
      "sunan/loginfalidation": "src/features/sunan/Login/Main.tsx",
      popup: "src/features/extension/popup.tsx",
      background: "src/features/extension/background.ts",
      "krs/ScheduleMaker": "src/features/krs/ScheduleMaker/Main.tsx"
    },
    outdir: "dist",
    entryNames: "[dir]/[name]",
    bundle: true,
    minify: true,
    splitting: false,
    format: "iife",
    target: ["chrome88", "firefox85"],
    loader: { ".tsx": "tsx", ".ts": "ts" },
    define: { debug: "true" },
    sourcemap: true,
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
  .then(main(timestart))
  .catch(() => process.exit(1));
