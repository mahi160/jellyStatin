<template>
  <div class="input-section" v-show="show">
    <b-card
      :bg-variant="bgVariant"
      :text-variant="textVariant"
      header="Welcome"
      class="text-center mx-auto"
    >
      <b-card-text>
        <b-row>
          <!--IP address-->
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

              <!--To give error feedback-->
              <b-form-invalid-feedback id="input-live-feedback">
                http:// or https:// must be used!
              </b-form-invalid-feedback>
            </div>
          </b-col>

          <!--Port-->
          <b-col md="4">
            <b-form-input
              id="input-live-port"
              type="text"
              v-model="serverPort"
              :state="serverPortState"
              @keyup="$emit('update:serverPort', serverPort)"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Port"
              trim
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <!--API-->
          <b-col>
            <b-form-input
              id="input-live-api"
              v-model="serverAPI"
              :state="serverAPIState"
              @keyup="$emit('update:serverAPI', serverAPI)"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Jellyfin API key"
              trim
            ></b-form-input>
          </b-col>
        </b-row>
      </b-card-text>

      <!--Submit Button-->
      <b-button
        variant="primary"
        @click="
          submit();
          allStats();
          saveInput();
        "
      >
        Show Stats!
      </b-button>
    </b-card>

    <!--Error-->
    <error-section :errFetch="errFetch"></error-section>

    <!--Quote-->
    <quote-section :show="show"></quote-section>

    <!--Server Save-->
    <b-table class="mt-3" striped hover :dark="dark" small :items="serv">
      <template v-slot:table-caption>Recent Servers</template>
    </b-table>
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
    errFetch: Boolean,
    bgVariant: String,
    textVariant: String,
    dark: Boolean
  },
  data() {
    return {
      serv: JSON.parse(localStorage.serv)
    };
  },
  computed: {
    serverIPState() {
      return String(this.serverIP).search("http") ? false : true;
    },
    serverPortState() {
      return String(this.serverPort).length == 4 ? true : false;
    },
    serverAPIState() {
      return String(this.serverAPI).length >= 15 ? true : false;
    }
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    saveInput() {
      if (this.serv.length >= 5) {
        this.serv.pop({
          IP: this.serverIP,
          Port: this.serverPort,
          API: this.serverAPI
        });
      }
      let rowVariant;
      this.errFetch ? rowVariant="success":rowVariant="danger";
      this.serv.unshift({
        IP: this.serverIP,
        Port: this.serverPort,
        API: this.serverAPI,
        _rowVariant: rowVariant
      });
      localStorage.serv = JSON.stringify(this.serv);
      console.log(localStorage.serv);
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
