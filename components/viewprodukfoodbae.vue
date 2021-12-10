<template>
<div>
	<div class="pb-20">
		<div class="bg-white max-w-lg mx-auto md:p-2 my-2 shadow-lg">
	        <div class="justify-between w-full">
	        	<splide
			      :options="options"
			    >
			      <splide-slide v-for="foto in produkid.fotos" :key="foto.urlfoto">
			        <img 
					class="h-full w-full object-cover"
			        v-bind:src="`${$axios.defaults.baseURL}/`+foto.urlfoto"
			        alt="detail"
					>
			      </splide-slide>
			    </splide>
			    <div>
				    <div class="p-2">
				    	<div class="pb-3 flex justify-between">
				    		<p class="pr-2 text-sm">{{produkid.namaproduk}}</p>
				    		<img v-if="produkid.bisacoba" class="w-12 h-8 border-2 rounded-full" src="/icon_bisacoba.png" alt="gratis ongkir" />
				    	</div>
						<div class="flex">
							<!-- harga -->
							<p class="font-semibold text-sm text-purple-700">Rp{{getHarga(produkid.harga, produkid.diskon)}}</p>
							<img v-if="produkid.freeongkir" class="ml-4 w-14 h-6" src="/icon_gratis_ongkir.png" alt="gratis ongkir" />
						</div>

						<div>
	                      	<p v-if="(produkid.diskon/(produkid.harga+produkid.harga*10/100))*100 >= 0.5" class="text-sm text-gray-400 px-2">
		                      <del>{{getCoret(produkid.harga)}}</del>
		                      <span class="text-xs px-1 bg-red-300 text-red-800 rounded">{{getDiskon(produkid.harga, produkid.diskon)}}%</span>
		                    </p>
	                    </div>
	                    
						<div class="flex px-2 pt-2">
		                  <p class="text-xs text-gray-600"><i class="fa fa-map-marker-alt"></i> {{produkid.tokos.alamats.desa.namadesa}} kec. {{produkid.tokos.alamats.desa.kecamatan.namakecamatan}}</p>
		                </div>
		                <div class="py-1 flex justify-between">
		                    <p></p> <!-- bantu -->
		                    <button type="button" @click="addToSukaku" class="px-2 text-gray-700 hover:text-gray-100"><i class="far fa-heart"></i></button>
		                </div>
		                <div class="py-1 flex justify-between pt-6">
		                	<div class="">
		                		<label class="font-semibold text-gray-600 text-sm">Bagikan Ke : </label>
								<ShareNetwork
								    network="facebook"
								    class="rounded bg-blue-700 text-white px-2 py-1"
								    :name="title"
								    :url="url"
								    :title="produkid.namaproduk"
								    :quote="produkid.namaproduk"
								  >
								    <span><i class="fab fah fa-lg fa-facebook-f pr-2"></i>Facebook</span>
								</ShareNetwork>
								<ShareNetwork
								    network="whatsapp"
								    class="rounded bg-green-400 text-white py-1 px-2"
								    :title="title + produkid.namaproduk"
								    description="Marketplacenya orang lombok"
								    :url="url"
								  >
								    <i class="fab fah fa-lg fa-whatsapp"></i>
								</ShareNetwork>
							</div>
		                </div>
		             
				    </div>
				</div>
			</div>
		</div>
		<div class="bg-white max-w-lg mx-auto md:p-2 my-2 shadow-2xl">
	        <div class="justify-between w-full">
				<div class="p-2">
					<p class="font-bold pb-2 text-gray-700">Penjual</p>
					<div class="flex justify-between pb-2">
						<div class="font-semibold">{{produkid.tokos.namatoko}}</div>
						<nuxt-link :to="{name: 'toko-produk-id', params: {id:produkid.tokos.id}}" class="h-8 px-4 py-1 bg-gray-300 hover:bg-gray-400 text-gray-600 text-sm rounded-lg hover:shadow transition duration-200 ">
							<span><i class="fas fa-eye"></i> Lihat toko</span>
						</nuxt-link>
					</div>
					<div class="flex justify-between">
						<a :href="getLinkWhastapp()" class="h-8 px-2 py-1 bg-green-400 hover:bg-green-500 text-white text-sm rounded-lg hover:shadow transition duration-200">
							<span><i class="fab fah fa-whatsapp"></i> Chat Penjual</span>
						</a>
					</div>
			    </div>
			</div>
		</div>
		<div class="bg-white max-w-lg mx-auto md:p-2 my-2 shadow-2xl">
	        <div class="justify-between w-full">
				<div class="p-2">
					<p class="font-bold pb-2 text-gray-700">Informasi Produk</p>
					<div class="flex justify-between pb-2 text-sm">
						<div class="">Stok</div>
						<div class="font-semibold">{{produkid.stok}}</div>
					</div>
					<div class="flex justify-between pb-2 text-sm">
						<div class="">Dikirim dari</div>
						<div class="font-semibold">{{produkid.tokos.alamats.desa.namadesa}} kec. {{produkid.tokos.alamats.desa.kecamatan.namakecamatan}}</div>
					</div>
					<div class="flex justify-between pb-2 text-sm">
						<div class="">Diskon</div>
						<div class="font-semibold">{{getDiskon(produkid.harga, produkid.diskon)}}%
						</div>
						
					</div>
					<div class="flex justify-between pb-2 text-sm">
						<div>Kategori</div>
						<div class="text-right">
							<ul v-for="kate in produkid.kategoris">
			            		<li>{{kate.nama}}</li>
			            	</ul>
						</div>
					</div>
			    </div>
			</div>
		</div>
		<div class="bg-white max-w-lg mx-auto md:p-2 my-2 shadow-2xl">
	        <div class="justify-between w-full">
				<div class="p-2">
					<p class="font-bold pb-2 text-gray-700">Deskripsi Produk</p>
					<p class="text-sm text-gray-600" style="white-space: pre-line;">{{produkid.deskripsi}}</p>
			    </div>
			</div>
		</div>
	</div>


	<div class="w-full">
		<section class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
			<div class="flex justify-between">
				<div class="px-6 py-2 flex bg-gray-100">
					<p class="pr-3 font-semibold text-gray-600 pt-1">Qty</p>
					<div class="flex justify-center rounded-lg" role="group">
					    <button class="bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500 rounded-l-lg px-3 py-1 mx-0 outline-none focus:shadow-outline" @click="kurangQty">-</button>
					    <input type="" name="" class="px-3 py-1 mx-0 text-center w-12 text-blue-500 border border-blue-500" v-model="qty" readonly>
					    <button class="bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500 rounded-r-lg px-3 py-1 mx-0 outline-none focus:shadow-outline" @click="tambahQty">+</button>
					</div>
				</div>
				<button @click="openModal"
				class="w-full hover:text-teal-500 inline-block text-center p-2 bg-purple-700">
					<div class="text-center">
	                    <span class="block text-white text-lg leading-8">
	                        <i class="fas fa-cart-plus"></i>
	                    </span>
	                    <span class="block text-sm leading-none text-white">Tambah keranjang</span>
	                </div>
				</button>
			</div>
		</section>
	</div>

	<modal name="modal-pesan" :height="'auto'" :scrollable="true" :width="'95%'" :adaptive="true">
    	<div class="pb-4 px-3 py-4">
    		<h1 class="text-gray-700 font-semibold text-lg mb-4">Tulis catatan pesananmu (Opsional)</h1>
	    	<textarea type="text" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="pesan" placeholder="Misalnya pedes level, dll">
	    	</textarea>
	    	<button @click="addToKeranjang" class="mt-4 py-2 px-4 hover:bg-purple-700 text-white font-bold rounded shadow-lg hover:shadow-xl transition duration-200" type="button" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)">Submit</button>
    	</div>
    </modal>
		
