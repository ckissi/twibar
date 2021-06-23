<template>
  <div id="app" class="bg-black">
    <profile :user="user" :datas="datas"></profile>
    <charts v-if="!configure" :datas="datas"></charts>
    <configure v-if="configure" datas="datas" :apikey="apikey"></configure>
    <status-bar
      :configure="configure"
      @configSaved="configSaved($event)"
    ></status-bar>
  </div>
</template>

<script>
import Profile from "./components/Profile.vue";
import { ipcRenderer, remote } from "electron";
import Charts from "./components/Charts.vue";
import StatusBar from "./components/StatusBar.vue";
window.ipcRenderer = ipcRenderer;
import functions from "./functions.js";
const settings = require("electron-settings");
import Configure from "./components/Configure.vue";

export default {
  name: "App",
  components: {
    Profile,
    Charts,
    StatusBar,
    Configure
  },
  data() {
    return {
      user: {},
      datas: {
        data: {}
      },
      apikey: "",
      configure: false
      //
    };
  },
  methods: {
    getData() {},
    showData(data) {
      this.datas = data.data;
      if (data.err != "") {
        this.datas = {};
        this.datas.data = [];
        return;
        //
      }
      let maxv = 0;
      // Find max value
      for (const element of this.datas.data) {
        if (element.followers_count > maxv) {
          maxv = element.followers_count;
        }
      }
      maxv = Math.max.apply(
        Math,
        this.datas.data.map(function(o) {
          return o.followers_count;
        })
      );
      for (const element of this.datas.data) {
        element.height = ((element.followers_count / maxv) * 100 + 20).toFixed(
          0
        );
      }

      // calculate deltas
      for (let i = 0; i < this.datas.data.length; i++) {
        this.datas.data[i].delta =
          i > 0
            ? this.datas.data[i].followers_count -
              this.datas.data[i - 1].followers_count
            : 0;
      }
      // Find max delta value
      maxv = 0;
      for (const element of this.datas.data) {
        if (element.delta > maxv) {
          maxv = element.delta;
        }
      }
      // calculate delta heigths
      for (const element of this.datas.data) {
        element.deltaheight = ((element.delta / maxv) * 100 + 20).toFixed(0);
      }
      ipcRenderer.send("data-ready", data);
    },
    configSaved() {
      console.log("emited");
      functions.getData(this.showData);
    }
  },
  mounted() {
    this.apikey = settings.getSync("apikey");
    if (typeof this.apikey === "undefined") {
      this.configure = true;
      return;
    }

    functions.getData(this.showData);

    ipcRenderer.on("killProcesses", () => {
      //this.killProcesses();
      remote.app.quit();
    });
  }
};
</script>

<style src="./assets/tailwind.css"></style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
