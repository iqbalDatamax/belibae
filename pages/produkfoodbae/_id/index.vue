<template>
	<div>
		<header class="fixed w-full z-10 top-0 shadow-xl bg-white pb-2">
	        <div class="flex p-3 flex-row items-center">
	            <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.go(-1)">
	                <i class="fas fa-arrow-left"></i>
	            </div>
	            <div class="inline-flex w-full">
	                <div class="w-full inline-block relative">
				      <p class="text-xl text-purple-700">Details Produk</p>
		    		</div>
	            </div>
	        </div>
	    </header>
	    <div class="pt-16">
	    	<form-viewproduk></form-viewproduk>
	    </div>
	</div>
</template>

<script>
import ViewProdukFoodbae from '~/components/viewprodukfoodbae.vue';


export default {
  components: {
    'form-viewproduk' : ViewProdukFoodbae,
  },
  async asyncData({store, params}){
  	await Promise.all([
  		store.dispatch('produk/getProdukId', params.id)
  	])
  	return
  },
}
</script>