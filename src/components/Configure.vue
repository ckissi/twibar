<template>
  <div class="h-64 m-6 mt-3 mb-2 bg-gray-800 rounded-lg">
    <div class="flex py-3 mx-3">
      <div class="w-full">
        <div class="float-left text-gray-500">Api Key</div>
        <input
          v-model="newapikey"
          class="w-full p-1 text-xs bg-gray-200 rounded"
        />
      </div>
    </div>
    <div v-if="apikey == ''" class="text-red-600">
      API Key must be configured
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apikey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      newapikey: ""
    };
  },
  watch: {
    newapikey(newValue) {
      this.$parent.$data.apikey = newValue;
    }
  },
  mounted() {
    this.newapikey = this.apikey;
  }
};
</script>

<style lang="scss" scoped></style>
