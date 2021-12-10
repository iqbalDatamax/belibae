<template>
  <div class="w-full mx-auto">
    <div class="w-full md:px-0 mb-16 text-gray-800 leading-normal">
       <form-viewtransaksi></form-viewtransaksi>
    </div>
  </div>
</template>

<script>
import ViewTransaksi from '~/components/viewTransaksi.vue';

export default {
  components: {
    'form-viewtransaksi' : ViewTransaksi
  },
  async asyncData({store, params}){
  	await Promise.all([
  		store.dispatch('transaksi/getTransaksiId', params.id)
  	])
  	return
  },
}
</script>