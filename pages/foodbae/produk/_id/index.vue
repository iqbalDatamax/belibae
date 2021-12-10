<template>
<div>
  <header class="fixed w-full z-10 top-0 shadow bg-white pb-1">
      <div class="flex p-3 flex-row items-center">
          <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.go(-1)">
              <i class="fas fa-arrow-left"></i>
          </div>
          <div class="inline-flex w-full">
            <div class="w-full inline-block relative">
              <input type="search" name="" class="h-10 leading-snug border w-full appearance-none bg-gray-100 text-gray-700 py-1 px-8 rounded-lg" placeholder="Cari produk kategori ini" v-model="search" @keyup.enter="searchProdukKate" />
              <div class="pointer-events-none absolute h-10 pl-2 pr-2 inset-y-0 left-0 flex items-center px-2 text-gray-500">
                <i class="fas fa-search"></i>
              </div>
            </div>
          </div>
      </div>
  </header>
  <div class="pt-16 px-3 border-b">
    <div v-if="tampilALamat" class="px-1 py-3">
      <label class="text-gray-700">Produk di sekitar</label>
      <p class="font-light text-sm text-gray-600"> Kecamatan {{kec.namakecamatan}}  Kab. {{kab.namakabupaten}}</p>
      <div class="flex justify-between pt-4">
        <div><p></p></div>
        <button class="text-purple-600 text-sm" @click="openPilihalamat">Gunakan alamat lain</button>
      </div>
    </div>
  </div>
  <div class="pb-20" v-if="tampilALamat">
    <form-produks></form-produks>
  </div>
  <Nav />

  <modal name="modal-alamat" :clickToClose="false" :height="'auto'" :scrollable="true" :width="'95%'" :adaptive="true">
    <div class="pb-4 px-3 py-4">
      <label class="text-lg font-semibold text-gray-700">Pilih kecamatan pengiriman</label>
      <p class="text-gray-700">Kami akan mencari produk foodbae disekitar kamu</p>
      <form class="flex flex-col" @submit.prevent="">
        <div class="mb-4 pt-4 pb-3">
          <v-select 
            :clearable="false"
            class="bg-gray-100"
            placeholder="Pilih kabupaten"
            v-model="kab"
            label="namakabupaten"
            :options="kabupatens"
            @input="pilKab"
            >
          </v-select>
        </div>
        <div class="mb-4 pb-3">
          <v-select
            :clearable="false"
            class="bg-gray-100"
            placeholder="Pilih kecamatan"
            v-model="kec"
            label="namakecamatan"
            :options="kecamatans"
            >
          </v-select>
        </div>
        <button class="hover:bg-purple-700 bg-purple-500 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit" @click="submitProdukAlamat">Submit</button>
      </form>
    </div>
  </modal>
</div>
</template>

<script>
import ProduksFoodbae from '~/components/produkfoodbae.vue';
import Nav from '~/components/navfoodbae.vue'; //ini yang membedakan
import { mapActions, mapState } from 'vuex';
import vSelect from 'vue-select'

export default {
  components: {
    'form-produks' : ProduksFoodbae,
    Nav,
    vSelect,
  },
  async asyncData({store, params}){
    await Promise.all([
      store.dispatch('alamat/getKabupatenData')
    ])
    return
  },
  data() {
    return {
      search: '',
      tampilALamat : false,
      alamat_lengkap : '',
      kecamatans : [],
      alamatUser : [],
      kab : null,
      kec : null,
    }
  },
  mounted() {
    this.$modal.show('modal-alamat')
  },
  computed: {
    ...mapState('alamat', {
      kabupatens: state => state.kabupatens
    }),
  },
  methods: {
    ...mapActions('produk', ['getProdukKategoriId']),
    ...mapActions('alamat', [
      'getKecKab',
    ]),
    searchProdukKate() {
      let data = {
        id : this.$route.params.id,
        query : `?namaproduk=${this.search}&idkec=${this.kec.id}`,
      }
      this.getProdukKategoriId(data)
    },
    pilKab(){
      this.getKecKab(this.kab.id).then(() => {
        const kecam = this.$store.state.alamat.kecamatanKab
        // this.kecam = true;
        this.kec = null;
        this.des = null
        this.kecamatans = kecam
      })
    },
    openPilihalamat(){
      this.$modal.show('modal-alamat')
    },
    submitProdukAlamat(){
      let dt = {
        id : this.$route.params.id,
        query : `?page=0&size=20&idkec=${this.kec.id}`
      }
      this.getProdukKategoriId(dt).then(() => {
        this.$modal.hide('modal-alamat');
        this.tampilALamat = true
      })
    },
  }
}
</script>