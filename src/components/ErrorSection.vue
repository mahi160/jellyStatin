<template>
  <div class="basic-data-section" v-show="errFetch">
    <!--WARNING SECTION-->
    <b-alert variant="danger" class="mx-auto" show>
      Cannot Fetch API data from Jellyfin Server! Make sure all inputs are
      correctly filled.
    </b-alert>
  </div>
</template>

<script>
export default {
  name: "error-section",
  props: {
    errFetch: Boolean //error while fetching data
  }
};
</script>

<style>
.alert {
  max-width: 30rem;
  margin-top: 30px;
}
</style>
