<template>
  <div class="main-section">
    <b-container v-show="!show">
      <div class="inputCard mx-auto">
        <caption style="width:250px" for="stats">
          <h1>{{ name }}</h1>
        </caption>
        <b-table
          caption-top
          head-variant="light"
          table-variant="danger"
          outlined
          striped
          hover
          :items="movies"
        ></b-table>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "main-section",
  props: {
    name: String,
    show: Boolean,
    movies: Array
  }
};
</script>

<style lang="scss">
.table {
  margin-bottom: 0;
}
</style>
