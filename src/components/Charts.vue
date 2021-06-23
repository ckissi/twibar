<template>
  <div class="h-64 p-4 m-6 mt-3 mb-2 bg-gray-800 rounded-lg">
    <div class="flex justify-end" v-if="this.datas.data.length > 0">
      <div
        class="grid grid-cols-2 py-1 text-sm text-gray-200 bg-gray-900 divide-x divide-gray-700 rounded-md"
      >
        <div class="flex px-1">
          <a
            href="#"
            class="px-3 rounded hover:bg-gray-400 focus:outline-none"
            :class="{ 'bg-gray-500': !show_deltas }"
            @click="delta(false)"
            >Trend</a
          >
        </div>
        <div class="flex px-1">
          <a
            href="#"
            class="px-3 rounded hover:bg-gray-400 focus:outline-none"
            :class="{ 'bg-gray-500': show_deltas }"
            @click="delta(true)"
            >Daily</a
          >
        </div>
      </div>
    </div>
    <chart-bar
      v-if="!show_deltas && this.datas.data.length > 0"
      :datas="datas"
    ></chart-bar>
    <chart-bar-deltas
      v-if="show_deltas && this.datas.data.length > 0"
      :datas="datas"
    ></chart-bar-deltas>
    <div v-if="this.datas.data.length == 0">
      <div class="p-2 text-red-600 border border-red-500 rounded-md">
        No data. Please check your API key
      </div>
      <div class="flex flex-col mt-10 space-y-2 text-gray-100">
        <div class="text-left">How to proceed...</div>
        <a
          @click="goHome"
          class="inline font-semibold text-left text-blue-500 cursor-pointer"
          >1. Click here to get your api key</a
        >
        <div class="mb-2 text-left">
          2. Click the configure button below to enter your API key
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartBar from "./ChartBar.vue";
import ChartBarDeltas from "./ChartBarDeltas.vue";
import { shell } from "electron";
export default {
  components: { ChartBar, ChartBarDeltas },
  data() {
    return {
      show_deltas: false
    };
  },
  props: {
    datas: {
      type: Object
    }
  },
  methods: {
    delta(value) {
      this.show_deltas = value;
      //
    },
    goHome() {
      let url = `http://twibar.test/user/profile`;
      shell.openExternal(url);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
