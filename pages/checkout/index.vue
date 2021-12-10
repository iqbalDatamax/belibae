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
				<div class="h-32 px-3 flex mt-3 border-b">
			      	<img v-if="tu.produk.fotos[0]" class="block h-24 w-24 pt-2" v-bind:src="`${$axios.defaults.baseURL}/`+tu.produk.fotos[0].urlfoto">
			      	<img v-else alt="detail foto" class="block h-24 w-24" src="">
			        <div class="py-2 pl-3">
			        	<p class="font-light text-gray-800 ">{{tu.produk.namaproduk}}</p>
				         	<p class="text-gray-600"><del v-if="(tu.diskon/(tu.harga+tu.harga*10/100))*100 >= 0.5">Rp{{getCoret(tu.harga, tu.diskon)}}</del><span class="text-purple-600"> Rp{{getHarga(tu.harga, tu.diskon)}}</span></p>
			         	<p>x {{tu.qty}}</p>
			        </div>
			    </div>	
			    <div class="px-3 border-b py-3 items-center">
			    	<label class="text-gray-700">Catatan</label>
		        	<a class="flex justify-between">
						<div class="">
							<p class="font-light text-gray-700">{{tu.pesan}}</p>
						</div>
						<button @click="openModal(tu.uuid, tu.pesan)" class="font-semibold text-purple-700">
							Edit
						</button>
					</a>
						
		        </div>
			    <div class="px-3 border-b">
			    	<div>
			    		<a v-if="tu.kirim_langsung == null" class="flex justify-between py-4" @click="openPilman(tu.uuid, tu.produk.tokos.alamats)">
							<div class="text-lg text-gray-700">Pilih Pengiriman</div>
							<div class="font-semibold text-gray-700">
								<i class="text-xl fas fa-chevron-right"></i>
							</div>
						</a>
						<div v-else class="py-3">
							<label class="text-gray-700 text-sm">Waktu pengiriman</label>
							<div v-if="tu.kirim_langsung == 0">
								<p class="font-light text-sm text-gray-600">Pengiriman 1 sd 2 Hari Kerja</p>
								<div v-if="tu.produk.bisakembali === 0">
									<label class="text-green-600 text-sm mt-2 pt-6 font-light">Produk tidak bisa dikembalikan</label>
									<p v-if="alamatId != ''" class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp{{ongkir(tu.kirim_langsung, alamatId.desa.kecamatanId, tu.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
								</div>
								<div v-else>
									<label class="text-green-600 text-sm mt-2 pt-6 font-light">Produk bisa dikembalikan</label>
									<p v-if="alamatId != ''" class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp {{ongkir(tu.kirim_langsung, alamatId.desa.kecamatanId, tu.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
									<p class="text-purple-600 text-sm font-light" v-if="alamatId != ''">Jika dikembalikan dikenakan Ongkir : Rp {{ongkir(tu.kirim_langsung, alamatId.desa.kecamatanId, tu.produk.tokos.alamats.desa.kecamatanId).ongkirKembali}}</p>
								</div>
							</div>
							<div v-else>
								<p class="font-light text-sm text-gray-600">Pengiriman Langsung / Hari ini juga</p>
								<div v-if="tu.produk.bisakembali === 0">
									<label class="text-green-600 text-sm mt-2 font-light">Produk tidak bisa dikembalikan</label>
									<p v-if="alamatId != ''" class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp{{ongkir(tu.kirim_langsung, alamatId.desa.kecamatanId, tu.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
								</div>
								<div v-else>
									<label class="text-green-600 text-sm mt-2 pt-6 font-light">Produk bisa dikembalikan</label>
									<p v-if="alamatId != ''" class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp {{ongkir(tu.kirim_langsung, alamatId.desa.kecamatanId, tu.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
									<p class="text-purple-600 text-sm font-light" v-if="alamatId != ''">Jika dikembalikan, tetap dikenakan Ongkir : Rp {{ongkir(tu.kirim_langsung, alamatId.desa.kecamatanId, tu.produk.tokos.alamats.desa.kecamatanId).ongkirKembali}}</p>
								</div>
							</div>
							<div class="flex justify-between pt-4">
				        		<div><p></p></div>
				        		<button class="text-purple-600 text-sm" @click="openPilman(tu.uuid, tu.produk.tokos.alamats)">Pengiriman lain</button>
				        	</div>

						</div>
			    	</div>
		        </div>
			       
			    <div class="shadow bg-white px-3 py-2">
			    	<div class="flex justify-between pt-1 pb-2">
			    		<div class="text-gray-700">Sub Total ({{tu.qty}} produk)</div>
						<div class="font-semibold text-lg text-purple-600">Rp{{subTotal(tu.qty, tu.harga, tu.diskon)}}</div>
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
		    	<textarea type="text" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="ep.pesan" placeholder="Misalnya Warna merah, Ukuran M dll">
		    	</textarea>
		    	<button @click="editPesan" class="mt-4 py-2 px-4 hover:bg-purple-700 text-white font-bold rounded shadow-lg hover:shadow-xl transition duration-200" type="button" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)">Submit</button>
        	</div>
	        	
        </modal>

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
		        <div class="pt-6 flex items-center">
		        	<p class="text-gray-600 pr-4">Atau</p>
		        	<button class="hover:bg-purple-700 bg-purple-500 text-white p-2 rounded shadow hover:shadow-xl transition duration-200" @click="openTambahAlamat">Tambah alamat lain</button>
		        </div>
	        	</div>
        </modal>

	    <!-- modal pilih pengiriman -->
	    <modal name="modal-pilman" :height="'auto'" :scrollable="true" :width="'95%'" :adaptive="true">
        	<div class="pb-4 px-3 py-4">
        		<label class="text-lg font-semibold text-gray-700">Pilih Waktu Pengiriman</label>
		    	<div class="flex flex-row justify-between items-center py-4 border-b-2" v-for="pengiriman in pengirimans" @click="pilihPengiriman(pengiriman.uuid, pengiriman.id)">
		    		<a class="font-light">
		    			<p class="text-gray-700">{{pengiriman.deskripsi}}</p>
			        	<p class="text-purple-700">Biaya Pengiriman : <span>Rp {{pengiriman.ongkir}}</span> <span v-if="pengiriman.ongkir == 0"> / <b>Gratis</b></span></p>
		    		</a>
		    		<div class="font-semibold text-gray-700">
						<i class="text-xl fas fa-chevron-right"></i>
					</div>	
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
		kirim_langsung : '',
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
  		'getAlamatId'
  	]),
  	//funsi pesan
  	openModal(uuid, pesan){
  		this.ep.pesan = pesan;
  		this.ep.uuid = uuid;
    	this.$modal.show('modal-pesan');
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
  	// fungsi untuk pengiriman
  	openPilman(uuid, almt){
  		if(this.alamatId == ''){
  			alert('Pilih alamat pengiriman terlebih dahulu')
  		}else{
  			this.$modal.show('modal-pilman')
  			if(this.alamatId.desa.kecamatan.id == almt.desa.kecamatan.id){
  				this.pengirimans = [
					{	
						uuid : uuid,
						id : 1,
						deskripsi : 'Pengiriman Langsung / Hari ini juga',
						ongkir : 5000
					},
					{
						uuid : uuid,
						id : 0,
						deskripsi : 'Pengiriman 1 sd 2 Hari Kerja',
						ongkir : 0
					}
				]
  			}else{
  				this.pengirimans = [
					{	
						uuid : uuid,
						id : 1,
						deskripsi : 'Pengiriman Langsung / Hari ini juga',
						ongkir : 9000
					},
					{
						uuid : uuid,
						id : 0,
						deskripsi : 'Pengiriman 1 sd 2 Hari Kerja',
						ongkir : 0
					}
				]
  			}
  		}
  	},
  	pilihPengiriman(uuid, id_pesan){
  		let date = new Date()
  		let time = date.toTimeString()
  		let data = {
  			status : 1,
	    	userId : this.loggedInUser.id,
  			uuid : uuid,
  			kirim_langsung : id_pesan
  		}
  		if(id_pesan == 1){
  			if(time > "13"){
	  			alert("pengiriman ini dapat digunakan jika pemesanan dilakukan sebelum jam 2 siang")
	  		}else{
	  			this.tambahAlamatPengiriman(data).then(() => {
		  			this.transaksiUser = this.$store.state.transaksi.transaksiUser
		  			this.$modal.hide('modal-pilman')
		  		})
	  		}
  		}else{
  			this.tambahAlamatPengiriman(data).then(() => {
	  			this.transaksiUser = this.$store.state.transaksi.transaksiUser
	  			this.$modal.hide('modal-pilman')
	  		})
  		}
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
  			this.$modal.hide('modal-pilmat')
  		})
  	},

  	...mapActions('transaksi', ['checkoutData', 'tambahAlamatPengiriman']),
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

  	ongkir(kirlang, kecpengiriman, kectoko){
  		if(kirlang == 0){
  			if(kecpengiriman == kectoko){
	  			let data = { 
	  				ongkir : this.formatPrice(0),
	  				ongkirKembali : this.formatPrice(5000)
	  			}
	  			return data
	  		}else{
	  			let data = { 
	  				ongkir : this.formatPrice(0),
	  				ongkirKembali : this.formatPrice(9000)
	  			}
	  			return data
	  		}
  		}else{
  			if(kecpengiriman == kectoko){
	  			let data = { 
	  				ongkir : this.formatPrice(5000),
	  				ongkirKembali : this.formatPrice(5000)
	  			}
	  			return data
	  		}else{
	  			let data = { 
	  				ongkir : this.formatPrice(9000),
	  				ongkirKembali : this.formatPrice(9000)
	  			}
	  			return data
	  		}
  		}
  	},
  	formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    getHarga(harga, diskon){
      if(harga <= 200000){
        return this.formatPrice((harga + harga*10/100)-diskon)
      }else if(harga > 200000 & harga <= 1000000){
        return this.formatPrice((harga + harga*5/100)-diskon)
      }else if(harga > 1000000){
        return this.formatPrice((harga + harga*3/100)-diskon)
      }
    },
    getCoret(harga, diskon){
      if(harga <= 200000){
        return this.formatPrice(harga + harga*10/100)
      }else if(harga > 200000 & harga <= 1000000){
        return this.formatPrice(harga + harga*5/100)
      }else if(harga > 1000000){
        return this.formatPrice(harga + harga*3/100)
      }
    },
    subTotal(qty, harga, diskon){
      if(harga <= 200000){
        return this.formatPrice(qty*((harga + harga*10/100)-diskon))
      }else if(harga > 200000 & harga <= 1000000){
        return this.formatPrice(qty*((harga + harga*5/100)-diskon))
      }else if(harga > 1000000){
        return this.formatPrice(qty*((harga + harga*3/100)-diskon))
      }
    },
    total() {
      let total = 0;
      this.transaksiUser.forEach((tu) => {
        if(tu.harga <= 200000){
          total += ((tu.harga+(tu.harga*10/100))-tu.diskon)*tu.qty
        }else if(tu.harga > 200000 & tu.harga < 1000000){
          total += ((tu.harga+(tu.harga*5/100))-tu.diskon)*tu.qty
        }else{
          total += ((tu.harga+(tu.harga*3/100))-tu.diskon)*tu.qty
        }
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