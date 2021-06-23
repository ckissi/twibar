"use strict";

import { app, protocol, Menu, ipcMain, shell } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { menubar } from "menubar";
import { join } from "path";
const isDevelopment = process.env.NODE_ENV !== "production";
import { autoUpdater } from "electron-updater";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

if (!process.env.WEBPACK_DEV_SERVER_URL) {
  createProtocol("app");
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  //if (process.platform !== "darwin") {
  app.quit();
  //}
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    autoUpdater.checkForUpdatesAndNotify();
  }

  const mb = new menubar({
    index: process.env.WEBPACK_DEV_SERVER_URL
      ? process.env.WEBPACK_DEV_SERVER_URL
      : "app://./index.html",
    browserWindow: {
      alwaysOnTop: process.env.WEBPACK_DEV_SERVER_URL ? true : false,
      width: 360,
      height: 430,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      }
    },
    icon: join(__static, "../src/assets/twitter_logo.png")
  });

  mb.on("ready", () => {
    mb.showWindow();
  });

  mb.on("after-create-window", function() {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Twibar Home Page",
        click: () => {
          shell.openExternal("https://github.com/beyondcode/expose");
        }
      },
      { type: "separator" },
      {
        label: "Quit",
        click: () => {
          mb.window.close();
        }
      }
    ]);
    mb.tray.on("right-click", () => {
      mb.tray.popUpContextMenu(contextMenu);
    });
  });

  ipcMain.on("data-ready", (event, arg) => {
    mb.tray.setTitle(
      arg.data.data[arg.data.data.length - 1].followers_count.toString()
    );
  });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
