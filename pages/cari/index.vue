<template>
<div>
  	<header class="fixed w-full z-10 top-0 shadow-xl bg-white pb-1">
        <div class="flex p-3 flex-row items-center">
            <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.go(-1)">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div class="inline-flex w-full">
                <div class="w-full inline-block relative">
			      <input type="search" name="" class="h-10 leading-snug border w-full appearance-none bg-gray-100 text-gray-700 py-1 px-8 rounded-lg" placeholder="Cari Produk Apapun" v-model="search" @keyup.enter="searchProduk" />
			      <div class="pointer-events-none absolute h-10 pl-2 pr-2 inset-y-0 left-0 flex items-center px-2 text-gray-500">
			        <i class="fas fa-search"></i>
			      </div>
	    		</div>
            </div>
        </div>
    </header>
    <div class="pt-16 " v-if="produk != []">
    	<form-produks></form-produks>
    </div>
    <div class="grid mb-4 grid-cols-2 pt-20" v-else>
      <div v-for="kate in kategoris.kategoris">
        <nuxt-link class="flex items-center m-2 p-2 bg-white rounded-lg shadow border" :to="{name: 'kategori-produk-id', params: {id:kate.id}}">
          <div class="text-purple-600 bg-purple-100 rounded-xl">
            <img
              class="h-16 w-16 object-cover border rounded-xl"
              v-bind:src="`${$axios.defaults.baseURL}/`+kate.icon" alt="kategori">
          </div>
          <div>
            <p class="pl-2 font-semibold text-xs text-gray-700 dark:text-gray-200">{{kate.nama}}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  	<div class="pt-20">
  		<Nav />
  	</div>
</div>
</template>

<script>
import Produks from '~/components/listproduk.vue';
import Nav from '~/components/nav.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    'form-produks' : Produks,
    Nav
  },
  async asyncData({store}){
    let dk = `?foodbae=0`;
    await Promise.all([
      store.dispatch('kategori/getKategoriFoodbae', dk),
    ])
    return
  },
  data() {
    return {
      search: '',
      produk: ''
    }
  },
  computed: {
    ...mapState('kategori', {
      kategoris: state => state.kategoris
    }),
  },
  methods: {
    ...mapActions('produk', ['getProdukPublish']),
    searchProduk() {
      let data = `?namaproduk=${this.search}`
      this.getProdukPublish(data).then(()=>{
        this.produk = this.$store.state.produk.produks
      })
    }
  }
}
</script>