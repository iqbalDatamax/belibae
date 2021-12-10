<template>
	<div>
		<header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
	        <div class="flex p-3 flex-row items-center">
	            <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.go(-1)">
	                <i class="fas fa-arrow-left"></i>
	            </div>
	            <div class="inline-flex w-full">
	                <div class="w-full inline-block relative">
				      <p class="text-xl text-purple-700">Checkout</p>
		    		</div>
	            </div>
	        </div>
	    </header>
        <div class="pt-16 px-3 border-b-2">
        	<a v-if="alamatId == ''" @click="openPilihalamat" class="flex justify-between py-4">
				<div class="text-lg text-gray-700">Pilih Alamat Pengiriman</div>
				<div class="font-semibold text-gray-700">
					<i class="text-xl fas fa-chevron-right"></i>
				</div>
			</a>
			<div v-else class="px-2 py-3">
	        	<label class="text-gray-700">Alamat pengiriman</label>
	        	<p class="font-light text-sm text-gray-600">{{alamatId.desa.namadesa}} Kec. {{alamatId.desa.kecamatan.namakecamatan}}  Kab. {{alamatId.desa.kecamatan.kabupaten.namakabupaten}}</p>
	        	<p class="font-light text-sm text-gray-600">{{alamatId.alamat_lengkap}}</p>
	        	<div class="flex justify-between pt-4">
	        		<div><p></p></div>
	        		<button class="text-purple-600 text-sm" @click="openPilihalamat">Gunakan alamat lain</button>
	        	</div>
			</div>
        </div>
        <div class="pt-2 pb-24">
	        <div class="bg-white px-3 pt-2">
	        	<label class="text-gray-700">Pesanan :</label>
	        </div>
	        <div class="bg-white bg-white shadow-lg" v-for="tu in transaksiUser">
				<div class="h-24 px-3 flex mt-3 border-b">
			      	<img v-if="tu.produk.fotos[0]" class="block h-20 w-20 pt-2" v-bind:src="`${$axios.defaults.baseURL}/`+tu.produk.fotos[0].urlfoto">
			      	<img v-else alt="detail foto" class="block h-20 w-20" src="">
			        <div class="py-2 pl-3">
			        	<p class="font-light text-gray-800 ">{{tu.produk.namaproduk}}</p>
			         	<p class="text-gray-600"><del v-if="(tu.diskon/(tu.harga+tu.harga*10/100))*100 >= 0.5">Rp{{getCoret(tu.harga)}}</del><span class="text-purple-600"> Rp{{getHarga(tu.harga, tu.diskon)}}</span></p>
			         	<p>x {{tu.qty}}</p>
			        </div>
			    </div>	
			    <div class="px-3 border-b py-3 items-center bg-gray-100">
		        	<a class="flex justify-between" @click="openModal(tu.uuid, tu.pesan)">
						<div>
							<p class="font-light text-green-600 pr-4">Catatan: </p>
						</div>
						<div v-if="tu.pesan !== ''">
							<p class="font-light text-green-600"> {{tu.pesan}}</p>
						</div>
						<div v-else>
							<p class="font-light text-gray-500"> tidak ada catatan ...</p>
						</div>
					</a>
		        </div>
		        <div class="px-3 border-b py-2" v-if="ongkir">
		        	<div class="flex justify-between">
						<div>
							<p class="text-gray-700 text-sm">{{prakiraOngkir(alamatId, tu.produk.tokos.alamats).title}}</p>
						</div>
						<div class="font-semibold text-purple-700">
							Rp{{formatPrice(tu.laba)}}
						</div>
					</div>
					<div class="flex justify-between">
						<div>
							<p class="text-gray-700 text-sm">Biaya Transaksi</p>
						</div>
						<div class="font-semibold text-purple-700">
							Rp0 / Gratis
						</div>
					</div>
		        </div>

			       
			    <div class="shadow bg-white px-3 py-2" v-if="ongkir">
			    	<div class="flex justify-between pt-1 pb-2">
			    		<div class="text-gray-700">Sub Total ({{tu.qty}} produk)</div>
			    		<!-- , prakiraOngkir(alamatId, tu.produk.tokos.alamats).ongkir -->
						<div class="font-semibold text-lg text-purple-600">Rp{{subTotal( tu.qty, tu.harga, tu.diskon )}}</div>
			    	</div>
			    </div>      	
	        </div>

	        <div class="w-full" v-if="transaksiUser != ''">
				<section class="block fixed inset-x-0 bottom-0 z-10 bg-white border-t-2 shadow">
					<div class="flex justify-between">
						<div class="text-left pl-4 pr-28 py-2">
							<span class="text-gray-600">
		                        <p class="mb-0">Total pembayaran</p>
		                    </span>
							<p class="font-semibold text-xl text-purple-700">Rp{{total()}}</p>
						</div>
						<div class="py-3 px-6">
							<button class="rounded-xl py-3 px-5 text-white hoper:bg-purple-800 bg-purple-700 inline-block text-center" @click="buatPesanan">Buat Pesanan</button>
						</div>
					</div>
				</section>
			</div>
        </div>

        <modal name="modal-pesan" :height="'auto'" :scrollable="true" :width="'95%'" :adaptive="true">
        	<div class="pb-4 px-3 py-4">
        		<h1 class="text-gray-700 font-semibold text-lg mb-4">Edit catatan pesananmu</h1>
		    	<textarea type="text" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="ep.pesan" placeholder="Misalnya tingkat pedas dll">
		    	</textarea>
		    	<button @click="editPesan" class="mt-4 py-2 px-4 hover:bg-purple-700 text-white font-bold rounded shadow-lg hover:shadow-xl transition duration-200" type="button" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)">Submit</button>
        	</div>
        </modal>

        <!-- modal pilih alamat -->
        <modal name="modal-pilmat" :height="'auto'" :scrollable="true" :width="'95%'" :adaptive="true">
        	<div class="pb-4 px-3 py-4">
        		<label class="text-lg font-semibold text-gray-700">Pilih Alamat Pengiriman</label>
		    	<div class="flex flex-row justify-between items-center py-4 border-b-2" v-for="alamat in alamatUser">
		    		<a class="font-light text-sm" @click="pilihAlamat(alamat.id)">
		    			<p class="text-gray-700">{{alamat.desa.namadesa}} Kec. {{alamat.desa.kecamatan.namakecamatan}} Kab. {{alamat.desa.kecamatan.kabupaten.namakabupaten}}</p>
			        	<p class="text-gray-700">{{alamat.alamat_lengkap}}</p>
		    		</a>
		    		<div class="font-semibold text-gray-700">
						<i class="text-xl fas fa-chevron-right"></i>
					</div>	
		        </div>
		        <div class="pt-6 shadow-lg flex items-center">
		        	<p class="text-gray-600 pr-4">Atau</p>
		        	<button class="hover:bg-purple-700 bg-purple-500 text-white p-2 rounded shadow hover:shadow-xl transition duration-200" @click="openTambahAlamat">Tambah alamat lain</button>
		        </div>
        	</div>
        </modal>

        <!-- modal tambah alamat -->
        <modal name="modal-tammat" :height="'auto'" :scrollable="true" :width="'95%'" :adaptive="true">
        	<div class="pb-4 px-3 py-4">
        		<label class="text-lg font-semibold text-gray-700">Tambah Alamat Baru</label>
	            <form class="flex flex-col" @submit.prevent="">
	                <div class="mb-4 pt-4">
						<v-select 
							:clearable="false"
							class="bg-gray-100"
							placeholder="Pilih kabupaten"
							v-model="kab"
							label="namakabupaten"
							:options="kabupatens"
							@input="pilKab"
							>
						</v-select>
	            	</div>
	            	<div class="mb-4">
						<v-select
							:clearable="false"
							class="bg-gray-100"
							placeholder="Pilih kecamatan"
							v-model="kec"
							label="namakecamatan"
							:options="kecamatans"
							@input="pilKec"
							>
						</v-select>
	            	</div>
	            	<div class="mb-4">
						<v-select 
							:clearable="false"
							class="bg-gray-100"
							placeholder="Pilih desa"
							v-model="des"
							label="namadesa"
							:options="desas"
							>
						</v-select>
	            	</div>
	                <div class="mb-8">
	                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Alamat Lengkap</label>
	                    <textarea type="text" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="alamat_lengkap" placeholder="Isikan nama jalan atau penanda tempat barang akan diantar">
	                    </textarea>
	                </div>
	                <p>{{alamatUser.alamat_lengkap}}</p>
	                <button class="hover:bg-purple-700 bg-purple-500 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit" @click="saveAlamat">Simpan Alamat</button>
	            </form>
        	</div>
        </modal>
	</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import vSelect from 'vue-select'

