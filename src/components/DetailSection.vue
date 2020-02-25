<template>
  <div class="detail-section">
    
    <b-row>
      <!--Artist-->
      <div class="mx-1">
        <b-button
          v-b-modal.artist
          variant="info"
        >
          Artists
        </b-button>

        <b-modal 
          id="artist"
          :header-bg-variant="modalMode"
          header-text-variant="info"
          :body-bg-variant="modalMode"
          :footer-bg-variant="modalMode"
          centered 
          title="Artists"
        >
          <b-table
            caption-top
            sticky-header="400px"
            name="Artists" 
            :headVariant="modalMode"
            tableVariant="info"
            :dark="isDark" 
            :items="itemsArtist" 
            :fields="fields"
          >
            <template v-slot:cell(index)="data">
              <span v-if="data.index < 9">0</span>{{ data.index + 1 }}
            </template>
          </b-table>
          <template v-slot:modal-footer>
            <div class="w-100">
              <p class="float-left">There is in total <b>{{ itemsArtist[0].count}}</b> Artists in your music folder. </p>
            </div>
          </template>
        </b-modal>
      </div>

      <!--Album Artist-->
      <div class="mx-1">
        <b-button
          v-b-modal.albumArtist
          variant="danger"
        >
          Album Artists
        </b-button>

        <b-modal 
          id="albumArtist"
          :header-bg-variant="modalMode"
          header-text-variant="danger"
          :body-bg-variant="modalMode"
          :footer-bg-variant="modalMode"
          centered 
          title="Album Artists"

        >
          <b-table
            caption-top
            sticky-header="400px"
            name="Album Artists" 
            :headVariant="modalMode"
            tableVariant="danger"
            :dark="isDark" 
            :items="itemsAlbum" 
            :fields="fields"
          >
            <template v-slot:cell(index)="data">
              <span v-if="data.index < 9">0</span>{{ data.index + 1 }}
            </template>
          </b-table>

          <template v-slot:modal-footer>
            <div class="w-100">
              <p class="float-left">There is in total <b>{{ itemsAlbum[0].count}}</b> Album Artists in your music folder. </p>
            </div>
          </template>
        </b-modal>
      </div>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "detail-section",
  props: {
    modalMode: String, //dark or light?
    isDark: Boolean, //for dark mode
    itemsArtist: Array, //items for the Artist
    itemsAlbum: Array, //items for the Album
    fields: Array, //table fields
  },
  data(){
    return {
      
    }
  }
}
</script>

<style>

</style>
