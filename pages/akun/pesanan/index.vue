<template>
	<div>
		  <header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
	        <div class="flex p-3 flex-row items-center">
	            <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.push('/akun')">
	                <i class="fas fa-arrow-left"></i>
	            </div>
	            <div class="inline-flex w-full">
	                <div class="w-full inline-block relative">
				      <p class="text-xl text-purple-700">Daftar Pesanan</p>
		    		</div>
	            </div>
	        </div>
	    </header>
	    <section class="block  inset-x-0 bg-white shadow-lg pt-20">
			<div class="flex justify-between pb-2">
				<button
				 @click="dikemas" class="w-full hover:text-purple-500 justify-center inline-block text-center py-2">
					<div class="text-center">
              <span class="block text-xl text-gray-700 leading-8" v-bind:class="{'text-purple-700':kemas}">
                  <i class="fas fa-box-open"></i>
              </span>
              <span class="block text-xs leading-none" v-bind:class="{'text-purple-700':kemas}">Dikemas</span>
          </div>
				</button>
				<button
				@click="dikirim" class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
					<div class="text-center">
              <span class="absolute ml-2 rounded-full bg-red-500 px-1 text-white text-xs">{{countKirimUser}}</span>
              <span class="block text-xl text-gray-700 leading-8" v-bind:class="{'text-purple-700':kirim}">
                  <i class="fas fa-motorcycle"></i>
              </span>
              <span class="block text-xs leading-none" v-bind:class="{'text-purple-700':kirim}">Dikirim</span>
          </div>
				</button>
				<button
				@click="diterima"
				class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
					<div class="text-center">
              <span class="block text-xl text-gray-700 leading-8"  v-bind:class="{'text-purple-700':terima}">
                  <i class="fas fa-people-carry"></i>
              </span>
              <span class="block text-xs leading-none"  v-bind:class="{'text-purple-700':terima}">Diterima</span>
          </div>
				</button>
				<button
				@click="dikembalikan"
				class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
					<div class="text-center">
              <span class="block text-xl text-gray-700 leading-8"  v-bind:class="{'text-purple-700':kembali}">
                  <i class="fas fa-reply-all"></i>
              </span>
              <span class="block text-xs leading-none"  v-bind:class="{'text-purple-700':kembali}">Kembali</span>
          </div>
				</button>
			</div>
		</section>
    
		<div class="m-2" v-if="usertrans == ''">
			<div class="mt-6 bg-purple-100 border-b-4 border-purple-700 p-4 rounded-lg">
			  <p class="font-bold text-purple-700 text-lg"><i class="fas fa-exclamation-circle"></i> Opppsss....</p>
			  <p class="text-purple-500 text-3xl">Belum ada pesanan....</p>
			</div>
		</div>
		<div v-else>
			<div class="pb-4">
	    	  <div v-for="ut in usertrans">
			      <div class="h-44 flex mt-3 px-3 py-2 bg-white shadow-lg">
              <img v-if="ut.produk.fotos[0]" class="block h-20 w-20" v-bind:src="`${$axios.defaults.baseURL}/`+ut.produk.fotos[0].urlfoto">
              <img v-else alt="detail foto" class="block h-20 w-20" src="">
			        <div class="y-2 pl-3">
			        	<nuxt-link :to="{name: 'akun-pesanan-id', params: {id:ut.uuid}}" v-if="ut.foodbae == 0">
			        		<p class="font-medium text-sm text-gray-600">{{ut.produk.namaproduk}}</p>
                  <p class="text-gray-600 text-xs">Catatan : {{ut.pesan}}</p>
			        		<p class="font-medium text-sm text-gray-600"><del v-if="(ut.diskon/(ut.harga+ut.harga*10/100))*100 >= 0.5">Rp{{getCoret(ut.harga)}}</del><span class="text-purple-600 text-sm"> Rp{{getHarga(ut.harga, ut.diskon)}} x {{ut.qty}} = Rp{{subTotal(ut.qty, ut.harga, ut.diskon)}}</span></p>
			        		<!-- <p class="font-medium text-gray-600 text-sm">Total: Rp{{subTotal(ut.qty, ut.harga, ut.diskon)}}</p> -->