export default {
  middleware: 'auth',
  components: {
    vSelect
  },
  async asyncData({store}){
  	let user =  store.getters.loggedInUser;
  	const data = {
		userId : user.id,
		status : 1
	} 
  	await Promise.all([
  		store.dispatch('transaksi/getTransaksiUser', data)
  	])
  	return
  },
  data() {
	return {
		// user : null,
		alamat_lengkap : '',
		kabupatens : [],
		kecamatans : [],
		desas : [],
		// kecam : false,
		// desaku : false,
		kab : null,
		kec : null,
		des : null,
		alamatUser : [],
		alamatId : [],
		ongkir : false,
		pengirimans : [],
		ep : {
			pesan : '',
			uuid : ''
		},
		pilpengiriman : true,
	}
  },
  computed: {
  	...mapGetters(['loggedInUser']),
  	...mapState('transaksi', {
  		transaksiUser: state => state.transaksiUser
  	}),
  },
  methods: {
  	...mapActions('alamat', [
  		'getKabupatenData',
  		'getDesaKec',
  		'getKecKab',
  		'tambahAlamatData',
  		'getAlamatUserId',
  		'getAlamatId',
  	]),
  	...mapActions('transaksi', ['checkoutData', 'tambahAlamatPengiriman', 'updateongkir']),
  	//funsi pesan
  	openModal(uuid, pesan){
  		this.ep.pesan = pesan;
  		this.ep.uuid = uuid;
    	this.$modal.show('modal-pesan')
    },
    editPesan(){
  		let data = {
  			status : 1,
	    	userId : this.loggedInUser.id,
  			uuid : this.ep.uuid,
  			pesan : this.ep.pesan
  		}
  		this.tambahAlamatPengiriman(data).then(() => {
  			this.transaksiUser = this.$store.state.transaksi.transaksiUser
  			this.$modal.hide('modal-pesan');
  		})
  	},
  	//fungsi untuk alamat
  	openTambahAlamat(){
  		this.getKabupatenData().then(()=>{
  			this.kabupatens = this.$store.state.alamat.kabupatens;
  			this.$modal.show('modal-tammat')
  		})
  	},
  	openPilihalamat(){
  		this.getAlamatUserId(this.loggedInUser.id).then(()=>{
  			this.alamatUser = this.$store.state.alamat.alamatUserId;
  			this.$modal.show('modal-pilmat')
  		})
  	},
  	pilihAlamat(idAlamat){
  		this.getAlamatId(idAlamat).then(() => {
  			this.alamatId = this.$store.state.alamat.alamatId
  			this.ongkir = true
  			for (let tu of this.transaksiUser){

  				if(tu.produk.tokos.alamats.desa.kecamatanId != this.alamatId.desa.kecamatanId){
  					alert('pengiriman lintas kecamatan belum tersedia')
  					break;
  				}else if(tu.produk.tokos.alamats.desa.id == this.alamatId.desa.id){
  					let dt = {
  						uuid : tu.uuid,
  						laba : 2000,
  						userId : this.loggedInUser.id,
		  				status : 1,
  					}
  					this.updateongkir(dt).then(() => {
						this.transaksiUser = this.$store.state.transaksi.transaksiUser
					})
  				}else if(tu.produk.tokos.alamats.desa.id != this.alamatId.desa.id){
  					let dl = {
  						uuid : tu.uuid,
  						laba : 4000,
  						userId : this.loggedInUser.id,
		  				status : 1,
  					}
  					this.updateongkir(dl).then(() => {
						this.transaksiUser = this.$store.state.transaksi.transaksiUser
					})
  				}
  			}
  			this.total()
  			this.$modal.hide('modal-pilmat')

  		})
  	},
  	prakiraOngkir(alamatKirim, alamatToko){
  		let vrOnkir;
  		if(alamatKirim.desa.id == alamatToko.desa.id){
  			vrOnkir = {
  				title : 'Pengiriman (dalam satu desa)'
  			}
  			return vrOnkir
  		}else if(alamatKirim.desa.kecamatanId == alamatToko.desa.kecamatanId){
  			vrOnkir = {
  				title : 'Pengiriman (berbeda desa)'
  			}
  			return vrOnkir
  		}else{
  			alert('pengiriman lintas kecamatan belum tersedia')
  		}
  	},
  	buatPesanan(){
  		let pngr = false;
  		for (let tu of this.transaksiUser){
  			if(tu.kirim_langsung == null){
  				pngr = true
  				break;
  			}
  		}		
  		if(pngr == false){
  			if(this.alamatId == ''){
	  			alert('pilih atau tambah alamat pengiriman')
	  		}else{
	  			let data = {
		  			userId : this.loggedInUser.id,
		  			status : 1, 
		  			alamatId : this.alamatId.id
		  		};
		  		this.checkoutData(data).then(() => {
		  			alert('produk berhasil dipesan')
		  			this.$router.push('akun/pesanan')
		  		})
	  		}
  		}else{
  			alert('Pilih pengiriman dahulu')
  		}
  	},
  	formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    getHarga(harga, diskon){
    	return this.formatPrice(harga-diskon)
    },
    getCoret(harga){
    	return this.formatPrice(harga)
    },
    subTotal(qty, harga, diskon){
    	return this.formatPrice((qty*(harga-diskon)))
    },
    totalOngkir(ongkir){
    	let totalOngkir = 0;
    },
    total() {
      let total = 0;
      this.transaksiUser.forEach((tu) => {
      	total += ((tu.harga-tu.diskon)*tu.qty) + tu.laba
      })
      return this.formatPrice(total)
    },
  	pilKab(){
  		this.getKecKab(this.kab.id).then(() => {
  			const kecam = this.$store.state.alamat.kecamatanKab
  			// this.kecam = true;
  			this.kec = null;
  			this.des = null
  			this.kecamatans = kecam
  		})
  	},
  	pilKec(){
  		this.getDesaKec(this.kec.id).then(() => {
  			const desaku = this.$store.state.alamat.desaKec
  			// this.desaku = true
  			this.des = null
  			this.desas = desaku
  		})
  	},
  	saveAlamat(){
  		if(this.alamat_lengkap === ''){
  			alert('Alamat Lengkap tidak boleh kosong');
  		}else if(this.des == undefined){
  			alert('Kabupaten, kecamatan, desa tidak boleh kosong');
  		}else{
  			let data = {
	  			userId : this.loggedInUser.id,
	  			desaId : this.des.id,
	  			alamat_lengkap : this.alamat_lengkap
	  		};
	  		this.tambahAlamatData(data).then(() => {
	  			alert('Berhasil menambah alamat')
	  			this.getAlamatUserId(this.loggedInUser.id).then (() => {
	  				this.alamatUser = this.$store.state.alamat.alamatUserId
	  				this.$modal.hide('modal-tammat')
	  			})
	  		});
  		}		
  	},
  }
}
</script>