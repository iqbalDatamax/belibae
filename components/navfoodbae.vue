<template>
	<div class="w-full">
		<section class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
			<div class="flex justify-between pb-2">
				<nuxt-link
				 to="/"
				 class="w-full justify-center inline-block text-center text-gray-700 py-2">
					<div class="text-center">
	                    <span class="block text-xl leading-8">
	                        <i class="fas fa-store-alt"></i>
	                    </span>
	                    <span class="block text-xs leading-none">Beranda</span>
	                </div>
				</nuxt-link>
<!-- 				<nuxt-link
				:to="{name: 'kategori'}"
				class="w-full justify-center inline-block text-center text-gray-700 pt-2 pb-1">
					<div class="text-center">
	                    <span class="block text-xl leading-8">
	                        <i class="fas fa-th-large"></i>
	                    </span>
	                    <span class="block text-xs leading-none">Kategori</span>
	                </div>
				</nuxt-link> -->
				<!-- <nuxt-link
				:to="{name: 'foodbae'}"
				class="w-full justify-center inline-block text-center text-gray-700 pt-2 pb-1">
					<div class="text-center">
	                    <span class="block text-xl leading-8">
	                        <i class="fas fa-utensils"></i>
	                    </span>
	                    <span class="block text-xs leading-none">Foodbae</span>
	                </div>
				</nuxt-link> -->
				<nuxt-link
				:to="{name: 'keranjangfoodbae'}"
				class="w-full justify-center inline-block text-center text-gray-700 pt-2 pb-1">
					<div class="text-center">
	                    <span class="block text-xl leading-8">
	                        <i class="fas fa-shopping-cart"></i>
	                    </span>
	                    <span class="absolute ml-2 top-0 rounded-full bg-red-500 w-5 h-5 top p-0 text-white leading-tight text-center">{{jumlah}}</span>
	                    <span class="block text-xs leading-none">Keranjang</span>

	                </div>
				</nuxt-link>
				<nuxt-link
				:to="{name: 'akun'}"
				class="w-full justify-center inline-block text-center text-gray-700 pt-2 pb-1">
					<div class="text-center">
	                    <span class="block text-xl leading-8">
	                        <i class="fas fa-user"></i>
	                    </span>
	                    <span class="block text-xs leading-none">Akun</span>
	                </div>
				</nuxt-link>
			</div>
		</section>
	</div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    ...mapGetters('transaksi',{
	  jumlah: 'countKeranjangFoodbae'
	})

  }
}
</script>

<style type="text/css">
	a.nuxt-link-exact-active {
	  color: #7C3AED;
	}
</style>