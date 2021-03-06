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
    <b-container>
      <b-table
        style="max-width:90%"
        v-if="serv.length != 0"
        class="mt-3 mx-auto"
        striped
        hover
        :dark="dark"
        small
        :fields="servFields"
        :items="serv"
      >
        <template v-slot:cell(no.)="data"> 0{{ data.index + 1 }} </template>

        <template v-slot:table-caption>
          Recent Servers
        </template>
      </b-table>
    </b-container>
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
      serv: [],
      servFields: ["no.", "IP", "Port", "API"]
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
      localStorage.serv = JSON.stringify(this.serv);
    },
    allStats() {
      this.$emit("all-stat");
    },
    saveInput() {
      setTimeout(() => {
        let rowVariant;
        this.errFetch ? (rowVariant = "danger") : (rowVariant = "success");

        this.serv.unshift({
          IP: this.serverIP,
          Port: this.serverPort,
          API: this.serverAPI,
          _rowVariant: rowVariant
        });
        if (this.serv.length >= 5) {
          this.serv.pop({
            IP: this.serverIP,
            Port: this.serverPort,
            API: this.serverAPI
          });
        }
      }, 1000);
    },
    clean() {
      alert("Are you sure? You Have to type again!");
      localStorage.clear();
      alert("All Cleared!!!");
      window.location.reload();
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
