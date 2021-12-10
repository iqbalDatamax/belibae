<template>
    <div class="body-bg min-h-screen pt-4 md:pt-20 pb-2 px-2 md:px-0" style="background: linear-gradient(90deg, #2810e0 0%, #990fac 120%)">
  	<header class="max-w-lg mx-auto flex justify-center">
	    <img class="w-40 h-9" src="/belibae_logo.png" alt="Avatar of User" />
    </header>

    <main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
            <h3 class="font-bold text-2xl">Welcome to Belibae</h3>
            <p class="text-gray-600 pt-2">Silahkan Buat Akun</p>
        </section>

        <section class="mt-10">
            <ValidationObserver v-slot="{ invalid }">
            <form class="flex flex-col" @submit.prevent="saveUser">
                <div class="mb-6 pt-3">
                    <ValidationProvider rules="email" v-slot="{ errors }">
                        <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Email</label>
                        <input type="email" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="users.email">
                        <p class="text-xs text-red-600">{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>
                <div class="mb-6 pt-3">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                        <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Nama Lengkap</label>
                        <input type="text" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="users.nama">
                        <p class="text-xs text-red-600">{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>
                <div class="mb-6 pt-3">
                    <ValidationProvider rules="numeric" v-slot="{ errors }">
                        <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Nomor WA</label>
                        <input type="number" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="users.nomor_wa">
                        <p class="text-xs text-red-600">{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>
                <div class="mb-6 pt-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Password</label>
                    <input type="password" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="users.password">
                </div>
                <div class="mb-6 pt-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Ulangi Password</label>
                    <input type="password" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="ulangPassword">
                </div>
                <button class="hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit" v-bind:disabled="invalid" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)">Daftar</button>
                <div class="mb-6 pt-4 text-center">
                    <span class="text-gray-600">Dengan mendaftar, saya menyetujui <nuxt-link :to="{name: 'term'}" class="text-green-600 hover:underline">Syarat dan Ketentuan</nuxt-link> Belibae</span>
                </div>
            </form>
            </ValidationObserver>
        </section>
        <div class="max-w-lg mx-auto text-center mt-6">
	        <p class="text-purple-400">Sudah punya akun? <nuxt-link :to="{name: 'login'}" class="font-bold hover:underline">Login le' disini</nuxt-link></p>
	    </div>
    </main>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  middleware: 'guest',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
        users: {
            nama: '',
            email: '',
            nomor_wa: '',
            password: '',
        },
        ulangPassword: '',
        message:''
    }
  },
  methods: {
    ...mapActions('user', ['tambahUsersData']),
    async saveUser(){
        try {
            if(this.ulangPassword === this.users.password){
                let data =  this.users
                await this.tambahUsersData(data)
                alert('berhasil membuat akun, silahkan login..')
                this.$router.push({name : 'login'})
            }else{
                alert('Password yang dimasukan tidak sama..!');
            }
        } catch (err) {
            alert('Email atau nomor wa sudah terdaftar.')
        }
    }
  }
}
</script>