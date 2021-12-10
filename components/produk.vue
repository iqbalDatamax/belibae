<template>
	<div>
		<!-- tambah Foto Produk -->
		<section class="mt-4" v-if="tampilFoto">
			<label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Tambah foto produk (maksimal 3 & max size 2mb)</label>
			<div class="mb-1 pt-3" v-if="fotos.length<3">

			    <label class="block text-gray-700 text-sm mb-2 ml-1">Pilih Gambar</label>
		        <client-only>
		            <image-uploader
		              :debug="1"
		              :quality="0.6"
		              :preview=false
		              accept="image/*"
		              @input="setImage"
		            >
		              <label for="fileInput" slot="upload-label" class="text-gray-700">
		                <figure>
		                  <i class="fas fa-camera text-2xl border rounded px-6 py-2 mt-2"></i>
		                </figure>
		              </label>
		            </image-uploader>
		        </client-only>
            </div>
            <div class="flex" v-if="fotos.length>0">
            	<div class="mb-6 pl-2 flex flex-col" v-for="fot in fotos">
	            	<img
		                class="h-24 w-24 border rounded-t-lg object-cover"
		                v-bind:src="`${$axios.defaults.baseURL}/`+fot.urlfoto"
		                alt=""
		            />
		            <button class="bg-red-400 hover:bg-red-500 px-1 py-1 text-white text-xs rounded-b-lg shadow-lg" @click="hpsFoto(fot.id, fot.urlfoto)">hapus</button>
	            </div>
            </div>
            <nuxt-link :to="{name: 'akun-toko'}" v-if="fotos.length>0" class="px-4 py-2 m-2 hover:bg-purple-700 text-white font-bold rounded shadow-lg hover:shadow-xl transition duration-200" type="button" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)" @click="selese">Selesai
            </nuxt-link>
		</section>

		<!-- Jika Edit Foto Produk -->
		<section class="mt-4" v-if="!tampilFoto & $route.name === 'akun-toko-editproduk-id'">
			<label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Tambah foto produk (maksimal 3 & max size 2mb)</label>
			<div class="mb-1 pt-3" v-if="fotos.length<3">
			    <label class="block text-gray-700 text-sm mb-2 ml-1">Pilih Gambar</label>
		        <client-only>
		            <image-uploader
		              :debug="1"
		              :quality="0.6"
		              :preview=false
		              accept="image/*"
		              @input="setImage"
		            >
		              <label for="fileInput" slot="upload-label" class="text-gray-700">
		                <figure>
		                  <i class="fas fa-camera text-2xl border rounded px-6 py-2 mt-2"></i>
		                </figure>
		              </label>
		            </image-uploader>
		        </client-only>
            </div>
            <div class="flex" v-if="fotos.length>0">
            	<div class="mb-6 pr-2 flex flex-col" v-for="fot in fotos">
	            	<img
		                class="h-24 w-24 border rounded-t-lg object-cover"
		                v-bind:src="`${$axios.defaults.baseURL}/`+fot.urlfoto"
		                alt=""
		            />
		            <button class="bg-red-400 hover:bg-red-500 px-1 py-1 text-white text-xs rounded-b-lg shadow-lg" @click="hpsFoto(fot.id, fot.urlfoto)">hapus</button>
	            </div>
            </div>
		</section>

		<!-- Form Produk -->
		<section class="mt-4 pb-6" v-if="!tampilFoto">
			<ValidationObserver v-slot="{ invalid }">
		        <form class="flex flex-col" @submit.prevent="saveProduk">
		        	<div class="mb-2 pt-2">
		        		<ValidationProvider rules="required" v-slot="{ errors }">
			                <label class="block text-gray-700 text-sm font-semibold mb-2 ml-1">Nama Produk</label>
			                <input type="text" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="produks.namaproduk">
			                <p class="text-xs text-red-600">{{ errors[0] }}</p>
			            </ValidationProvider>
		            </div>
		            <div class="mb-2 pt-2">
		            	<ValidationProvider rules="required" v-slot="{ errors }">
			                <label class="block text-gray-700 text-sm font-semibold mb-2 ml-1">Stok</label>
			                <input type="number" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="produks.stok">
			                <p class="text-xs text-red-600">{{ errors[0] }}</p>
			            </ValidationProvider>
		            </div>
		            <div class="mb-2 pt-2">
		            	<ValidationProvider rules="required|min_value:1000" v-slot="{ errors }">
			                <div class="m-1" v-if="tokoUser.foodbae == 0">
								<div class="mt-2 bg-purple-100 border-l-4 border-purple-700 p-4 rounded-lg">
								  <p class="font-bold text-purple-700 text-sm"><i class="fas fa-exclamation-circle"></i> Notes !</p>
								  <li class="text-purple-500 text-xs pb-1">Jika <b>harga kurang dari sama dengan 200 Rb</b>, harga di belibae ditambahkan <b>10%</b></li>
								  <li class="text-purple-500 text-xs pb-1">Jika <b>harga lebih dari 200 Rb</b>, harga di belibae ditambahkan <b>5%</b></li>
								  <li class="text-purple-500 text-xs pb-1">Jika <b>harga lebih dari sama dengan 1 Jt</b>, harga di belibae ditambahkan <b>3%</b></li>
								</div>
							</div>
							<label class="block text-gray-700 text-sm font-semibold ml-1">Harga produk kamu : <b>Rp{{formatPrice(produks.harga-produks.diskon)}}</b></label>
							<div v-if="tokoUser.foodbae == 0">
								<label v-if="produks.harga <= 200000" class="block text-gray-600 text-sm mb-2 ml-1">Harga di belibae ditambahkan 10% yaitu {{formatPrice(produks.harga*10/100)}}</label>
			                	<label v-else-if="produks.harga > 200000 & produks.harga < 1000000" class="block text-gray-600 text-sm mb-2 ml-1">Harga di belibae ditambahkan 5% yaitu {{formatPrice(produks.harga*5/100)}}</label>
			                	<label v-else class="block text-gray-600 text-sm mb-2 ml-1">Harga di belibae ditambahkan 3% yaitu {{formatPrice(produks.harga*3/100)}}</label>
							</div>
			           
			                <input type="number" placeholder="isikan harga tanpa titik" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="produks.harga">
			                <p class="text-xs text-red-600">{{ errors[0] }}</p>
			            </ValidationProvider>
		            </div>
		            <div class="mb-2 pt-2">
		            	<ValidationProvider rules="required" v-slot="{ errors }">
			                <label class="block text-gray-700 text-sm font-semibold mb-1 ml-1">Diskon dalam rupiah (tuliskan berapa potongan yang diberikan)</label>
			                <label class="block text-green-600 text-sm mb-2 ml-1" v-if="produks.diskon>0">kamu memberi diskon jadi harga produkmu : <b>{{formatPrice(produks.harga-produks.diskon)}}</b></label>
			                <input type="number" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="produks.diskon" min="0">
			                <p class="text-xs text-red-600">{{ errors[0] }}</p>
			            </ValidationProvider>
		            </div>
		            <div class="mb-2 pt-2">
		            	<ValidationProvider rules="required" v-slot="{ errors }">
			                <label class="block text-gray-700 text-sm font-semibold mb-2 ml-1">Deskripsi produk</label>
			                <textarea type="text" class="h-40 bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="produks.deskripsi"></textarea>
			                <p class="text-xs text-red-600">{{ errors[0] }}</p>
			            </ValidationProvider>
		            </div>
		            <div class="mb-4" v-if="$route.name === 'akun-toko-tambahproduk'">
		            	<label class="block text-gray-700 text-sm font-semibold mb-2 ml-1">Pilih Kategori</label>
						<v-select
							class="bg-gray-100 rounded w-full text-gray-800"
							placeholder="Pilih kategori"
							multiple
    						v-model="kategoris"
    						label="nama"
    						:options="kategoridata"
    						>
    					</v-select>
			        </div>

			        <div v-if="tokoUser.foodbae == 0">
			        	<div class="mb-4 pt-2">
			            	<ValidationProvider rules="required" v-slot="{ errors }">
				                <label class="block text-gray-700 text-sm font-semibold ml-1">Apakah bisa dikembalikan?</label>
				                <div class="m-1">
									<div class="mt-2 bg-purple-100 border-l-4 border-purple-700 p-4 rounded-lg">
									  <p class="font-bold text-purple-700 text-sm"><i class="fas fa-exclamation-circle"></i> Notes jika produk bisa dikembalikan!</p>
									  <li class="text-purple-500 text-xs pb-1">pedagang akan mendapatkan 30% dari ongkos kirim, ongkir di satu kecamatan <b>Rp5.000</b> sedangkan beda kecamatan <b>Rp9.000</b></li>
									</div>
								</div>
				                <select  type="select" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="produks.bisakembali">
				                	<option class="py-1" value="1">Bisa</option>
	    							<option class="py-1" value="0">Tidak bisa</option>
				                </select>
				                <p class="text-xs text-red-600">{{ errors[0] }}</p>
				            </ValidationProvider>
			            </div>
				        <div class="mb-8 pt-2">
			            	<ValidationProvider rules="required" v-slot="{ errors }">
				                <label class="block text-gray-700 text-sm font-semibold mb-2 ml-1">Apakah bisa dicoba?</label>
				                <select  type="select" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="produks.bisacoba">
				                	<option class="py-1" value="1">Bisa</option>
	    							<option class="py-1" value="0">Tidak bisa</option>
				                </select>
				                <p class="text-xs text-red-600">{{ errors[0] }}</p>
				            </ValidationProvider>
			            </div>
			        </div>
		            <button class="mt-4 py-3 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit" v-bind:disabled="invalid" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)">Submit Produk</button>
		        </form>
	        </ValidationObserver>
	    </section>

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from 'vue-select'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    vSelect
  },
  data() {
  	return {
  		produks: {
  			namaproduk: '',
  			harga: null,
  			stok: null,
  			diskon: 0,
  			deskripsi: '',
  			bisacoba: null,
  			bisakembali: null,
  			freeongkir: 0,
  			star: 0,
  			status : 1
  		},
  		kategoris:[],
  		message:'',
  		alert: false,
  		fotourl: '',
  		produkId: '',
  		tampilFoto: false,
  		fotos:[]
  	}
  },
  created() {
  	if (this.$route.name == 'akun-toko-editproduk-id'){
  		this.produks = {
  			namaproduk: this.produk.namaproduk,
  			harga: this.produk.harga,
  			stok: this.produk.stok,
  			diskon: this.produk.diskon,
  			deskripsi: this.produk.deskripsi,
  			bisakembali: this.produk.bisakembali,
  			bisacoba: this.produk.bisacoba,
  			freeongkir: this.produk.freeongkir,
  			star: this.produk.star,
  			status: this.produk.status,
  			foodbae : this.produk.foodbae
  		}
  		this.fotos = this.produk.fotos;
  		this.produkId = this.produk.uuid;
  	}
  },
  computed: {
  	...mapState('produk', {
  		produk : state => state.produkId
  	}),
  	...mapState('toko', {
		tokoUser: state => state.tokoUserId
  	}),
  	...mapState('kategori', {
  		kategoridata: state => state.kategoris.kategoris
  	})
  },
  methods: {
  	formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
  	...mapActions('produk', ['tambahProdukData', 'editProduksData']),
  	...mapActions('foto', ['tambahFotoData', 'getFotoData', 'hapusFoto']),
  	// saveProduk(){
  	// 	if(this.$route.name === 'akun-toko-tambahproduk'){
  	// 		if(this.produks.diskon > this.produks.harga){
  	// 			alert('Diskon yang kamu berikan melebihi harga produk');
  	// 		}else if(this.kategoris.length > 3){
  	// 			alert('Maksimal 3 kategori dalam 1 produk')
  	// 		}else{
  	// 			let laba = null;
	  // 			let data = Object.assign({kategoris: this.kategoris, tokoId: this.tokoUser.id, laba: laba}, this.produks)
	  // 			this.tambahProdukData(data).then(() => {
	  // 				alert('Produk berhasil ditambah');
	  // 				this.produkId = this.$store.state.produk.idProduk
	  // 				this.tampilFoto = true
	  // 			});
  	// 		}
  	// 	}else{
  	// 		if(this.produks.diskon > this.produks.harga){
  	// 			alert('Diskon yang kamu berikan melebihi harga produk');
  	// 		}else{
  	// 			let data = Object.assign({uuid: this.$route.params.id}, this.produks)
	  // 			this.editProduksData(data).then(() => {
	  // 				alert('Produk berhasil diubah');
	  // 				this.$router.push({name : 'akun-toko'})
	  // 			});
  	// 		}
  	// 	}
  	// },

  	saveProduk(){
  		if(this.$route.name === 'akun-toko-tambahproduk'){
  			if(this.produks.diskon > this.produks.harga){
  				alert('Diskon yang kamu berikan melebihi harga produk');
  			}else{
	  			let data = Object.assign({kategoris: this.kategoris, tokoId: this.tokoUser.id}, this.produks)
	  			this.tambahProdukData(data).then(() => {
	  				alert('Produk berhasil ditambah');
	  				this.produkId = this.$store.state.produk.idProduk
	  				this.tampilFoto = true
	  			});
  			}
  		}else{
  			if(this.produks.diskon > this.produks.harga){
  				alert('Diskon yang kamu berikan melebihi harga produk');
  			}else{
  				let data = Object.assign({uuid: this.$route.params.id}, this.produks)
	  			this.editProduksData(data).then(() => {
	  				alert('Produk berhasil diubah');
	  				this.$router.push(`/akun/toko/listproduk/${this.tokoUser.id}`)
	  			});
  			}
  		}
  	},

  	selese(){
  		this.tampilFoto = false
  		this.$router.push(`/akun/toko/listproduk/${this.tokoUser.id}`)
  	},
  	
  	setImage: function(output) {
      this.fotourl = output;
      this.saveImage(this.fotourl);
    },

	saveImage(img){
  		if(img === ''){
  			alert('foto tidak boleh kosong');
  		}else{
  			let data = {
	  			produkId : this.produkId,
	  			urlfoto : img
	  		};
	  		this.tambahFotoData(data).then(() => {
	  			this.tampilFotoProduk(this.produkId);
	  			alert('Berhasil menambah foto');
	  		});
  		}		
  	},
  	tampilFotoProduk(idProduk){
  		this.getFotoData(idProduk).then(() => {
  			this.fotos = this.$store.state.foto.fotos
  		})
  	},
  	hpsFoto(id, urlfoto){
  		let dt = {
  			id:id,
  			urlfoto:urlfoto
  		};
		var r = confirm("Foto akan dihapus?");
		if (r == true) {
		    this.hapusFoto(dt).then(() => {
		    	this.tampilFotoProduk(this.produkId);
		    	alert("Foto berhasil dihapus")
		    })
		}
  	}
  }
}
</script>

<style>
#fileInput {
  display: none;
}
</style>