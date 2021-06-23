<template>
  <div
    class="flex justify-between pt-3 mx-6 mt-3 text-gray-400 border-t border-gray-800"
  >
    <a
      v-if="!configure"
      class="flex items-center justify-center w-24 px-4 py-1 text-sm bg-gray-900 rounded cursor-pointer hover:bg-gray-600"
      @click="configureApp"
    >
      Configure
    </a>
    <a
      v-if="configure"
      class="flex items-center justify-center px-4 py-1 text-sm bg-gray-900 rounded cursor-pointer w-36 hover:bg-gray-600"
      @click="cancelConfig"
    >
      Cancel
    </a>
    <a
      v-if="configure"
      class="flex items-center justify-center px-4 py-1 text-sm bg-gray-900 rounded cursor-pointer w-36 hover:bg-gray-600"
      @click="saveConfig"
    >
      Save Config
    </a>
    <a
      v-if="!configure"
      class="flex items-center justify-center w-24 px-4 py-1 text-sm bg-gray-900 rounded cursor-pointer hover:bg-gray-600"
      @click="closeApp"
    >
      Quit
    </a>
  </div>
</template>

<script>
const { remote } = require("electron");
import functions from "../functions.js";
export default {
  props: {
    configure: {
      type: Boolean,
      default: false
    },
    configSaved: {
      type: Function
    }
  },
  methods: {
    closeApp() {
      remote.app.quit();
    },
    configureApp() {
      this.$parent.$data.configure = true;
    },
    saveConfig() {
      functions.saveSettings(this.$parent.$data.apikey);
      this.$emit("configSaved");
      this.cancelConfig();
    },
    cancelConfig() {
      if (
        this.$parent.$data.apikey === "" ||
        typeof this.$parent.$data.apikey == "undefined"
      ) {
        return;
      }
      this.$parent.$data.configure = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
