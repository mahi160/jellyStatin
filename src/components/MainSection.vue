<template>
  <div class="main-section" v-show="!show">
    <caption style="width:250px" for="stats">
      <h1>{{ name }}</h1>
    </caption>
    <b-table
      caption-top
      :head-variant="headVariant"
      :table-variant="tableVariant"
      :dark="dark"
      sticky-header="400px"
      striped
      hover
      :items="items"
    ></b-table>
  </div>
</template>

<script>
export default {
  name: "main-section",
  props: {
    name: String,
    show: Boolean,
    items: Array,
    headVariant: String,
    tableVariant: String,
    dark: Boolean
  }
};
</script>

<style lang="scss">
.table {
  margin-bottom: 0;
}
</style>
