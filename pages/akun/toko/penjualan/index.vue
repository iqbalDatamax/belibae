<template>
	<div>
	  <header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
        <div class="flex p-3 flex-row items-center">
            <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.go(-1)">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div class="inline-flex w-full">
                <div class="w-full inline-block relative">
			      <p class="text-xl text-purple-700">Daftar Penjualan</p>
	    		</div>
            </div>
        </div>
    </header>
	  <section class="block  inset-x-0 bg-white shadow-lg pt-16">
			<div class="flex justify-between pb-2">
				<button
				 @click="disiapkan" class="w-full hover:text-purple-500 justify-center inline-block text-center py-2">
					<div class="text-center">
              <span class="absolute ml-3 rounded-full bg-red-500 px-1 text-white text-xs">{{countKemas}}</span>
              <span class="block text-xl text-gray-700 leading-8" v-bind:class="{'text-purple-700':siapkan}">
                  <i class="fas fa-box-open"></i>
              </span>
              <span class="block text-xs leading-none" v-bind:class="{'text-purple-700':siapkan}">Tolong siapkan</span>
	        </div>
				</button>
				<button
				@click="dikirim" class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
					<div class="text-center">
              <span class="absolute ml-2 rounded-full bg-red-500 px-1 text-white text-xs">{{countKirim}}</span>
              <span class="block text-xl text-gray-700 leading-8" v-bind:class="{'text-purple-700':kirim}">
                  <i class="fas fa-motorcycle"></i>
              </span>
              <span class="block text-xs leading-none" v-bind:class="{'text-purple-700':kirim}">Dijemput</span>
          </div>
				</button>
				<button
				@click="diterima"
				class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
					<div class="text-center">
              <span class="absolute ml-2 rounded-full bg-red-500 px-1 text-white text-xs">{{countTerima}}</span>
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
              <span class="block text-xs leading-none"  v-bind:class="{'text-purple-700':kembali}">Dikembalikan</span>
          </div>
				</button>
        <button
        @click="finish"
        class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
          <div class="text-center">
              <span class="block text-xl text-gray-700 leading-8"  v-bind:class="{'text-purple-700':selesai}">
                  <i class="fas fa-th-list"></i>
              </span>
              <span class="block text-xs leading-none"  v-bind:class="{'text-purple-700':selesai}">Selesai</span>
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
		<div>
			<div class="pb-4">
	    	  <div v-for="ut in usertrans">
			      <div class="h-40 flex mt-3 px-3 py-2 bg-white shadow-lg" >
			      	<img v-if="ut.produk.fotos[0]" class="block h-24 w-24 pt-2" v-bind:src="`${$axios.defaults.baseURL}/`+ut.produk.fotos[0].urlfoto">
              <img v-else alt="detail foto" class="block h-24 w-24" src="">
			        <div class="py-2 pl-3">
			        	<nuxt-link :to="{name: 'produk-id', params: {id:ut.produk.uuid}}">
			        		<p class="font-medium text-gray-600">{{ut.produk.namaproduk}}</p>
			        		<p class="font-medium text-gray-600"><span class="text-purple-600"> Rp{{formatPrice(ut.harga-ut.diskon)}} x {{ut.qty}}</span></p>
			        		<p class="font-medium text-gray-600">Total: Rp{{formatPrice(ut.qty*(ut.harga-ut.diskon))}}</p>
			        	</nuxt-link>
                <div class="rounded-lg pt-1 text-sm" role="group" v-if="terima">
                  
                  <button @click="lunas(ut.uuid)" class="bg-purple-500 text-white hover:bg-purple-500 hover:text-white border rounded-lg px-3 py-1 mx-0 focus:shadow-outline">Lunas</button><span class="text-xs text-gray-600"> Klik button Lunas jika sudah dibayar pihak belibae</span>
                </div>
			        </div>
			      </div>
		      </div>
		  </div>
		</div>

    <div class="w-full pt-24" v-if="terima">
      <section class="block fixed inset-x-0 bottom-0 z-10 bg-white border-t-2 shadow">
        <div class="flex justify-between">
          <div class="text-left pl-4 pr-20 py-2">
            <span class="text-gray-600 text-lg">
                          <p class="mb-0">Total</p>
                      </span>
            <p class="font-semibold text-2xl text-purple-700">Rp{{total()}}</p>
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
  async asyncData({store}){
  	let user =  store.getters.loggedInUser
  	const data = {
  		tokoId : user.toko.id,
  		status : 2
  	}
  	await Promise.all([
  		store.dispatch('transaksi/getTransaksiToko', data),
      store.dispatch('transaksi/getJumlahKemas', data.tokoId),
      store.dispatch('transaksi/getJumlahKirim', data),
      store.dispatch('transaksi/getJumlahTerima', data)
  	])
  	return
  },
  data() {
    return {
      siapkan : true,
      kirim : false,
      terima : false,
      kembali : false,
      selesai : false,
      usertrans : ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapGetters('transaksi',{
      countKemas: 'countKemas',
      countKirim: 'countKirim',
      countTerima: 'countTerima'
    }),
    ...mapState('transaksi', {
      usertran : state => state.userTransaksi
    })
  },
  created() {
    this.usertrans = this.usertran
  },
  methods: {
  	...mapActions('transaksi', ['getTransaksiToko', 'updateStatus']),
  	formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    disiapkan(){
    	this.siapkan = true;
    	this.kembali = false;
    	this.kirim = false;
    	this.terima = false;
      this.selesai = false;
    	let data = {
  			tokoId : this.loggedInUser.toko.id,
  			status : 2
  		};
  		this.getTransaksiToko(data).then(() => {
  			let tran = this.$store.state.transaksi.userTransaksi
  			this.usertrans = tran;
  		})
    },
    dikirim(){
    	this.siapkan = false;
    	this.terima = false;
    	this.kirim = true;
    	this.kembali = false;
      this.selesai = false;
    	let data = {
  			tokoId : this.loggedInUser.toko.id,
  			status : 3
  		};
  		this.getTransaksiToko(data).then(() => {
  			let tran = this.$store.state.transaksi.userTransaksi
  			this.usertrans = tran;
  		})
    },
    diterima(){
    	this.siapkan = false;
    	this.terima = true;
    	this.kirim = false;
    	this.kembali = false;
      this.selesai = false;
    	let data = {
  			tokoId : this.loggedInUser.toko.id,
  			status : 4
  		};
  		this.getTransaksiToko(data).then(() => {
  			let tran = this.$store.state.transaksi.userTransaksi
  			this.usertrans = tran;
  		})
    },
    dikembalikan(){
    	this.siapkan = false;
    	this.terima = false;
    	this.kirim = false;
    	this.kembali = true;
      this.selesai = false;
    	let data = {
  			tokoId : this.loggedInUser.toko.id,
  			status : 5
  		};
  		this.getTransaksiToko(data).then(() => {
  			let tran = this.$store.state.transaksi.userTransaksi
  			this.usertrans = tran;
  		})
    },
    finish(){
      this.siapkan = false;
      this.terima = false;
      this.kirim = false;
      this.kembali = false;
      this.selesai = true;
      let data = {
        tokoId : this.loggedInUser.toko.id,
        status : 6
      };
      this.getTransaksiToko(data).then(() => {
        let tran = this.$store.state.transaksi.userTransaksi
        this.usertrans = tran;
      })
    },
    lunas(id){
      let data = {
        uuid : id,
        status : 6,
        
      };
      this.updateStatus(data).then(() => {
        alert('terimaksih atas kerjasamanya')
        this.diterima()
      })
    },


    formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    total() {
      let total = 0;
      this.usertrans.forEach((tu) => {
        total += (tu.harga-tu.diskon)*tu.qty
      })

      return this.formatPrice(total)
    },
  }
}
</script>
