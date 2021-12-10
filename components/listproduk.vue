<template>
  <div>         
    <div class="bg-white max-w-lg mx-auto my-2">
      <div class="flex flex-wrap" v-if="$route.name === 'cari'">

        <div class="m-2 pt-16" v-if="produks.totalItems == 0">
          <div class="mt-6 bg-purple-100 border-b-4 border-purple-700 p-4 rounded-lg">
            <p class="font-bold text-purple-700 text-lg"><i class="fas fa-exclamation-circle"></i> Opppsss....</p>
            <p class="text-purple-500 text-3xl">Produk tidak ditemukan....</p>
          </div>
        </div>
          <div class="px-1 py-1 w-1/2" v-for="produk in produks.produks">
              <article class="overflow-hidden rounded shadow">
                <nuxt-link :to="{name: 'produk-id', params: {id:produk.uuid}}">
                  <div>
                      <img v-if="produk.fotos[0]" alt="detail foto" 
                      class="block h-40 w-full" 
                      v-bind:src="`${$axios.defaults.baseURL}/`+produk.fotos[0].urlfoto">

                      <img v-else alt="detail foto" 
                      class="block h-40 w-full" 
                      src="">
                  </div>
                  <div class="flex">
                    <p class="text-xs px-2 py-2 text-gray-800">{{produk.namaproduk}}</p>
                  </div>
                  <div class="flex px-2">
                    <p class="font-semibold text-sm text-purple-700">Rp{{getHarga(produk.harga, produk.diskon)}}</p>
                    <img v-if="produk.freeongkir" class="ml-4 w-14 h-6" src="/icon_gratis_ongkir.png" alt="gratis ongkir" />
                  </div>
                  <!-- diskon -->
                  <div class="py-1 flex justify-between">
                    <p v-if="(produk.diskon/(produk.harga+produk.harga*10/100))*100 >= 0.5" class="text-sm text-gray-400 px-2">
                      <del>{{getCoret(produk.harga, produk.diskon)}}</del>
                      <span class="text-xs px-1 bg-red-300 text-red-800 rounded">{{getDiskon(produk.harga, produk.diskon)}}%</span>
                    </p>
                    <div class="text-gray-800"><button></button></div><!-- bantu -->
                  </div>
                  <div class="flex px-2 pt-2">
                    <p class="text-xs text-gray-600"><i class="fa fa-map-marker-alt"></i> {{produk.tokos.alamats.desa.kecamatan.namakecamatan}}</p>
                  </div>
                </nuxt-link> 
                <div class="py-1 flex justify-between">
                    <img v-if="produk.bisacoba" class="w-16 h-8" src="/icon_bisacoba.png" alt="gratis ongkir" />
                    <img v-if="produk.bisakembali" class="w-16 h-9" src="/bisa_dikembalikan.png" alt="bisa kembali" />
                    <p></p> <!-- bantu -->
                    <button type="button" @click="addToSukaku(produk)" class="px-2 text-gray-700 hover:text-gray-100"><i class="far fa-heart"></i></button>
                </div>
              </article>
          </div>
      </div>
      <!-- jika kategori dan toko -->
      <div class="flex flex-wrap" v-else>
        <div class="m-2 pt-2" v-if="produks.totalItems == 0">
          <div class="mt-6 bg-purple-100 border-b-4 border-purple-700 p-4 rounded-lg">
            <p class="font-bold text-purple-700 text-lg"><i class="fas fa-exclamation-circle"></i> Opppsss....</p>
            <p class="text-purple-500 text-3xl">Produk tidak ditemukan....</p>
          </div>
        </div>
        <div class="px-1 py-1 w-1/2" v-for="produk in produks.produks">
          <article class="overflow-hidden rounded shadow">
            <nuxt-link :to="{name: 'produk-id', params: {id:produk.uuid}}">
              <div>
                  <img v-if="produk.fotos[0]" alt="detail foto" 
                  class="block h-40 w-full" 
                  v-bind:src="`${$axios.defaults.baseURL}/`+produk.fotos[0].urlfoto">

                  <img v-else alt="detail foto" 
                  class="block h-40 w-full" 
                  src="">
              </div>
              <div class="flex">
                <p class="text-xs px-2 py-2 text-gray-800">{{produk.namaproduk}}</p>
              </div>
              <div class="flex px-2" v-if="$route.name === 'akun-toko-listproduk-id'">
                <p class="font-semibold text-sm text-purple-700">Rp{{formatPrice(produk.harga-produk.diskon)}} <span v-if="produk.tokos.foodbae == 0">(Harga toko)</span></p>
              </div>
              <div class="flex px-2" v-if="produk.tokos.foodbae == 0">
                <p class="font-semibold text-sm text-purple-700">Rp{{getHarga(produk.harga, produk.diskon)}}</p>
                <img v-if="produk.freeongkir" class="ml-4 w-14 h-6" src="/icon_gratis_ongkir.png" alt="gratis ongkir" />
              </div>
              <!-- diskon -->
              <div class="py-1 flex justify-between">
                <p v-if="(produk.diskon/(produk.harga+produk.harga*10/100))*100 >= 0.5" class="text-sm text-gray-400 px-2">
                  <del>{{getCoret(produk.harga, produk.diskon)}}</del>
                  <span class="text-xs px-1 bg-red-300 text-red-800 rounded">{{getDiskon(produk.harga, produk.diskon)}}%</span>
                </p>
                <div class="text-gray-800"><button></button></div><!-- bantu -->
              </div>
              <div class="flex px-2 pt-2">
                <p class="text-xs text-gray-600"><i class="fa fa-map-marker-alt"></i> {{produk.tokos.alamats.desa.kecamatan.namakecamatan}}</p>
              </div>
            </nuxt-link> 
            <div class="py-1 flex justify-between">
                <img v-if="produk.bisacoba" class="w-16 h-8" src="/icon_bisacoba.png" alt="gratis ongkir" />
                <img v-if="produk.bisakembali" class="w-16 h-9" src="/bisa_dikembalikan.png" alt="bisa kembali" />
                <p></p> <!-- bantu -->
                <button type="button" @click="addToSukaku(produk)" class="px-2 text-gray-700 hover:text-gray-100"><i class="far fa-heart"></i></button>
            </div>
            <div v-if="$route.name === 'akun-toko-listproduk-id'">
              <nuxt-link :to="{name: 'akun-toko-editproduk-id', params: {id:produk.uuid}}" type="button" class="px-3 py-1 rounded-lg m-1 text-gray-700 hover:text-purple-500 border">Edit</nuxt-link>
              <button  @click="hapusproduk(produk.uuid, produk.tokos.id)" type="button" class="px-3 py-1 rounded-lg bg-red-600 m-1 text-white border">Hapus</button>
            </div>
          </article>
        </div>
        <div class="flex justify-center pt-2 pb-6">
          <button v-if="size < produks.totalItems" @click="nextkate" class="border border-purple-500 hover:text-white hover:bg-purple-500 rounded px-10 py-1 text-purple-500 bg-white text-center text-semibold ml-4"> Lihat Lainnya </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      size:20,
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState('produk', {
      produks : state => state.produks
    })
  },
  created() {
    if(this.$route.name == 'cari'){
      this.produks = []
    }
  },
  methods: {
    ...mapActions('transaksi', ['tambahTransaksiData']),
    ...mapActions('produk', ['hapusProdukStatus', 'getProdukKategoriId']),
    formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    getHarga(harga, diskon){
      if(harga <= 200000){
        return this.formatPrice((harga + harga*10/100)-diskon)
      }else if(harga > 200000 & harga <= 1000000){
        return this.formatPrice((harga + harga*5/100)-diskon)
      }else if(harga > 1000000){
        return this.formatPrice((harga + harga*3/100)-diskon)
      }
    },
    getCoret(harga, diskon){
      if(harga <= 200000){
        return this.formatPrice(harga + harga*10/100)
      }else if(harga > 200000 & harga <= 1000000){
        return this.formatPrice(harga + harga*5/100)
      }else if(harga > 1000000){
        return this.formatPrice(harga + harga*3/100)
      }
    },
    formatDiskon(value) {
      return value.toFixed();
    },
    getDiskon(harga, diskon){
      if(harga <= 200000){
        return this.formatDiskon((diskon/(harga+harga*10/100))*100)
      }else if(harga > 200000 & harga <= 1000000){
        return this.formatDiskon((diskon/(harga+harga*5/100))*100)
      }else if(harga > 1000000){
        return this.formatDiskon((diskon/(harga+harga*3/100))*100)
      }
    },

    hapusproduk(uuid, tokoId){
      let dt = {
          tokoid : tokoId,
          uuid : uuid
      }
      var r = confirm("Produk akan dihapus?");
      if (r == true) {
          this.hapusProdukStatus(dt).then(() => {
            alert("Produk berhasil dihapus")
          })
      }
    },
    addToSukaku(produk) {
      if (this.$store.state.auth.loggedIn) {
        let data = {
          qty : 1,
          diskon : produk.diskon,
          harga : produk.harga,
          userId : this.loggedInUser.id,
          produkId : produk.uuid,
          tokoId : produk.tokos[0].id,
          status : 9
        }
        this.tambahTransaksiData(data).then(() => {
          alert('Produk berhasil ditambah disukaku');
        });
      }else{
        this.$router.push('/login')
      }
    },

    nextkate(){
      this.size = this.size + 20 ;
      let data = {
        id : this.$route.params.id,
        query : `?page=0&size=${this.size}`
      }
      this.getProdukKategoriId(data).then(() => {
        this.produks = this.$store.state.produk.produks
      })
    },

  }
}
</script>