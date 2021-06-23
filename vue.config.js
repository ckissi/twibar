module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    },
    builderOptions: {
      mac: {
        hardenedRuntime: true,
        entitlements: "./build/entitlements.mac.inherit.plist"
      },
      appId: "com.elerion.twibar",
      afterSign: "./afterSignHook.js",
      extraResources: [
        {
          from: "extra",
          to: "extra",
          filter: ["**/*"]
        }
      ]
    }
  }
};
