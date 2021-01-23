<template>
  <div class="heading">
    <h1>Bowling Calculator</h1>
    <svg
      class="heading__reload"
      v-on:click="reload()"
      height="30"
      width="30"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 0C8.92 0 0 8.92 0 20v60c0 11.08 8.92 20 20 20h60c11.08 0 20-8.92 20-20V20c0-11.08-8.92-20-20-20H20zm28.637 14.227c12.252 0 23 6.562 28.947 16.345l7.023-4.265.372 23.529L64.22 38.688l7.457-4.528c-4.709-7.791-13.24-12.992-23.041-12.992-11.452 0-21.188 7.025-25.094 17.066-.087.269-.146.535-.283.848-.964 2.14-3.17 3.237-4.93 2.45-1.153-.52-1.874-1.756-1.883-3.233.016-.705.278-1.543.592-2.371 4.903-12.677 17.22-21.701 31.598-21.701zM15.02 50.164L35.78 61.312l-7.457 4.528c4.709 7.791 13.24 12.992 23.041 12.992 11.452 0 21.188-7.025 25.094-17.066.087-.269.146-.535.283-.848.964-2.14 3.17-3.237 4.93-2.45 1.153.52 1.874 1.756 1.883 3.233-.016.705-.278 1.543-.592 2.371-4.903 12.677-17.22 21.701-31.598 21.701-12.252 0-23-6.562-28.947-16.345l-7.023 4.265-.372-23.529z"
        fill="#006db3"
      />
    </svg>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Heading",
  methods: {
    ...mapMutations(["reload"]),
  },
};
</script>

<style lang="scss" scoped>
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: #006db3;

  &__reload {
    cursor: pointer;
  }
}
</style>
