<template>
<div>
  <header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
      <div class="flex p-3 flex-row items-center">
          <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.go(-1)">
              <i class="fas fa-arrow-left"></i>
          </div>
          <div class="inline-flex w-full">
              <div class="w-full inline-block relative">
                <p class="text-xl text-purple-700">Edit Tokomu</p>
              </div>
          </div>
      </div>
  </header>
  <div class="pt-16 m-1">
  	<section class="mt-2 px-3">
          <form class="flex flex-col" @submit.prevent="">
            <div class="mb-3 pt-4">
              <label class="block text-gray-700 text-sm mb-2 ml-1">Pilih Alamat</label>
              <v-select
                class="bg-gray-100 rounded w-full text-gray-800"
                placeholder="Pilih Alamat"
                v-model="almt"
                label="alamat_lengkap"
                :options="alamatUser"
                >
              </v-select>
              <span class="text-sm text-gray-600">Belum ada alamat ? tambah alamat <nuxt-link class="text-blue-500" :to="{name: 'akun-daftaralamat-id', params: {id:$route.params.id}}" >DISINI</nuxt-link></span>
            </div>

            <div class="mb-3">
                <label class="block text-gray-700 text-sm mb-2 ml-1">Nama Toko/Outlet</label>
                <input type="text" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="namatoko">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm mb-2 ml-1">Tagline Tokomu</label>
                <input type="text" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="deskripsi">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm mb-2 ml-1">Apakah tokomu adalah toko makanan/food (siap saji)</label>
              <select  type="select" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="foodbae">
                <option class="py-1" value="1">Ya</option>
                <option class="py-1" value="0">Tidak</option>
              </select>
            </div>
            <div class="mb-8">
              <label class="block text-gray-700 text-sm mb-2 ml-1">Status toko</label>
              <select  type="select" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="status">
                <option class="py-1" value="1">Buka</option>
                <option class="py-1" value="0">Tutup</option>
              </select>
            </div>
            <button class="mb-8 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)" @click="editToko">Submit Toko</button>
          </form>
      </section>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import vSelect from 'vue-select'

export default {
  middleware: 'auth',
  components: {
    vSelect
  },
  async asyncData({store, params}){
  	let user =  store.getters.loggedInUser
    await Promise.all([
		store.dispatch('toko/getTokoId', params.id), 
		store.dispatch('alamat/getAlamatUserId', user.id)
    ])
    return
  },
  data() {
    return {
      almt: '',
      foodbae: 0,
      status: 1,
      namatoko: '',
      deskripsi: '',
      userId: '',
      idtoko: '',
    }
  },
  computed: {
    ...mapState('toko', {
      tokoid: state => state.tokoId
    }),
    ...mapState('alamat', {
      alamatUser: state => state.alamatUserId
    }),
  },
  created(){
    this.almt = this.tokoid.alamats.alamat_lengkap;
    this.namatoko = this.tokoid.namatoko;
    this.deskripsi = this.tokoid.deskripsi;
    this.userId = this.tokoid.userId;
    this.idtoko = this.tokoid.id;
    this.foodbae = this.tokoid.foodbae;
    this.status = this.tokoid.status;
    this.userId = this.tokoid.userId;
  },
  methods: {
  ...mapActions('toko', [
      'editTokoData'
    ]),
    editToko(){
      let dt = {
        userId : this.userId,
        namatoko : this.namatoko,
        deskripsi : this.deskripsi,
        foodbae : this.foodbae,
        status : this.status,
        alamatId : this.almt.id
      };
      this.editTokoData(dt).then(() => {
        alert("Toko berhasil diubah")
        this.$router.push({name : 'akun-toko'})
      });
    },
  }
};

</script>