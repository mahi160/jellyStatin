<template>
  <div class="input-section">
    <!--INPUT CARD SECTION-->
    <b-container v-show="show">
      <!--LIGHT MODE-->
      <b-card bg-variant="light" header="JellyStat" class="text-center mx-auto">
        <b-card-text>
          <b-row>
            <b-col md="8">
              <div role="group">
                <b-form-input
                  id="input-live-ip"
                  v-model="serverIP"
                  :state="serverIPState"
                  @keyup="$emit('update:serverIP', serverIP)"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Jellyfin IP Address"
                  trim
                ></b-form-input>

                <b-form-invalid-feedback id="input-live-feedback">
                  http:// or https:// must be used!
                </b-form-invalid-feedback>
              </div>
            </b-col>

            <b-col md="4">
              <div role="group">
                <b-form-input
                  id="input-live-port"
                  type="number"
                  v-model="serverPort"
                  :state="serverPortState"
                  @keyup="$emit('update:serverPort', serverPort)"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Port"
                  trim
                ></b-form-input>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <div role="group">
                <b-form-input
                  id="input-live-api"
                  v-model="serverAPI"
                  :state="serverAPIState"
                  @keyup="$emit('update:serverApi', serverApi)"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Jellyfin API key"
                  trim
                ></b-form-input>
              </div>
            </b-col>
          </b-row>
        </b-card-text>
        <b-button
          variant="primary"
          @click="
            submit();
            allStats();
          "
          >Show Stats!</b-button
        >
      </b-card>
    </b-container>

    <error-section :errFetch="errFetch"></error-section>
    <quote-section :show="show"></quote-section>
  </div>
</template>

<script>
import ErrorSection from "@/components/ErrorSection.vue";
import QuoteSection from "@/components/QuoteSection.vue";
export default {
  name: "input-section",
  components: {
    ErrorSection,
    QuoteSection
  },
  props: {
    serverIP: String,
    serverPort: String,
    serverAPI: String,
    show: Boolean,
    errFetch: Boolean
  },
  computed: {
    serverIPState() {
      return this.serverIP.search("http") ? false : true;
    },
    serverPortState() {
      return this.serverPort.length == 4 ? true : false;
    },
    serverAPIState() {
      return this.serverAPI.length >= 15 ? true : false;
    }
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    allStats() {
      this.$emit("all-stat");
    }
  }
};
</script>

<style lang="scss">
.card {
  width: 600px;
  input {
    margin-top: 20px;
    padding: 15px;
    font-size: 20px;
  }
}
</style>
