<template>
<div>
  <header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
      <div class="flex p-3 flex-row items-center">
          <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.go(-1)">
              <i class="fas fa-arrow-left"></i>
          </div>
          <div class="inline-flex w-full">
              <div class="w-full inline-block relative">
                <p class="text-lg text-purple-700">List Produk Diterima</p>
              </div>
          </div>
      </div>
  </header>
  <div class="pt-16 mx-3">
    <label class="text-sm text-gray-700">Dari Tanggal</label>
  	<input type="date" name="" class="leading-snug border border-gray-300 block w-full appearance-none bg-white text-sm text-gray-600 px-2  py-1 mb-1 rounded" v-model="startDate" @change="getDataTanggal" />
    <label class="text-sm text-gray-700">Sampai Tanggal</label>
    <input type="date" name="" class="leading-snug border border-gray-300 block w-full appearance-none bg-white text-sm text-gray-600 px-2  py-1 rounded mr-3" v-model="endDate" @change="getDataTanggal" />
  </div>
  <hr class="mt-3">
  <div class="m-2" v-if="transaksis.totalItems == 0">
    <div class="mt-6 bg-purple-100 border-b-4 border-purple-700 p-4 rounded-lg">
      <p class="font-bold text-purple-700 text-lg"><i class="fas fa-exclamation-circle"></i> Opppsss....</p>
      <p class="text-purple-500 text-3xl">Belum ada transaksi...</p>
    </div>
  </div>
  <div v-else>
      <div class="pb-4">
          <div v-for="ut in transaksis.orders">
            <div class="h-44 flex mt-3 px-3 py-2 bg-white shadow-lg">
              <img v-if="ut.produk.fotos[0]" class="block h-20 w-20" v-bind:src="`${$axios.defaults.baseURL}/`+ut.produk.fotos[0].urlfoto">
              <img v-else alt="detail foto" class="block h-20 w-20" src="">
              <div class="y-2 pl-3">
                <nuxt-link :to="{name: 'akun-pesanan-id', params: {id:ut.uuid}}">
                  <p class="font-medium text-sm text-gray-600">{{ut.produk.namaproduk}}</p>
                  <p class="text-gray-600 text-xs">Catatan : {{ut.pesan}}</p>
                  <p class="font-medium text-sm text-gray-600"><span class="text-purple-600 text-sm"> Rp{{getHarga(ut.harga, ut.diskon)}} x {{ut.qty}} = Rp{{subTotal(ut.qty, ut.harga, ut.diskon)}}</span></p>
                  <!-- <p class="font-medium text-gray-600 text-sm">Total: Rp{{subTotal(ut.qty, ut.harga, ut.diskon)}}</p> -->

                <div>
                  <p  v-if="ut.kirim_langsung == 0"class="font-light text-sm text-gray-600">Pengiriman 1 sd 2 Hari Kerja</p>
                  <p v-else class="font-light text-sm text-gray-600">Pengiriman Langsung / Hari ini juga</p>
                </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="w-full pt-24">
      <section class="block fixed inset-x-0 bottom-0 z-10 bg-white border-t-2 shadow py-2">
        <div class="flex justify-between">
          <div class="text-left pl-4 py-2">
            <span class="text-gray-600 text-lg">
              <p class="mb-0">Total</p>
            </span>
          </div>
          <p class="font-semibold text-xl text-purple-700 pr-4">Rp{{total()}}</p>
        </div>
      </section>
    </div>
</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  components: {
    
  },
  data() {
    return {
      startDate : '',
      endDate : '',
      transaksis : []
    }
  },
  async asyncData({store, params}){
    var adddays=parseInt(-15) // number of days to add or subtract
    var newdate = new Date();
    newdate.setDate(newdate.getDate() + adddays)

    var month = '' + (newdate.getMonth() + 1),
          day = '' + newdate.getDate(),
          year = newdate.getFullYear();
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
    var dts = [year, month, day].join('-');
  // ========================================================
    var subdays=parseInt(1) // number of days to add or subtract
    var nd = new Date();
    nd.setDate(nd.getDate() + subdays)

    var me = '' + (nd.getMonth() + 1),
          de = '' + nd.getDate(),
          ye = nd.getFullYear();
      if (me.length < 2) 
          me = '0' + me;
      if (de.length < 2) 
          de = '0' + me;
    var dte = [ye, me, de].join('-');
//================================================================

    var data = `?startDate=${dts}&endDate=${dte}&page=0&size=50&status=4&toko=${params.id}`;
    await Promise.all([
      store.dispatch('transaksi/getTransaksiData', data)
    ])
    return
  },
  computed: {
    ...mapState('transaksi', {
      trans: state => state.transaksiToko
    }),
  },
  created() {
    var dts = new Date()
    var dte = new Date()
    this.startDate = this.formatDate(dts.setDate(dts.getDate() - 15));
    this.endDate = this.formatDate(dte.setDate(dte.getDate() + 1)); 
    this.transaksis = this.trans
  },
  methods: {
    formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    getHarga(harga, diskon){
      return this.formatPrice(harga-diskon)
    },
    subTotal(qty, harga, diskon){
      return this.formatPrice(qty*(harga-diskon))
    },
    total() {
      let orders = this.transaksis.orders
      let total = 0;
      orders.forEach((tu) => {
        total += (tu.harga-tu.diskon)*tu.qty
      })
      return this.formatPrice(total)
    },
    formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
      return [year, month, day].join('-');
	},
	...mapActions('transaksi', ['getTransaksiData', 'updateStatus']),
	getDataTanggal() {
	    let data = `?startDate=${this.startDate}&endDate=${this.endDate}&page=0&size=50&status=4&toko=${this.$route.params.id}`
	    this.getTransaksiData(data).then(() => {
	      this.transaksis = this.$store.state.transaksi.transaksiToko
	    });
	  },   
	}, 

}
</script>