<div v-if="ut.kirim_langsung == 0">
  <p class="font-light text-sm text-gray-600">Pengiriman 1 sd 2 Hari Kerja</p>
  <div v-if="ut.produk.bisakembali === 0">
    <label class="text-green-600 text-sm mt-2 pt-6 font-light">Produk tidak bisa dikembalikan</label>
    <p class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp{{ongkir(ut.kirim_langsung, ut.alamats.desa.kecamatanId, ut.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
  </div>
  <div v-else>
    <label class="text-green-600 text-sm mt-2 pt-6 font-light">Produk bisa dikembalikan</label>
    <p class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp {{ongkir(ut.kirim_langsung, ut.alamats.desa.kecamatanId, ut.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
    <p class="text-red-600 text-xs font-light">Jika dikembalikan dikenakan Ongkir : Rp {{ongkir(ut.kirim_langsung, ut.alamats.desa.kecamatanId, ut.produk.tokos.alamats.desa.kecamatanId).ongkirKembali}}</p>
  </div>
</div>
<div v-else>
  <p class="font-light text-sm text-gray-600">Pengiriman Langsung / Hari ini juga</p>
  <div v-if="ut.produk.bisakembali === 0">
    <label class="text-green-600 text-sm mt-2 font-light">Produk tidak bisa dikembalikan</label>
    <p class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp{{ongkir(ut.kirim_langsung, ut.alamats.desa.kecamatanId, ut.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
  </div>
  <div v-else>
    <label class="text-green-600 text-sm mt-2 pt-6 font-light">Produk bisa dikembalikan</label>
    <p class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp {{ongkir(ut.kirim_langsung, ut.alamats.desa.kecamatanId, ut.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
    <p class="text-red-600 text-xs font-light">Jika dikembalikan, tetap dikenakan Ongkir : Rp {{ongkir(ut.kirim_langsung, ut.alamats.desa.kecamatanId, ut.produk.tokos.alamats.desa.kecamatanId).ongkirKembali}}</p>
  </div>
</div>
			        	</nuxt-link>
                <nuxt-link v-else :to="{name: 'akun-pesanan-id', params: {id:ut.uuid}}">
                  <p class="font-medium text-sm text-gray-600">{{ut.produk.namaproduk}}</p>
                  <p class="text-gray-600 text-xs">Catatan : {{ut.pesan}}</p>
                  <p class="font-medium text-sm text-gray-600"><del v-if="(ut.diskon/(ut.harga+ut.harga*10/100))*100 >= 0.5">Rp{{getCoretFb(ut.harga)}}</del><span class="text-purple-600 text-sm"> Rp{{getHargaFb(ut.harga, ut.diskon)}} x {{ut.qty}} = Rp{{subTotalFb(ut.qty, ut.harga, ut.diskon)}}</span></p>
                  <p class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp{{ut.laba}}</span></p>
                </nuxt-link>

                <div v-if="kemas" class="flex pt-3">
                  <p class="text-xs text-gray-800">Pesanan bisa dibatalkan jika belum dikonfirmasi penjual</p>
                  <button @click="pembatalan(ut.uuid)" class="ml-2 text-xs text-white hover:bg-purple-500 hover:text-white border bg-red-500 rounded py-1 px-2 outline-none focus:shadow-outline">Batalkan</button>
                </div>

                <!-- <div class="flex rounded pt-1" role="group" v-if="kirim">
                  <button v-if="ut.produk.bisakembali" @click="kembalikan(ut.uuid, ut.produk.tokos.alamats.desa.kecamatanId)" class="bg-red-500 text-white hover:bg-red-600 hover:text-white border border-red-600 rounded px-2 py-1 mr-1 outline-none focus:shadow-outline">Kembalikan</button>
                  <button @click="terimapesanan(ut.uuid, ut.harga)" class="bg-white text-purple-500 hover:bg-purple-500 hover:text-white border border-purple-500 rounded px-3 py-1 mx-0 outline-none focus:shadow-outline">Diterima</button>
                </div> -->
			        </div>
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
  async asyncData({store}){
  	let user =  store.getters.loggedInUser
  	const data = {
  		userId : user.id,
  		status : 2
  	}
  	await Promise.all([
      store.dispatch('transaksi/getJumlahKirimUser', data),
  		store.dispatch('transaksi/getTransaksiUser', data)
  	])
  	return
  },
  data() {
    return {
      kemas : true,
      kirim : false,
      terima : false,
      kembali : false,
      usertrans : ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapGetters('transaksi',{
      countKirimUser: 'countKirimUser'
    }),
    ...mapState('transaksi', {
      usertran : state => state.transaksiUser
    })
  },
  created() {
    this.usertrans = this.usertran
  },
  methods: {
  	...mapActions('transaksi', ['getTransaksiUser', 'updateStatus']),
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
    getCoret(harga){
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
    getCoretFb(harga){
      return this.formatPrice(harga)
    },
    subTotalFb(qty, harga, diskon){
      return this.formatPrice((qty*(harga-diskon)))
    },
    getHargaFb(harga, diskon){
      return this.formatPrice(harga-diskon)
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

    dikemas(){
    	this.kemas = true;
    	this.kembali = false;
    	this.kirim = false;
    	this.terima = false;
    	let data = {
  			userId : this.loggedInUser.id,
  			status : 2
  		};
  		this.getTransaksiUser(data).then(() => {
  			let tran = this.$store.state.transaksi.transaksiUser
  			this.usertrans = tran;
  		})
    },
    dikirim(){
    	this.kemas = false;
    	this.terima = false;
    	this.kirim = true;
    	this.kembali = false;
    	let data = {
  			userId : this.loggedInUser.id,
  			status : 3
  		};
  		this.getTransaksiUser(data).then(() => {
  			let tran = this.$store.state.transaksi.transaksiUser
  			this.usertrans = tran;
  		})
    },
    diterima(){
    	this.kemas = false;
    	this.terima = true;
    	this.kirim = false;
    	this.kembali = false;
    	let data = {
  			userId : this.loggedInUser.id,
  			status : 4
  		};
  		this.getTransaksiUser(data).then(() => {
  			let tran = this.$store.state.transaksi.transaksiUser
  			this.usertrans = tran;
  		})
    },
    dikembalikan(){
    	this.kemas = false;
    	this.terima = false;
    	this.kirim = false;
    	this.kembali = true;
    	let data = {
  			userId : this.loggedInUser.id,
  			status : 5
  		};
  		this.getTransaksiUser(data).then(() => {
  			let tran = this.$store.state.transaksi.transaksiUser
  			this.usertrans = tran;
  		})
    },

    // kembalikan(id, idkec){
    //   if (this.loggedInUser.alamat.desa.kecamatanId == idkec){
    //     let data = {
    //       uuid : id,
    //       status : 5,
    //       laba : 5000
    //     };
    //     this.updateStatus(data).then(() => {
    //       alert('barang dikembalikan, kamu cuma dikenakan ongkos kirim saja sebesar "Rp5.000" sebagai jasa pengantaran kurir kami')
    //       this.dikirim()
    //     })
    //   }else{
    //     let data = {
    //       uuid : id,
    //       status : 5,
    //       laba : 9000
    //     };
    //     this.updateStatus(data).then(() => {
    //       alert('barang dikembalikan, kamu cuma dikenakan ongkos kirim saja sebesar "Rp9.000" sebagai jasa pengantaran kurir kami')
    //       this.dikirim()
    //     })
    //   }
    // },
    // async terimapesanan(id, harga){
    //   var laba=0;
    //   if(harga <= 200000){
    //     laba = harga*10/100;
    //   }else if(harga > 200000 & harga < 1000000){
    //     laba = harga*5/100;
    //   }else{
    //     laba = harga*3/100;
    //   }

    //   let data = {
    //     uuid : id,
    //     status : 4,
    //     laba : laba
    //   };
    //   await this.updateStatus(data).then(() => {
    //     alert('terimaksi, selamat berbelanja kembali')
    //     this.dikirim()
    //   })
    // },

    pembatalan(id){
        let data = {
          uuid : id,
          status : 8,
          userId : this.loggedInUser.id,
        };
        this.updateStatus(data).then(() => {
          alert('Pesanan produk ini dibatalkan');
          this.dikemas()
        })
      },

  }
}
</script>