<template>
  <div>
    <div class="flex flex-col mx-6 mt-6 mb-2 bg-gray-800 rounded-lg">
      <!-- <div class="flex items-center justify-center space-x-4">
      <img :src="user.avatar" class="rounded-full" />
      <div class="font-medium text-gray-200">{{ user.name }}</div>
    </div> -->
      <div class="grid grid-cols-3 my-3 text-gray-300 divide-x divide-gray-600">
        <div>
          <div class="text-lg font-semibold">
            {{
              Array.isArray(this.datas.data) && this.datas.data.length > 0
                ? new Intl.NumberFormat().format(
                    this.datas.data[this.datas.data.length - 1].followers_count
                  )
                : "-"
            }}
          </div>
          <div class="text-xs font-medium text-gray-500">Followers</div>
        </div>
        <div>
          <div class="text-lg font-semibold">
            {{
              Array.isArray(this.datas.data) && this.datas.data.length > 0
                ? new Intl.NumberFormat().format(
                    this.datas.data[this.datas.data.length - 1]
                      .followers_count - this.datas.data[0].followers_count
                  )
                : "-"
            }}
          </div>
          <div class="text-xs font-medium text-gray-500">Last 7 Days</div>
        </div>
        <div>
          <div class="text-lg font-semibold">
            {{
              Array.isArray(this.datas.data) && this.datas.data.length > 0
                ? new Intl.NumberFormat().format(
                    Math.round(
                      (this.datas.data[this.datas.data.length - 1]
                        .followers_count -
                        this.datas.data[0].followers_count) /
                        this.datas.data.length
                    )
                  )
                : "-"
            }}
          </div>
          <div class="text-xs font-medium text-gray-500">Δ New Daily</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      followers_count: 0,
      following_count: 0
    };
  },
  props: {
    user: {
      type: Object
    },
    datas: {
      type: Object
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
