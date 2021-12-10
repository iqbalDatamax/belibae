<template>
    <div class="body-bg min-h-screen pt-20 pb-2 px-2 md:px-0" style="background: linear-gradient(90deg, #2810e0 0%, #990fac 120%)">
  	<header class="max-w-lg mx-auto flex justify-center">
	    <img class="w-40 h-9" src="/belibae_logo.png" alt="Avatar of User" />
    </header>

    <main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
            <h3 class="font-bold text-2xl">Welcome to Belibae</h3>
            <p class="text-gray-600 pt-2">Silahkan Login.</p>
        </section>

        <section class="mt-10">
            <form class="flex flex-col" @submit.prevent="userLogin">
                <div class="mb-6 pt-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Email</label>
                    <input type="text" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="auth.email">
                </div>
                <div class="mb-6 pt-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Password</label>
                    <input type="password" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="auth.password">
                </div>
                
                <div class="flex justify-end">
                    <a href="#" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Lupa password?</a>
                </div>
                <button class="hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)">Login</button>
            </form>
        </section>
        <div class="max-w-lg mx-auto text-center mt-6">
	        <p class="text-purple-400">Tidak punya akun? <nuxt-link :to="{name: 'daftar'}" class="font-bold hover:underline">Daftar disini</nuxt-link>.</p>
	    </div>
    </main>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    middleware: 'guest',
    data() {
        return {
            auth: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async userLogin() {
          try {
            let response = await this.$auth.loginWith('local', { data: this.auth })
            this.$router.push('/')
          } catch (err) {
            alert('email atau password salah..')
          }
        }
    }
}
</script>
