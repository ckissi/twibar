//const https = require("https");
const http = require("http");
const electron = require("electron");
const Notification = electron.Notification;
const settings = require("electron-settings");

module.exports = {
  getData: function(callback) {
    let apikey = settings.getSync("apikey");
    return http.get(
      {
        host: "twibar.test",
        path: "/api/user/data",
        headers: {
          Authorization: " Bearer " + apikey
        }
      },
      function(response) {
        // Continuously update stream with data
        var body = "";
        response.on("data", function(d) {
          body += d;
        });
        response.on("end", function() {
          // Data reception is done, do whatever with it!
          try {
            var parsed = JSON.parse(body);
            //
          } catch (err) {
            callback({
              data: [],
              err: true
            });
          }
          if (parsed) {
            callback({
              data: parsed,
              err: false
            });
          } else {
            callback({
              data: [],
              err: true
            });
          }
        });
      }
    );
  },
  //------------------------------------------------------------------------------------------
  notifyMe: function(title, message, icon) {
    if (Notification.isSupported()) console.log("not supported");
    const notifycation = new Notification({
      title: title,
      body: message,
      icon: icon
    });
    notifycation.show();
  },
  //------------------------------------------------------------------------------------------
  initSettings: function(autoLauncher) {
    //settings.deleteAll()

    if (!settings.has("autolaunch")) {
      settings.set("autolauch", true);
      autoLauncher.enable();
    }
    if (!settings.has("copy_to_clipboard")) {
      settings.set("copy_to_clipboard", true);
    }
  },
  //-------------------------------------------------------------------------------------------
  saveSettings: function(api_key) {
    settings.setSync("apikey", api_key);
  },
  //-------------------------------------------------------------------------------------------
  resetRadio: function() {
    settings.set("show_nothing", false);
    settings.set("show_earnings_today", false);
    settings.set("show_earnings_current_month", false);
    settings.set("show_earnings_last_month", false);
    settings.set("show_earnings_total", false);
  },
  //-------------------------------------------------------------------------------------------
  showSelectedEarnings: function(data) {
    if (settings.get("show_nothing")) return "";
    if (settings.get("show_earnings_today")) return data.earnings_today;
    if (settings.get("show_earnings_current_month"))
      return data.earnings_current_month;
    if (settings.get("show_earnings_last_month"))
      return data.earnings_last_month;
    if (settings.get("show_earnings_total")) return data.earnings_total;
    return "";
  }
};
