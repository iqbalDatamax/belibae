<template>
	<header class="fixed w-full z-10 top-0 shadow" 
		style="background: linear-gradient(90deg, #2810e0 0%, #990fac 120%)"> <!-- 667eea  764ba2 -->
        <div class="flex p-3 flex-row items-center justify-between">
            <div
                class="title-font font-medium items-center">
                <img class="w-36 h-6" src="/belibae_logo.png" alt="belibae_logo" />
            </div>
            <div class="inline-flex">
                <nuxt-link
                 :to="{name: 'sukaku'}"
                 class="hover:text-red-400 text-white ml-4 py-2">
                    <i class="fas fa-heart text-2xl"></i>
                </nuxt-link>
                <nuxt-link
                 :to="{name: 'cari'}"
                 class="hover:text-gray-400 text-white ml-4 py-2 pl-2">
                    <i class="fas fa-search text-2xl"></i>
                </nuxt-link>
            </div>
        </div>
    </header>
</template>