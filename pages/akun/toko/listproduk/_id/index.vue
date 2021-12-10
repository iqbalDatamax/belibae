<template>
<div>
  <header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
      <div class="flex p-3 flex-row items-center">
          <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.push('/akun/toko')">
              <i class="fas fa-arrow-left"></i>
          </div>
          <div class="inline-flex w-full">
              <div class="w-full inline-block relative">
                <p class="text-xl text-purple-700">List Produk Toko</p>
              </div>
          </div>
      </div>
  </header>
  <div class="pt-16 m-1">
  	<form-listproduks></form-listproduks>
  </div>
</div>
</template>

<script>
import Produks from '~/components/listproduk.vue';

export default {
	middleware: 'auth',
	components: {
	    'form-listproduks' : Produks,
	},
	async asyncData({store, params}){
	    let dt = {
	      id : params.id,
	      query : `?page=0&size=10`
	    }
	    await Promise.all([
	      store.dispatch('produk/getProdukTokoId', dt)
	    ])
	    return
	},
}
</script>