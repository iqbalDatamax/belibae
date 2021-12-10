<template>
	<div>
		<header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
	        <div class="flex p-3 flex-row items-center">
	            <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.go(-1)">
	                <i class="fas fa-arrow-left"></i>
	            </div>
	            <div class="inline-flex w-full">
	                <div class="w-full inline-block relative">
				      <p class="text-xl text-purple-700">Sukaku/wishlist</p>
		    		</div>
	            </div>
	        </div>
	    </header>
	    <div class="m-2 pt-16" v-if="sukaku == ''">
			<div class="mt-6 bg-purple-100 border-b-4 border-purple-700 p-4 rounded-lg">
			  <p class="font-bold text-purple-700 text-lg"><i class="fas fa-exclamation-circle"></i> Opppsss....</p>
			  <p class="text-purple-500 text-3xl">Belum ada suka....</p>
			</div>
		</div>
	    <div class="pt-16">
	    	<div class="pb-4">
	    	  <div v-for="tu in sukaku">
			      <div class="h-32 flex mt-3 px-3 py-2 bg-white shadow-lg" >
			      	<img class="block h-24 w-24 pt-2" v-bind:src="`${$axios.defaults.baseURL}/`+tu.produk.fotos[0].urlfoto">
			        <div class="py-2 pl-3">
			        	<nuxt-link :to="{name: 'produk-id', params: {id:tu.produk.uuid}}">
			        		<p class="font-semibold text-gray-700 ">{{tu.produk.namaproduk}}</p>
				         	<p class="font-medium text-gray-600"><del v-if="(tu.diskon/(tu.harga+tu.harga*10/100))*100 >= 0.5">Rp{{formatPrice(tu.harga+(tu.harga*10/100))}}</del><span class="text-purple-600"> Rp{{formatPrice((tu.harga+(tu.harga*10/100))-tu.diskon)}}</span></p>
			        	</nuxt-link>
			        	<div class="flex rounded-lg text-lg pt-3" role="group">
						    <button @click="hapusProduk(tu.uuid)" class="bg-white text-red-500 hover:bg-red-500 hover:text-white border border-red-500 rounded-lg px-2 py-1 mx-0 outline-none focus:shadow-outline ml-2"><i class="fas fa-trash-alt"></i></button>
						</div>
			        </div>
			      </div>
		      </div>
		    </div>
	    </div>

	    <Nav />
	</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import Nav from '~/components/nav.vue';


export default {
  middleware: 'auth',
  components: {
  	Nav
  },
  async asyncData({store}){
  	let user =  store.getters.loggedInUser
  	const data = {
		userId : user.id,
		status : 9
	}
  	await Promise.all([
  		store.dispatch('transaksi/getSukaku', data)
  	])
  	return
  },
  data() {
	return {
	}
  },
  computed: {
  	...mapState('transaksi', {
  		sukaku: state => state.sukaku
  	}),
  	...mapGetters(['loggedInUser']),
  },
  // created() {
  //   this.sukaku = this.suka
  // },
  methods: {
  	...mapActions('transaksi', ['hapusTransaksiData']),
  	formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    hapusProduk(id){
    	let dt = {
    		uuid : id,
    		status : 9,
    		userId : this.loggedInUser.id
    	}
    	this.hapusTransaksiData(dt).then(() => {
			alert('Produk berhasil dihapus');
		});
    },
  }
}
</script>

<style>

</style>