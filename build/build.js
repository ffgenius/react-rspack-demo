import { rspack } from "@rspack/core";
import { createRspackConfig } from "./rspack.config.js";

async function build() {
  const config = createRspackConfig();
  config.mode = "production";

  const compiler = rspack(config);

  compiler.run((err, stats) => {
    if (err) throw err;
    console.log(stats.toString({ colors: true }));
    compiler.close(() => {});
  });
}

build();
