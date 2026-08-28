import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  preset: "node-server",
  devServer: {
    host: '0.0.0.0',
  },
  // Force Nitro's production listener settings
  runtimeConfig: {
    nitro: {
      host: '0.0.0.0',
    },
  },
});
