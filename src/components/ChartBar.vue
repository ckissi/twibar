<template>
  <div class="flex items-end px-1 mt-4 space-x-4 text-xs">
    <div
      v-for="item in datas.data"
      :key="item.id"
      class="flex flex-col items-center pt-2 space-y-3 text-gray-100"
    >
      <div class="text-xxs">{{ item.followers_count }}</div>
      <div
        class="w-6 bg-yellow-500 rounded-md"
        :style="{ height: item.height + 'px' }"
      ></div>
      <div>{{ item.dow }}</div>
    </div>
    <div
      v-for="item in datas_add"
      :key="item.id"
      class="flex flex-col items-center pt-2 space-y-3 text-gray-100"
    >
      <div class="text-xxs">{{ item.delta }}</div>
      <div
        class="w-6 bg-gray-700 rounded-md"
        :style="{ height: item.deltaheight + 'px' }"
      ></div>
      <div>{{ item.dow }}</div>
    </div>
  </div>
</template>

<script>
let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export default {
  props: {
    datas: {
      type: Object
      //
    }
  },
  computed: {
    datas_add() {
      let temp = [];
      if (this.datas.data.length == 0) return;
      if (this.datas.data.length < 7) {
        for (let i = 1; i <= 7 - this.datas.data.length; i++) {
          temp.push({
            id: Math.random()
              .toString(36)
              .substring(2, 7),
            delta: "",
            deltaheight: 10,
            dow: this.getDayOfWeek(
              this.datas.data[this.datas.data.length - 1].checked_at,
              i
            )
          });
        }
      }
      return temp;
    }
  },
  methods: {
    getDayOfWeek(dt, i) {
      let d = new Date(Date.parse(dt) + 1000 * 60 * 60 * 24 * i);
      d = d.getDay();
      return days[d];
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
