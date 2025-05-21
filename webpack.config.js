const path = require("path");
const WebpackReleasePlugin = require("./webpack.log");
const isDev = false;

module.exports = {
  entry: {
    sunan_index: "./src/sunan/index.tsx",
    sunan_my: "./src/sunan/my.tsx",
    sunan_global: "./src/sunan/global.tsx",
    kanal_update_schedule: "./src/kanal/update-schedule.tsx",
    sunan_course_view: "./src/sunan/course-view.tsx",
  },
  mode: isDev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
      "react/jsx-dev-runtime": "preact/jsx-runtime",
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // new ConsoleLogOnBuildWebpackPlugin()
    new WebpackReleasePlugin(),
  ],
};
