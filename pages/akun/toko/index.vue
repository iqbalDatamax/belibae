<template>
<div>
	<header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
        <div class="flex p-3 flex-row items-center">
            <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.push('/akun')">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div class="inline-flex w-full">
                <div class="w-full inline-block relative">
			      <p class="text-xl text-purple-700">Toko Saya</p>
	    		</div>
            </div>
        </div>
    </header>
    <div>
    	<div class="flex items-center p-2 bg-white shadow-lg mt-16">
		    <div class="py-5 px-4 m-2 text-purple-500 bg-purple-200 rounded-full">
		      <i class="fas fa-store text-5xl"></i>
		    </div>
		    <div class="ml-4 mb-2">
		    	<p class="text-gray-700 dark:text-gray-400 uppercase">{{usertoko.namatoko}}</p>
		      	<p class="mb-1 text-sm text-gray-700 dark:text-gray-200">{{usertoko.deskripsi}}</p>
		      	<p class="mb-2 text-sm text-gray-700 dark:text-gray-200">Sejak {{formatDate(usertoko.createdAt)}}</p>
		      	<div class="py-1 flex justify-between pt-4">
                	<div class="">
                		<label class="font-semibold text-sm text-gray-600">Bagikan tokomu di : </label>
						<ShareNetwork
						    network="facebook"
						    class="rounded bg-blue-700 text-white px-2 py-1"
						    :name="title"
						    :url="url + usertoko.id"
						    :title="usertoko.namatoko"
						    :quote="usertoko.namatoko"
						  >

						    <span><i class="fab fah fa-lg fa-facebook-f p-2"></i></span>
						</ShareNetwork>
						<ShareNetwork
						    network="whatsapp"
						    class="rounded bg-green-400 text-white py-1 px-2"
						    :title="title + usertoko.namatoko"
						    description="Marketplacenya orang lombok"
						    :url="url + usertoko.id"
						  >
						    <i class="fab fah fa-lg fa-whatsapp"></i>
						</ShareNetwork>
					</div>
                </div>
		    </div>
		</div>
		<!-- menu toko -->
		<div class="bg-white max-w-lg mx-auto md:p-2 my-2 pb-4">
		    <div class="justify-between w-full">
		  		<div class="p-4">
		  			<nuxt-link :to="{name: 'akun-toko-edittoko-id', params: {id:usertoko.id}}" class="flex justify-between py-4 border-b">
		  				<div class="text-gray-700">Edit toko</div>
		  				<div class="text-gray-700">
		  					<i class="fas fa-chevron-right"></i>
		  				</div>
		  			</nuxt-link>
		  			<nuxt-link :to="{name: 'akun-toko-tambahproduk'}" class="flex justify-between py-4 border-b">
		  				<div class="text-gray-700">Tambah Produk</div>
		  				<div class="text-gray-700">
		  					<i class="fas fa-chevron-right"></i>
		  				</div>
		  			</nuxt-link>
		  			<nuxt-link :to="{name: 'akun-toko-listproduk-id', params: {id:usertoko.id}}" class="flex justify-between py-4 border-b">
		  				<div class="text-gray-700">List Produk</div>
		  				<div class="text-gray-700">
		  					<i class="fas fa-chevron-right"></i>
		  				</div>
		  			</nuxt-link>
		  			<nuxt-link :to="{name: 'akun-toko-produkdibeli-id', params: {id:usertoko.id}}" class="flex justify-between py-4 border-b">
		  				<div class="text-gray-700">Produk Dibeli <span class="ml-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white">{{countKemas}}</span>
		  				</div>
		  				<div class="text-gray-700">
		  					<i class="fas fa-chevron-right"></i>
		  				</div>
		  			</nuxt-link>
		  			<nuxt-link :to="{name: 'akun-toko-produkdijemput-id', params: {id:usertoko.id}}" class="flex justify-between py-4 border-b">
		  				<div class="text-gray-700">Sedang dijemput <span class="ml-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white">{{countKirim}}</span>
		  				</div>
		  				<div class="text-gray-700">
		  					<i class="fas fa-chevron-right"></i>
		  				</div>
		  			</nuxt-link>
		  			<nuxt-link :to="{name: 'akun-toko-produkditerima-id', params: {id:usertoko.id}}" class="flex justify-between py-4 border-b">
		  				<div class="text-gray-700">Produk diterima <span class="ml-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white">{{countTerima}}</span>
		  				</div>
		  				<div class="text-gray-700">
		  					<i class="fas fa-chevron-right"></i>
		  				</div>
		  			</nuxt-link>
		  			<nuxt-link :to="{name: 'akun-toko-produkkembali-id', params: {id:usertoko.id}}" class="flex justify-between py-4 border-b">
		  				<div class="text-gray-700">Produk dikembalikan</div>
		  				<div class="text-gray-700">
		  					<i class="fas fa-chevron-right"></i>
		  				</div>
		  			</nuxt-link>
		  			<nuxt-link :to="{name: 'akun-toko-produkselesai-id', params: {id:usertoko.id}}" class="flex justify-between py-4 border-b">
		  				<div class="text-gray-700">Transaksi selesai</div>
		  				<div class="text-gray-700">
		  					<i class="fas fa-chevron-right"></i>
		  				</div>
		  			</nuxt-link>
		  	  </div>
		  	</div>
		</div>
    </div>
</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';


export default {
	middleware: 'auth',
	components: {
	  
	},
	async asyncData({store, params}){
		let toko = '';
		let user = store.getters.loggedInUser;
		await store.dispatch('alamat/getAlamatUserId', user.id);
		await store.dispatch('toko/getTokoUserId', user.id).then(()=>{
			toko = store.state.toko.tokoUserId;
			store.dispatch('transaksi/getJumlahKemas', toko)
			store.dispatch('transaksi/getJumlahKirim', toko)
			store.dispatch('transaksi/getJumlahTerima', toko)
			return
		})
	},
	data() {
		return {
			title : 'Belibae | ',
  			url : 'https://belibae.id/toko/produk/',
			namatoko: '',
			deskripsi: '',
			toko: null,
			almt: '',
			alamat_lengkap : '',
		}
	},
	head() {
	    return {
	        title: this.title+this.usertoko.namatoko
	    }
	},
	computed: {
		...mapGetters('transaksi',{
		  countKemas: 'countKemas',
		  countKirim: 'countKirim',
		  countTerima: 'countTerima'
		}),
		...mapState('toko', {
		    usertoko : state => state.tokoUserId
		}),
	},
	methods: {
		formatDate(val){
	  		const months = ["Januari", "Februari", "Maret","April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
	  		let date = new Date(val)
	  		return months[date.getMonth()] + " " + date.getFullYear()
	  	},
	}
}
</script>