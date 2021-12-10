<template>
  <div>         
    <div class="bg-white max-w-lg mx-auto my-2">
      <div class="flex flex-wrap">
        <div class="m-2 pt-2" v-if="produks.totalItems == 0 || produks.produks[0].tokos.alamats == null">
          <div class="mt-6 bg-purple-100 border-b-4 border-purple-700 p-4 rounded-lg">
            <p class="font-bold text-purple-700 text-lg"><i class="fas fa-exclamation-circle"></i> Opppsss....</p>
            <p class="text-purple-500 text-3xl">Produk tidak ditemukan....</p>
          </div>
        </div>
        <div class="px-1 py-1 w-1/2" v-for="produk in produks.produks" v-else>
          <article class="overflow-hidden rounded shadow">
            <nuxt-link :to="{name: 'produkfoodbae-id', params: {id:produk.uuid}}">
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
              <div class="flex px-2" v-if="produk.tokos.foodbae == 1">
                <p class="font-semibold text-sm text-purple-700">Rp{{getHarga(produk.harga, produk.diskon)}}</p>
              </div>
              <!-- diskon -->
              <div class="py-1 flex justify-between">
                <p v-if="(produk.diskon/(produk.harga+produk.harga*10/100))*100 >= 0.5" class="text-sm text-gray-400 px-2">
                  <del>{{getCoret(produk.harga)}}</del>
                  <span class="text-xs px-1 bg-red-300 text-red-800 rounded">{{getDiskon(produk.harga, produk.diskon)}}%</span>
                </p>
                <div class="text-gray-800"><button></button></div><!-- bantu -->
              </div>
              <div class="flex px-2 pt-2">
                <p class="text-xs text-gray-600"><i class="fa fa-map-marker-alt"></i> {{produk.tokos.alamats.desa.kecamatan.namakecamatan}}</p>
              </div>
            </nuxt-link> 
            <div class="py-1 flex justify-between">
                <p></p> <!-- bantu -->
                <button type="button" @click="addToSukaku(produk)" class="px-2 text-gray-700 hover:text-gray-100"><i class="far fa-heart"></i></button>
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
    console.log(this.produks)
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
      return this.formatPrice(harga-diskon)
    },
    getCoret(harga){
      return this.formatPrice(harga)
    },
    formatDiskon(value) {
      return value.toFixed();
    },
    getDiskon(harga, diskon){
      return this.formatDiskon((diskon/harga)*100)
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