</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default {
  components: {
    'splide' : Splide,
    'splide-slide' : SplideSlide,
  },
  data() {
  	return {
  		pesan : '',
  		title : 'Belibae | ',
  		url : 'https://belibae.id'+$nuxt.$route.path,
  		qty : 1,
  		options: {
		  rewind: true,
		  gap   : '1rem',
		}
  	}
  },
  head() {
    return {
        title: this.title+this.produkid.namaproduk
    }
  },
  computed: {
  	...mapGetters(['loggedInUser']),
  	...mapState('produk', {
  		produkid : state => state.produkId
  	})
  },
  methods: {
  	...mapActions('transaksi', ['tambahTransaksiData']),
  	formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    getHarga(harga, diskon){
    	return this.formatPrice(harga-diskon)
      // if(harga <= 200000){
      //   return this.formatPrice((harga + harga*10/100)-diskon)
      // }else if(harga > 200000 & harga <= 1000000){
      //   return this.formatPrice((harga + harga*5/100)-diskon)
      // }else if(harga > 1000000){
      //   return this.formatPrice((harga + harga*3/100)-diskon)
      // }
    },
    getCoret(harga){
    	return this.formatPrice(harga)
      // if(harga <= 200000){
      //   return this.formatPrice(harga + harga*10/100)
      // }else if(harga > 200000 & harga <= 1000000){
      //   return this.formatPrice(harga + harga*5/100)
      // }else if(harga > 1000000){
      //   return this.formatPrice(harga + harga*3/100)
      // }
    },
    formatDiskon(value) {
      return value.toFixed();
    },
    getDiskon(harga, diskon){
      return this.formatDiskon((diskon/harga)*100)
      // if(harga <= 200000){
      //   return this.formatDiskon((diskon/(harga+harga*10/100))*100)
      // }else if(harga > 200000 & harga <= 1000000){
      //   return this.formatDiskon((diskon/(harga+harga*5/100))*100)
      // }else if(harga > 1000000){
      //   return this.formatDiskon((diskon/(harga+harga*3/100))*100)
      // }
    },

    getLinkWhastapp() {
      let number = this.produkid.tokos.user.nomor_wa
	  let numberwa = '+62'+ number.slice(1);
	  let message = this.url + '%0D%0AInfo%20produk%20ini%20kak';
	  return 'https://api.whatsapp.com/send?phone=' + numberwa + '&text=%20' + message
	},
    tambahQty(){
    	if(this.qty < this.produkid.stok){
    		this.qty++
    	}else{
    		alert('Jumlah pesanan melebihi stok')
    	}
    },
    kurangQty(){
    	if(this.qty > 1){
    		this.qty--
    	}else{
    		alert('Minimal jumlah pesanan 1')
    	}
    },
    openModal(){
    	this.$modal.show('modal-pesan');
    },
    closeModel(){
    	this.$modal.hide('modal-pesan');
    },
    addToKeranjang() {
    	if (this.$store.state.auth.loggedIn) {
		    let data = {
	    		qty : this.qty,
	    		diskon : this.produkid.diskon,
	    		harga : this.produkid.harga,
	    		userId : this.loggedInUser.id,
	    		produkId : this.produkid.uuid,
	    		tokoId : this.produkid.tokos.id,
	    		status : 1,
	    		foodbae : 1,
	    		kirim_langsung : 1,
	    		pesan : this.pesan,
	    		tgl_transaksi: new Date(),
	    	}
	    	if(this.produkid.stok == 0){
	    		alert('Stok kosong atau tidak tersedia')
	    	}else{
	    		this.tambahTransaksiData(data).then(() => {
					alert('Produk berhasil ditambah dikeranjang');
					this.$router.push('/keranjangfoodbae');
				});
	    	}
		}else{
			this.$router.push('/login')
		}
    },
    addToSukaku() {
    	if (this.$store.state.auth.loggedIn) {
		    let data = {
	    		qty : this.qty,
	    		diskon : this.produkid.diskon,
	    		harga : this.produkid.harga,
	    		userId : this.loggedInUser.id,
	    		produkId : this.produkid.uuid,
	    		tokoId : this.produkid.tokos.id,
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