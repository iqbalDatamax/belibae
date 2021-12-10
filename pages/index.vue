<template>
 <div>
  <div class="pb-1">
    <Navbar />
  </div>
  <div class="pt-16 max-w-lg mx-auto pb-20">
    <splide
    :options="options"
    >
      <splide-slide>
        <img 
    class="h-48 w-screen"
        src="/baner1.jpg"
        alt="baner"
    >
      </splide-slide>
      <splide-slide>
        <img 
    class="h-48 w-screen object-cover"
        src="/baner2.jpg"
        alt="baner"
    >
      </splide-slide>
      <splide-slide>
        <img 
    class="h-48 w-screen object-cover"
        src="/baner3.jpg"
        alt="baner"
    >
      </splide-slide>
    </splide>
    <div class="py-4 px-4">
      <splide
     :options="option2">
      <splide-slide v-for="kate in kategoris" :key="kate.icon">
        <nuxt-link :to="{name: 'kategori-produk-id', params: {id:kate.id}}">
          <div class="text-center">
            <img
            class="h-16 w-16 border rounded-xl"
            v-bind:src="`${$axios.defaults.baseURL}/`+kate.icon" alt="kategori">
            <span class="block text-xs leading-none text-gray-600 py-2">{{kate.nama}}</span>
          </div>
        </nuxt-link>
      </splide-slide>
    </splide>
    </div>
    <!-- sabuk informasi -->
    <div class="h-32">
      <img 
      class="h-32 w-full object-cover"
          src="/banerberanda.jpg"
          alt="baner"
      >
    </div>

    <div class="flex justify-between pt-4" v-if="produkStar != ''">
      <p class="py-2 px-2 text-gray-800 text-xl text-bold text-purple-800">Produk Favorit</p>
      <nuxt-link :to="{name: 'cari'}" class="pt-3 px-3 text-green-400 text-bold text-sm">Lihat semua</nuxt-link>
    </div>
    <div class="bg-white max-w-lg mx-auto my-2">
      <div class="flex flex-wrap">
          <div class="px-1 py-1 w-1/2" v-for="produk in produkStar">
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
                    <p v-if="getDiskon(produk.harga, produk.diskon) >= 0.5" class="text-sm text-gray-400 px-2">
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
    </div>

    <div class="flex justify-between pt-4" v-if="produkTerbaru.totalItems > 0">
      <p class="py-2 px-2 text-gray-800 text-xl text-bold text-purple-800">Produk Terbaru</p>
      <nuxt-link :to="{name: 'cari'}" class="pt-3 px-3 text-green-400 text-bold text-sm">Lihat semua</nuxt-link>
    </div>
    <div class="bg-white max-w-lg mx-auto my-2">
      <div class="flex flex-wrap">
          <div class="px-1 py-1 w-1/2" v-for="produk in produkTerbaru.produks">
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
    </div>
    <div class="flex justify-center pt-2 pb-6">
      <button v-if="size < 160" @click="next" class="border border-purple-500 hover:text-white hover:bg-purple-500 rounded px-10 py-1 text-purple-500 bg-white text-center text-semibold ml-4"> Lihat Lainnya </button>
    </div>

  </div>
  <Nav />
 </div>
</template>

<script>
import Nav from '~/components/nav.vue';
import Navbar from '~/components/navbar.vue';
import { mapActions, mapState, mapGetters } from 'vuex';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default {
  components: {
    Nav,
    Navbar
  },
  async asyncData({store}){
    let dk = `?foodbae=0`;
    let dp = `?page=0&size=20`;
    let user =  store.getters.loggedInUser
    // let data = {
    //   userId : user.id
    // }
    await Promise.all([
      store.dispatch('kategori/getKategoriFoodbae', dk),
      store.dispatch('produk/getProdukFavorit'),
      store.dispatch('produk/getProdukPublish', dp),
      // store.dispatch('transaksi/getJumlahKeranjang', data),
    ])
    return
  },
  data(){
    return {
      size : 20,
      page : 0,
      options: {
        rewind: true,
        autoplay: true,
        gap   : '1rem',
      },
      option2: {
        rewind: false,
        pagination: false,
        arrows: false,
        perPage: 5,
        perMove: 1,
        gap   : '1rem',
      }
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState('kategori', {
      kategoris: state => state.kategoris.kategoris
    }),
    ...mapState('produk', {
      produkStar: state => state.produkFavorit
    }),
    ...mapState('produk', {
      produkTerbaru: state => state.produks
    }),
  },
  methods: {
    ...mapActions('transaksi', ['tambahTransaksiData']),
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
    ...mapActions('produk', ['getProdukPublish']),
    next(){
      this.size = this.size+20;

      let data = `?page=0&size=${this.size}`
      this.getProdukPublish(data).then(() => {
        let pT = this.$store.state.produk.produks
        this.produkTerbaru = pT
      })
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
    }
  }
}
</script>

<style>

</style>
