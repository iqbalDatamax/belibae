<template>
<div>
  <header class="fixed w-full z-10 top-0 shadow-xl bg-white pb-1">
      <div class="flex p-3 flex-row items-center">
          <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.go(-1)">
              <i class="fas fa-arrow-left"></i>
          </div>
          <div class="inline-flex w-full">
            <div class="w-full inline-block relative">
              <input type="search" name="" class="h-10 leading-snug border w-full appearance-none bg-gray-100 text-gray-700 py-1 px-8 rounded-lg" placeholder="Cari produk kategori ini" v-model="search" @keyup.enter="searchProdukKate" />
              <div class="pointer-events-none absolute h-10 pl-2 pr-2 inset-y-0 left-0 flex items-center px-2 text-gray-500">
                <i class="fas fa-search"></i>
              </div>
            </div>
          </div>
      </div>
  </header>
  <div class="pt-16 pb-20">
    <form-produks></form-produks>
  </div>
  <Nav />
</div>
</template>

<script>
import Produks from '~/components/listproduk.vue';
import Nav from '~/components/nav.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    'form-produks' : Produks,
    Nav
  },
  async asyncData({store, params}){
    let dt = {
      id : params.id,
      query : `?page=0&size=20`
    }
    await Promise.all([
      store.dispatch('produk/getProdukKategoriId', dt)
    ])
    return
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions('produk', ['getProdukKategoriId']),
    searchProdukKate() {
      let data = {
        id : this.$route.params.id,
        query : `?namaproduk=${this.search}`
      }
      this.getProdukKategoriId(data)
    }
  }
}
</script>