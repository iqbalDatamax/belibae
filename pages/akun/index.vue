<template>
 <div>
  <Navbar />
  <div class="flex items-center p-2 bg-white shadow-lg mt-16">
    <div class="p-5 m-2 text-purple-500 bg-purple-100 rounded-full">
      <i class="fas fa-user text-4xl"></i>
    </div>
    <div class="ml-3 mb-2">
    	<p class="text-gray-600 text-sm dark:text-gray-400">{{loggedInUser.email}}</p>
      	<p class="mb-1 text-gray-700 dark:text-gray-200">{{loggedInUser.nama}}</p>
      	<p class="mb-2 text-xs text-gray-700 dark:text-gray-200">Sejak  {{formatDate(loggedInUser.createdAt)}}</p>
    </div>
  </div>
  <div class="bg-white max-w-lg mx-auto md:p-2 my-2 pb-4">
    <div class="justify-between w-full">
  		<div class="p-4">
  			<nuxt-link :to="{name: 'akun-pesanan'}" class="flex justify-between py-4 border-b">
  				<div class="text-gray-700">Daftar Pesanan</div>
  				<div class="text-gray-500">
  					<i class="fas fa-chevron-right"></i>
  				</div>
  			</nuxt-link>
  			<nuxt-link v-if="toko" :to="{name: 'akun-toko'}" class="flex justify-between py-4 border-b">
  				<div class="text-gray-700">Toko Saya</div>
  				<div class="text-gray-500">
  					<i class="fas fa-chevron-right"></i>
  				</div>
  			</nuxt-link>
        <nuxt-link v-else :to="{name: 'akun-tambahtoko-id', params: {id:loggedInUser.id}}" class="flex justify-between py-4 border-b">
          <div class="text-gray-700">Buat tokomu gratis <span class="text-red-500">*</span></div>
          <div class="text-gray-500">
            <i class="fas fa-chevron-right"></i>
          </div>
        </nuxt-link>
        <nuxt-link :to="{name: 'akun-informasiakun-id', params: {id:loggedInUser.id}}" class="flex justify-between py-4 border-b">
          <div class="text-gray-700">Informasi AKun</div>
          <div class="text-gray-500">
            <i class="fas fa-chevron-right"></i>
          </div>
        </nuxt-link>
        <nuxt-link :to="{name: 'akun-daftaralamat-id', params: {id:loggedInUser.id}}" class="flex justify-between py-4 border-b">
          <div class="text-gray-700">Daftar Alamat</div>
          <div class="text-gray-500">
            <i class="fas fa-chevron-right"></i>
          </div>
        </nuxt-link>
        <nuxt-link :to="{name: 'term'}" class="flex justify-between py-4 border-b">
          <div class="text-gray-700">Syarat & ketentuan</div>
          <div class="text-gray-500">
            <i class="fas fa-chevron-right"></i>
          </div>
        </nuxt-link>
        <nuxt-link :to="{name: 'privacy'}" class="flex justify-between py-4 border-b">
          <div class="text-gray-700">Kebijakan Privasi</div>
          <div class="text-gray-500">
            <i class="fas fa-chevron-right"></i>
          </div>
        </nuxt-link>
  			<div class="pt-8 pb-24">
  				<button @click="logout" class="hover:bg-gray-600 text-gray-800 bg-gray-400 font-semibold p-3 rounded transition duration-200" type="button"><i class="fas fa-sign-out-alt"></i> Logout</button>
  			</div>
  	  </div>
  	</div>
  </div>
  <Nav />
 </div>
</template>

<script>
import Nav from '~/components/nav.vue';
import Navbar from '~/components/navbar.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  middleware: 'auth',
  components: {
    Nav,
    Navbar
  },
  async asyncData({store}){
    let user = store.getters.loggedInUser;
    await store.dispatch('toko/getTokoUserId', user.id);
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState('toko', {
      toko : state => state.tokoUserId
    }),
  },
  methods: {
    async logout(){
      await this.$auth.logout()
      this.$router.push('/login')
    },
  	formatDate(val){
  		const months = ["Januari", "Februari", "Maret","April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  		let date = new Date(val)
  		return months[date.getMonth()] + " " + date.getFullYear()
  	},
  }
}
</script>

<style>

</style>