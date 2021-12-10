<template>
 <div>
 	<div class="pb-1">
 		<Navbar />
 	</div>
  <div class="pt-16 max-w-lg mx-auto pb-20">
  	<div class="pb-3">
		<img class="h-40 w-screen" src="/banertoko.jpg">
	</div>
	<div class="mx-2 mb-3">
		<div class="w-full inline-block relative">
      <input type="text" name="" class="h-10 leading-snug border w-full appearance-none bg-gray-100 text-gray-700 py-1 px-8 rounded" placeholder="Cari Toko" v-model="search"  @keyup.enter="cariToko" />
      <div class="pointer-events-none absolute h-10 pl-2 pr-2 inset-y-0 left-0 flex items-center px-2 text-gray-300">
        <i class="fas fa-search"></i>
      </div>
    </div>
	</div>
		
	<div class="grid mb-2">
    <div v-for="toko in tokos.tokos">
      <nuxt-link class="flex items-center m-2 p-1 bg-white rounded-lg shadow border" :to="{name: 'toko-produk-id', params: {id:toko.id}}">
        <div class="mx-2 p-3 text-purple-600 bg-purple-100 rounded-xl">
          <i class="fas fa-store text-2xl"></i>
        </div>
        <div>
        	<p class="font-semibold text-gray-700 dark:text-gray-200">{{toko.namatoko}}</p>
          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{{toko.deskripsi}}</p>
        </div>
      </nuxt-link>
    </div>
  </div>
  <div class="flex justify-center pt-2 pb-6">
    <button v-if="size < 160" @click="next" class="border border-purple-500 hover:text-white hover:bg-purple-500 rounded px-10 py-1 text-purple-500 bg-white text-center text-semibold ml-4"> Toko Lainnya </button>
  </div>
  	
  </div>
  <Nav />
 </div>
</template>

<script>
import Nav from '~/components/nav.vue';
import Navbar from '~/components/navbar.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    Nav,
    Navbar
  },
  async asyncData({store}){
    let data = `?page=0&size=20`;
    await Promise.all([
      store.dispatch('toko/getTokoData', data)
    ])
    return
  },
  data() {
    return {
      search: null,
      loading: false,
      page: 0,
      tokos: '',
      size: 20
    } 
  },
  computed: {
    ...mapState('toko', {
      toko: state => state.tokos
    }),
  },
  created() {
    this.tokos = this.toko
  },
  methods: {
    ...mapActions('toko', [
      'getTokoData'
    ]),
    cariToko(){
      let data = `?namatoko=${this.search}`
      this.getTokoData(data).then(() => {
        this.tokos = this.$store.state.toko.tokos
      })
    },
    next(){
      this.size = this.size+20;

      let data = `?page=0&size=${this.size}`
      this.getTokoData(data).then(() => {
        let toko = this.$store.state.toko.tokos
        this.tokos = toko
      })
    },
  }
}
</script>

<style>

</style>