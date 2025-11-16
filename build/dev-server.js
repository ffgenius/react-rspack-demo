import { rspack } from '@rspack/core';
import { RspackDevServer } from "@rspack/dev-server";
import { createRspackConfig } from "./rspack.config.js";

async function dev() {
  const config = createRspackConfig('development');
  const devServerConfig = config.devServer;

  const compiler = rspack(config);
  const server = new RspackDevServer(devServerConfig, compiler);

  await server.start();

  console.log(`🚀 DevServer running at http://localhost:${devServerConfig.port}`);
}

dev();
