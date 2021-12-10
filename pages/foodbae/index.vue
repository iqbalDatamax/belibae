<template>
 <div>
 	<div class="pb-1">
 		<Navbar />
 	</div>
  <div class="pt-16 max-w-lg mx-auto pb-20">
  	<div class="pb-4">
  		<img class="h-40 w-screen" src="/banerkategori.jpg">
  	</div>
  	<div class="flex flex-wrap pt-4">
  		<div class="px-2 py-2 w-1/4" v-for="kate in kategoris.kategoris">
  			<nuxt-link :to="{name: 'foodbae-produk-id', params: {id:kate.id}}">
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
import Nav from '~/components/navfoodbae.vue';
import { mapActions, mapState } from 'vuex';

export default {
  middleware: 'auth',
  async asyncData({store}){
    let dk = `?foodbae=1`;
    let user =  store.getters.loggedInUser
    let data = {
      userId : user.id
    };
    await Promise.all([
      store.dispatch('kategori/getKategoriFoodbae', dk),
      store.dispatch('transaksi/getJumlahKeranjangFoodbae', data),
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
