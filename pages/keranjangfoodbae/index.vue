<template>
	<div>
		<header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
	        <div class="flex p-3 flex-row items-center">
	            <div class="text-purple-600 text-xl ml-2 mr-5" @click="kembali()">
	                <i class="fas fa-arrow-left"></i>
	            </div>
	            <div class="inline-flex w-full">
	                <div class="w-full inline-block relative">
				      <p class="text-xl text-purple-700">Keranjang Foodbae</p>
		    		</div>
	            </div>
	        </div>
	    </header>
	    <div class="m-2 pt-16" v-if="transaksiUser == ''">
			<div class="mt-6 bg-purple-100 border-b-4 border-purple-700 p-4 rounded-lg">
			  <p class="font-bold text-purple-700 text-lg"><i class="fas fa-exclamation-circle"></i> Opppsss....</p>
			  <p class="text-purple-500 text-3xl">Belum ada pesanan....</p>
			</div>
		</div>
	    <div class="pt-16">
	    	<div class="pb-4">
	    	  <div v-for="tu in transaksiUser">
			      <div class="h-32 flex mt-3 px-3 py-2 bg-white shadow-lg" >
			      	<img v-if="tu.produk.fotos[0]" class="block h-24 w-24 pt-2" v-bind:src="`${$axios.defaults.baseURL}/`+tu.produk.fotos[0].urlfoto">
			      	<img v-else alt="detail foto" class="block h-24 w-24 pt-2" src="">
			        <div class="py-2 pl-3">
			        	<nuxt-link :to="{name: 'produk-id', params: {id:tu.produk.uuid}}">
			        		<p class="text-gray-700 ">{{tu.produk.namaproduk}}</p>
			        		<!-- harga Belibae -->
				         	<p class="text-gray-600"><del v-if="(tu.diskon/(tu.harga+tu.harga*10/100))*100 >= 0.5">Rp{{getCoret(tu.harga)}}</del><span class="text-purple-600"> Rp{{getHarga(tu.harga, tu.diskon)}}</span></p>
			        	</nuxt-link>
			        	
			         	<div class="flex justify-center rounded-lg pt-3" role="group">
						    <button @click="editQtyMin(tu.uuid, tu.qty)" class="bg-white text-purple-500 hover:bg-purple-500 hover:text-white border border-purple-500 rounded-l-lg px-3 py-1 mx-0 outline-none focus:shadow-outline" :disabled="db">-</button>
						    <input type="" name="" class="px-3 py-1 mx-0 text-center w-12 text-purple-500 border border-purple-500" v-model="tu.qty" readonly>
						    <button @click="editQtyPlus(tu.uuid, tu.qty, tu.produk.stok)" class="bg-white text-purple-500 hover:bg-purple-500 hover:text-white border border-purple-500 rounded-r-lg px-3 py-1 mx-0 outline-none focus:shadow-outline" :disabled="db">+</button>

						    <button @click="hapusProduk(tu.uuid)" class="bg-white text-red-500 hover:bg-red-500 hover:text-white border border-red-500 rounded-lg px-3 py-1 mx-0 outline-none focus:shadow-outline ml-2"><i class="fas fa-trash-alt"></i></button>
						</div>
			        </div>
			      </div>
		      </div>
		    </div>
	    </div>

	    <div class="w-full" v-if="transaksiUser != ''">
			<section class="block fixed inset-x-0 bottom-0 z-10 bg-white border-t-2 shadow">
				<div class="flex justify-between">
					<div class="text-left pl-4 pr-20 py-2">
						<span class="text-gray-600 text-lg">
	                        <p class="mb-0">Total</p>
	                    </span>
						<p class="font-semibold text-xl text-purple-700">Rp{{total()}}</p>
					</div>
					<div class="py-3 px-6">
						<nuxt-link :to="{name: 'checkoutfoodbae'}" class="rounded-xl py-3 px-5 text-white hoper:bg-purple-800 bg-purple-700 inline-block text-center">Checkout</nuxt-link>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  middleware: 'auth',
  components: {
  },
  async asyncData({store}){
  	let user =  store.getters.loggedInUser
  	const data = {
		userId : user.id,
		status : 1,
		foodbae : `?foodbae=1`
	}
  	await Promise.all([
  		store.dispatch('transaksi/getTransaksiUser', data)
  	])
  	return
  },
  data() {
	return {
		db : false
	}
  },
  computed: {
  	...mapGetters(['loggedInUser']),
  	...mapState('transaksi', {
  		transaksiUser: state => state.transaksiUser
  	}),
  },
  methods: {
  	...mapActions('transaksi', ['hapusTransaksiData', 'editQtyData', 'getJumlahKeranjang']),
  	formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    getHarga(harga, diskon){
    	return this.formatPrice(harga-diskon)
    },
    getCoret(harga){
    	return this.formatPrice(harga)
    },
    total() {
      let total = 0;
      this.transaksiUser.forEach((tu) => {
      	total += tu.qty*(tu.harga-tu.diskon)
      })

      return this.formatPrice(total)
    },
    kembali(){
    	let data = {
    		userId : this.loggedInUser.id
    	}
    	this.$router.go(-1);
    	this.getJumlahKeranjang(data)
    },
    hapusProduk(id){
    	let data = {
    		uuid : id,
    		status : 1,
    		userId : this.loggedInUser.id,
    		foodbae : `?foodbae=1`
    	}
    	this.hapusTransaksiData(data).then(() => {
			alert('Produk berhasil dihapus');
			this.getJumlahKeranjang(data)
		});
    },
    editQtyPlus(id, qty, stok){
    	if(qty < stok){
    		this.db = true;
	    	let data = {
	    		uuid : id,
	    		status : 1,
	    		userId : this.loggedInUser.id,
	    		qty : qty+1,
	    		foodbae : `?foodbae=1`
	    	}
	    	this.editQtyData(data).then(() => {
	    		this.db = false;
			});
    	}else{
    		alert('Jumlah pesanan melebihi stok')
    	}
    },
    editQtyMin(id, qty){
    	if(qty > 1){
    		this.db = true;
	    	let data = {
	    		uuid : id,
	    		status : 1,
	    		userId : this.loggedInUser.id,
	    		qty : qty-1,
	    		foodbae : `?foodbae=1`
	    	}
	    	this.editQtyData(data).then(() => {
	    		this.db = false
			});
    	}else{
    		alert('Minimal jumlah pesanan 1')
    	}
    }

  }
}
</script>

<style>

</style>