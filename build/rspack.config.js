import path from 'node:path';
import { fileURLToPath } from "url";
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';
import userConfig from '../config/react.config.js';
import { HtmlRspackPlugin, rspack } from '@rspack/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createRspackConfig(mode) {
  const isDev = mode === "development";

  return {
    mode,
    devtool: mode === "development" ? "cheap-module-source-map" : false,

    entry: {
      main: path.resolve(__dirname, "..", userConfig.entry),
    },

    output: {
      path: path.resolve(__dirname, "..", userConfig.outputDir),
      filename: "[name].js",
      clean: true,
    },

    experiments: {
      css: true,
    },

    resolve: {
      extensions: [".js", ".jsx", ".json"], // 自动添加导入文件的扩展名
      alias: Object.fromEntries(
        Object.entries(userConfig.alias || {}).map(([k, v]) => [
          k,
          path.resolve(__dirname, "..", v),
        ])
      ),
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: { syntax: "ecmascript", jsx: true },
                transform: {
                  react: {
                    runtime: "automatic", // 必须是 automatic
                    refresh: true,        // 开发环境才启用
                    development: true,
                  },
                },
              },
              module: { type: "es6" }, // 确保输出 ESM
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          type: "javascript/auto",
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  namedExport: false,
                  exportLocalsConvention: "camelCase",
                },
              },
            },
            "less-loader",
          ],
        },
      ],
    },

    devServer:
      isDev
        ? {
            port: userConfig.port,
            open: userConfig.open,
            hot: true,
            historyApiFallback: true,
            static: {
              directory: path.resolve(__dirname, "..", "public"),
            },
          }
        : undefined,

    plugins: [
      new ReactRefreshPlugin(),  
      new HtmlRspackPlugin({
        template: path.resolve(process.cwd(), "public/index.html"), // 你的模板文件
        filename: "index.html",
      }),
    ],
  };
}
