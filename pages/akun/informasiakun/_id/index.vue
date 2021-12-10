<template>
<div>
  <header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
      <div class="flex p-3 flex-row items-center">
          <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.push('/akun')">
              <i class="fas fa-arrow-left"></i>
          </div>
          <div class="inline-flex w-full">
              <div class="w-full inline-block relative">
                <p class="text-xl text-purple-700">Informasi Akun</p>
              </div>
          </div>
      </div>
  </header>
  <div class="bg-white max-w-lg mx-auto md:p-2 pb-4 pt-16">
    <div class="justify-between w-full">
  		<div class="">
  			<div class="flex justify-between py-4 border-b px-3 font-semibold">
  				<div class="text-gray-700">Data Pribadi</div>
  				<div class="text-green-400">
  					<button class="font-bold" @click="openEdituser">Ubah</button>
  				</div>
  			</div>
  			<div class="flex justify-between py-4 pl-4 pr-3 border-b">
  				<div class="text-gray-700">Nama Lengkap</div>
  				<div class="text-gray-500">
  					<p>{{userid.nama}}</p>
  				</div>
  			</div>
  			<div class="flex justify-between py-4 pl-4 pr-3 border-b">
  				<div class="text-gray-700">Nomor WA</div>
  				<div class="text-gray-500">
  					<p>{{userid.nomor_wa}}</p>
  				</div>
  			</div>
  			<div class="flex justify-between py-4 pl-4 pr-3 border-b">
  				<div class="text-gray-700">Email</div>
  				<div class="text-gray-500">
  					<p>{{userid.email}}</p>
  				</div>
  			</div>
  			<div class="flex justify-between py-4 pl-4 pr-3 border-b">
  				<div class="text-gray-700">Status</div>
  				<div class="text-gray-500">
  					<p>{{userid.status?'Aktif':'Tidak Aktif'}}</p>
  				</div>
  			</div>
  			<div class="flex justify-between py-4 pl-4 pr-3 border-b">
  				<div class="text-gray-700">Tanggal Gabung</div>
  				<div class="text-gray-500">
  					<p>{{userid.createdAt}}</p>
  				</div>
  			</div>
  			<div class="flex justify-between py-4 pt-6 border-b px-3 font-semibold">
  				<div class="text-gray-700">Password</div>
  				<div class="text-green-400">
  					<button class="font-bold" @click="openPasswordModal">Ubah</button>
  				</div>
  			</div>
  			<div class="flex justify-between py-4 pl-4 pr-3 border-b">
  				<div class="text-gray-700">Password</div>
  				<div class="text-gray-800">
  					<p>********</p>
  				</div>
  			</div>
  	 	</div>
  	</div>
  </div>

  <modal name="modal-edituser" :height="'auto'" :scrollable="true" :width="'95%'" :adaptive="true">
    <div class="pb-4 px-3 py-4">
      <label class="text-lg font-semibold text-gray-700">Edit Akun</label>
      <form class="flex flex-col" @submit.prevent="updateUser">
        <div class="mb-4 pt-3">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Nama Lengkap</label>
                <input type="text" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="users.nama">
                <p class="text-xs text-red-600">{{ errors[0] }}</p>
            </ValidationProvider>
        </div>
        <div class="mb-4">
            <ValidationProvider rules="email" v-slot="{ errors }">
                <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Email</label>
                <input type="email" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="users.email">
                <p class="text-xs text-red-600">{{ errors[0] }}</p>
            </ValidationProvider>
        </div>
        <div class="mb-8">
            <ValidationProvider rules="numeric" v-slot="{ errors }">
                <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Nomor WA</label>
                <input type="number" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="users.nomor_wa">
                <p class="text-xs text-red-600">{{ errors[0] }}</p>
            </ValidationProvider>
        </div>
        <button class="hover:bg-purple-700 text-white font-bold py-3 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)">Submit Perubahan</button>
      </form>
    </div>
  </modal>

  <modal name="modal-password" :height="'auto'" :scrollable="true" :width="'95%'" :adaptive="true">
    <div class="pb-4 px-3 py-4">
      <label class="text-lg font-semibold text-gray-700">Mengubah Password</label>
      <form class="flex flex-col" @submit.prevent="ubahpassword">
        <div class="mb-4 pt-3">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Password Lama</label>
                <input type="password" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="passwordlama">
                <p class="text-xs text-red-600">{{ errors[0] }}</p>
            </ValidationProvider>
        </div>
        <div class="mb-4">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Password Baru</label>
                <input type="password" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="passwordbaru">
                <p class="text-xs text-red-600">{{ errors[0] }}</p>
            </ValidationProvider>
        </div>
        <div class="mb-8">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Konfirmasi Password Baru</label>
                <input type="password" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="ulangPassword">
                <p class="text-xs text-red-600">{{ errors[0] }}</p>
            </ValidationProvider>
        </div>
        <button class="hover:bg-purple-700 text-white font-bold py-3 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)">Ubah Password</button>
      </form>
    </div>
  </modal>

</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";


export default {
  middleware: 'auth',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  async asyncData({store, params}){
  	await Promise.all([
  		store.dispatch('user/getUsersId', params.id)
  	])
  	return
  },
  data() {
    return {
    	userid : [],
      users: {
      	id : '',
          nama: '',
          email: '',
          nomor_wa: '',
      },
      passwordlama : '',
      passwordbaru : '',
      ulangPassword : ''
    }
  },
  computed: {
  	...mapState('user', {
  		userId: state => state.userId
  	}),
  },
  created(){
  	this.userid = this.userId
  },
  methods : {
  	...mapActions('user', ['editUsersData', 'getUsersId']),
  	openEdituser(){
	  	this.users = {
	  		id : this.userid.id,
	  		nama : this.userid.nama,
	  		email : this.userid.email,
	  		nomor_wa : this.userid.nomor_wa
	  	}
      this.$modal.show('modal-edituser');
	  },

  	updateUser(){
  		let data = this.users
  		this.editUsersData(data).then(()=>{
  			alert('Data user berhasil di ubah');
  			this.getUsersId(data.id).then(()=>{
  				this.userid = this.$store.state.user.userId
          this.$modal.hide('modal-edituser');
  			})
  		})
  	},

  	openPasswordModal(){
  		this.$modal.show('modal-password');
  	},

	  ...mapActions('user', [
  		'ubahPassword'
  	]),
  	ubahpassword(){
  		if(this.ulangPassword != this.passwordbaru){
  			alert('password yang diinputkan tidak sama')
  		}else{
  			let data = {
  				id : this.$route.params.id,
  				passwordlama : this.passwordlama,
  				passwordbaru : this.passwordbaru
  			};
  			this.ubahPassword(data).then(() => {
  				let message = this.$store.state.user.message;
  				if(message.success == false){
  					alert(message.message)
  				}else{
  					alert(message.message)
		  			this.passwordlama = '';
		  			this.passwordbaru = '';
		  			this.ulangPassword = '';
            this.$modal.hide('modal-password');
  				}
  			})
  		}
  	}
  }
}
</script>
