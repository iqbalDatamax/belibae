<template>
<div>
	<header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
      <div class="flex p-3 flex-row items-center">
          <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.go(-1)">
              <i class="fas fa-arrow-left"></i>
          </div>
          <div class="inline-flex w-full">
              <div class="w-full inline-block relative">
                <p class="text-xl text-purple-700">Tambah Produk</p>
              </div>
          </div>
      </div>
  </header>
  <div class="pt-16 mx-4">
    <form-produk></form-produk>
  </div>
</div>
</template>

<script>
import ProdukForm from '~/components/produk.vue';

export default {
  middleware: 'auth',
  components: {
    'form-produk' : ProdukForm
  },
   async asyncData({store}){
    let dk = '';
    let toko;
    let user =  store.getters.loggedInUser
  	await Promise.all([
      store.dispatch('toko/getTokoUserId', user.id).then(()=>{
        toko = store.state.toko.tokoUserId;
        if (toko.foodbae == 1){
          dk = `?foodbae=1`;
        }else{
          dk = `?foodbae=0`;
        }

        store.dispatch('kategori/getKategoriFoodbae', dk)
        return
      })
  	])
  	return
  },
}
</script>