<template>
 <div>
 	<div class="pb-1">
 		<Navbar />
 	</div>
  <div class="pt-16 max-w-lg mx-auto pb-20">
  	<div class="pb-6">
  		<img class="h-40 w-screen" src="/banerkategori.jpg">
  	</div>
    <nuxt-link to="/foodbae" >
      <div class="mx-3 text-center border rounded-xl p-3 bg-purple-100">
        <label class="text-xl font-bold text-purple-500"><i class="fas fa-utensils"></i> Pesan Foodbae Disini</label>
      </div>
    </nuxt-link>
    <nuxt-link to="/toko" >
      <div class="mt-2 mx-3 text-center border rounded-xl p-3 bg-purple-100">
        <label class="text-xl font-bold text-purple-500"><i class="fas fa-store"></i> Semua Toko</label>
      </div>
    </nuxt-link>
    
  	<div class="flex flex-wrap pt-4">
  		<div class="px-2 py-2 w-1/4" v-for="kate in kategoris.kategoris">
  			<nuxt-link :to="{name: 'kategori-produk-id', params: {id:kate.id}}">
  			  <div class="text-center">
		          <img
		          class="h-20 w-20 border rounded-xl"
		          v-bind:src="`${$axios.defaults.baseURL}/`+kate.icon" alt="kategori">
		          <span class="text-xs leading-none text-gray-600 py-2">{{kate.nama}}</span>
	          </div>
	        </nuxt-link>
  		</div>
  	</div>
  </div>
  <Nav />
 </div>
</template>

<script>
import Navbar from '~/components/navbar.vue';
import Nav from '~/components/nav.vue';
import { mapActions, mapState } from 'vuex';

export default {
  async asyncData({store}){
    let dk = `?foodbae=0`;
    await Promise.all([
      store.dispatch('kategori/getKategoriFoodbae', dk),
    ])
    return
  },
  components: {
    Nav,
    Navbar
  },
  computed: {
  	...mapState('kategori', {
      kategoris: state => state.kategoris
    }),
  }
}
</script>

<style>

</style>
