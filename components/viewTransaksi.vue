<template>
<div>
	<div class="bg-white max-w-lg mx-auto md:p-2 my-2 shadow-2xl">
        <div class="justify-between w-full">
			<div class="p-2">
				<!-- <p class="font-bold pb-2 text-3x1">Transaksi Id : <span class="text-sm px-3 bg-orange-200 text-orange-800 rounded-full">{{transaksiid.uuid}}</span></p> -->
				<p class="font-semibold pb-2 text-gray-600">Tanggal Transaksi : {{transaksiid.tgl_transaksi}}</p>
		    </div>
		</div>
	</div>
	<div class="bg-white max-w-lg mx-auto md:p-2 my-2 shadow-2xl">
        <div class="justify-between w-full">
        	<splide
		      :options="options"
		    >
		      <splide-slide v-for="foto in transaksiid.produk.fotos" :key="foto.urlfoto">
		        <img 
				class="h-64 w-full"
		        v-bind:src="`${$axios.defaults.baseURL}/`+foto.urlfoto"
		        alt="detail"
				>
		      </splide-slide>
		    </splide>
			<div class="p-2">
				<p class="font-bold pb-2 text-sm">Detail Pesanan</p>
				<div class="flex justify-between pb-2">
					<div class="">Nama Produk</div>
					<div class="font-semibold">{{transaksiid.produk.namaproduk}}</div>
				</div>
				<div class="flex justify-between pb-2 ">
					<div class="">Qty</div>
					<div class="font-semibold" >{{transaksiid.qty}}</div>
				</div>
				<div class="flex justify-between pb-2 ">
					<div class="">Harga</div>
					<div>
						<p class="font-semibold">Rp{{getHarga(transaksiid.harga, transaksiid.diskon)}}</p>
					</div>
				</div>
				<div class="flex justify-between pb-2 ">
					<div class="">Diskon</div>
					<div class="font-semibold">{{getDiskon(transaksiid.harga, transaksiid.diskon)}}%</div>
				</div>
				<div class="flex justify-between pb-2 border-t-2 pt-3">
					<div class="">Total</div>
					<div class="font-bold">Rp{{subTotal(transaksiid.qty,transaksiid.harga,transaksiid.diskon)}}</div>
				</div>
		    </div>
		</div>
	</div>
	<div class="bg-white max-w-lg mx-auto md:p-2 my-2 shadow-2xl text-sm">
		<div class="mx-2 py-2">
			<label class="font-bold pb-2">Waktu Pengiriman & Ongkir</label>
			<div v-if="transaksiid.kirim_langsung == 0">
			  <p class="font-light text-sm text-gray-600">Pengiriman 1 sd 2 Hari Kerja</p>
			  <div v-if="transaksiid.produk.bisakembali === 0">
			    <label class="text-green-600 text-sm mt-2 pt-6 font-light">Produk tidak bisa dikembalikan</label>
			    <p class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp{{ongkir(transaksiid.kirim_langsung, transaksiid.alamats.desa.kecamatanId, transaksiid.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
			  </div>
			  <div v-else>
			    <label class="text-green-600 text-sm mt-2 pt-6 font-light">Produk bisa dikembalikan</label>
			    <p class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp {{ongkir(transaksiid.kirim_langsung, transaksiid.alamats.desa.kecamatanId, transaksiid.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
			    <p class="text-red-600 text-xs font-light">Jika dikembalikan dikenakan Ongkir : Rp {{ongkir(transaksiid.kirim_langsung, transaksiid.alamats.desa.kecamatanId, transaksiid.produk.tokos.alamats.desa.kecamatanId).ongkirKembali}}</p>
			  </div>
			</div>
			<div v-else>
			  <p class="font-light text-sm text-gray-600">Pengiriman Langsung / Hari ini juga</p>
			  <div v-if="transaksiid.produk.bisakembali === 0">
			    <label class="text-green-600 text-sm mt-2 font-light">Produk tidak bisa dikembalikan</label>
			    <p class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp{{ongkir(transaksiid.kirim_langsung, transaksiid.alamats.desa.kecamatanId, transaksiid.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
			  </div>
			  <div v-else>
			    <label class="text-green-600 text-sm mt-2 pt-6 font-light">Produk bisa dikembalikan</label>
			    <p class="text-purple-600 text-sm font-light">Ongkos Kirim : <span>Rp {{ongkir(transaksiid.kirim_langsung, transaksiid.alamats.desa.kecamatanId, transaksiid.produk.tokos.alamats.desa.kecamatanId).ongkir}}</span></p>
			    <p class="text-red-600 text-xs font-light">Jika dikembalikan, tetap dikenakan Ongkir : Rp {{ongkir(transaksiid.kirim_langsung, transaksiid.alamats.desa.kecamatanId, transaksiid.produk.tokos.alamats.desa.kecamatanId).ongkirKembali}}</p>
			  </div>
			</div>
		</div>
    </div>
	<div class="bg-white max-w-lg mx-auto md:p-2 my-2 shadow-2xl text-sm">
        <div class="justify-between w-full">
			<div class="p-2">
				<p class="font-bold pb-2">Informasi Penjual & Alamat Toko</p>
				
				<div class="flex justify-between pb-2">
					<div class="">Nama Toko</div>
					<div class="font-semibold">{{transaksiid.produk.tokos.namatoko}}</div>
				</div>
				<div class="flex justify-between pb-2">
					<div class="">Nama</div>
					<div class="font-semibold">{{transaksiid.produk.tokos.user.nama}}</div>
				</div>
				<div class="flex justify-between pb-2">
					<div class="">No Telpon/Wa</div>
					<div class="font-semibold">{{transaksiid.produk.tokos.user.nomor_wa}}</div>
				</div>
				<div class="flex justify-between pb-2">
					<div class="">Desa</div>
					<div class="font-semibold">{{transaksiid.produk.tokos.alamats.desa.namadesa}}</div>
				</div>
				<div class="flex justify-between pb-2">
					<div class="">Kecamatan</div>
					<div class="font-semibold">{{transaksiid.produk.tokos.alamats.desa.kecamatan.namakecamatan}}</div>
				</div>
				<div class="pt-4 pb-2">
					<div class="">Alamat Lengkap:</div>
					<div class="text-gray-600">{{transaksiid.produk.tokos.alamats.alamat_lengkap}}</div>
				</div>
		    </div>
		</div>
	</div>
	<div class="bg-white max-w-lg mx-auto md:p-2 my-2 shadow-2xl text-sm">
        <div class="justify-between w-full">
			<div class="p-2">
				<p class="font-bold pb-2">Informasi Pembeli & Alamat pengiriman</p>
				<div class="flex justify-between pb-2">
					<div class="">Nama</div>
					<div class="font-semibold">{{transaksiid.user.nama}}</div>
				</div>
				<div class="flex justify-between pb-2">
					<div class="">Nomor telpon/WA</div>
					<div class="font-semibold">{{transaksiid.user.nomor_wa}}</div>
				</div>
				<div class="flex justify-between pb-2">
					<div class="">Desa</div>
					<div class="font-semibold">{{transaksiid.alamats.desa.namadesa}}</div>
				</div>
				<div class="flex justify-between pb-2">
					<div class="">Kecamatan</div>
					<div class="font-semibold">{{transaksiid.alamats.desa.kecamatan.namakecamatan}}</div>
				</div>
				<div class="pt-4 pb-2">
					<div class="">Alamat Lengkap :</div>
					<div class="text-gray-600">{{transaksiid.alamats.alamat_lengkap}}</div>
				</div>
				
		    </div>
		</div>
	</div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  components: {
  },
  data() {
  	return {
  		options: {
		  rewind: true,
		  gap   : '1rem',
		}
  	}
  },
  computed: {
  	...mapState('transaksi', {
  		transaksiid : state => state.transaksiId
  	})
  },
  methods: {
  	ongkir(kirlang, kecpengiriman, kectoko){
      if(kirlang == 0){
        if(kecpengiriman == kectoko){
          let data = { 
            ongkir : this.formatPrice(0),
            ongkirKembali : this.formatPrice(5000)
          }
          return data
        }else{
          let data = { 
            ongkir : this.formatPrice(0),
            ongkirKembali : this.formatPrice(9000)
          }
          return data
        }
      }else{
        if(kecpengiriman == kectoko){
          let data = { 
            ongkir : this.formatPrice(5000),
            ongkirKembali : this.formatPrice(5000)
          }
          return data
        }else{
          let data = { 
            ongkir : this.formatPrice(9000),
            ongkirKembali : this.formatPrice(9000)
          }
          return data
        }
      }
    },
  	formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    getHarga(harga, diskon){
      if(harga <= 200000){
        return this.formatPrice((harga + harga*10/100)-diskon)
      }else if(harga > 200000 & harga <= 1000000){
        return this.formatPrice((harga + harga*5/100)-diskon)
      }else if(harga > 1000000){
        return this.formatPrice((harga + harga*3/100)-diskon)
      }
    },
    getDiskon(harga, diskon){
      if(harga <= 200000){
        return this.formatDiskon((diskon/(harga+harga*10/100))*100)
      }else if(harga > 200000 & harga <= 1000000){
        return this.formatDiskon((diskon/(harga+harga*5/100))*100)
      }else if(harga > 1000000){
        return this.formatDiskon((diskon/(harga+harga*3/100))*100)
      }
    },
    formatDiskon(value) {
      return value.toFixed();
    },
    subTotal(qty, harga, diskon){
      if(harga <= 200000){
        return this.formatPrice(qty*((harga + harga*10/100)-diskon))
      }else if(harga > 200000 & harga <= 1000000){
        return this.formatPrice(qty*((harga + harga*5/100)-diskon))
      }else if(harga > 1000000){
        return this.formatPrice(qty*((harga + harga*3/100)-diskon))
      }
    },
  }
}
</script>