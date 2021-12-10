<template>
<div>
  <header class="fixed w-full z-10 top-0 shadow bg-white pb-2">
      <div class="flex p-3 flex-row items-center">
          <div class="text-purple-600 text-xl ml-2 mr-5" @click="$router.go(-1)">
              <i class="fas fa-arrow-left"></i>
          </div>
          <div class="inline-flex w-full">
              <div class="w-full inline-block relative">
                <p class="text-xl text-purple-700">Daftar alamat</p>
              </div>
          </div>
      </div>
  </header>

  <div v-if="alamatUser == ''" class="m-2 pt-16">
    <div class="mt-6 bg-purple-100 border-b-4 border-purple-700 p-4 rounded-lg">
      <p class="font-bold text-purple-700 text-lg"><i class="fas fa-exclamation-circle"></i> Opppsss....</p>
      <p class="text-purple-500 text-xl">Alamat Belum Ada</p>
    </div>
  </div>
  <div v-else class="m-2 pt-4 pt-16">
    <div class="flex flex-row justify-between items-center py-4 border-b" v-for="alamat in alamatUser">
      <div class="font-light text-sm">
        <p class="text-gray-700">{{alamat.desa.namadesa}} Kec. {{alamat.desa.kecamatan.namakecamatan}} Kab. {{alamat.desa.kecamatan.kabupaten.namakabupaten}}</p>
          <p class="text-gray-700">{{alamat.alamat_lengkap}}</p>
      </div>
      <div class="">
        <i class="border border-red-600 rounded text-red-600 px-2 py-1 fas fa-trash" @click="hapusAlamat(alamat.id)"></i>
        <!-- <i class="border border-orange-500 rounded text-orange-500 px-2 py-1 fas fa-edit"></i> -->
      </div>  
    </div>
  </div>

  <div class="flex justify-end pr-4 pt-6">
    <button class="hover:bg-purple-700 bg-purple-500 text-white p-2 rounded shadow hover:shadow-xl transition duration-200" @click="showModal">Tambah alamat</button>
  </div>


  <modal name="modal-alamat" :height="'auto'" :scrollable="true" :width="'95%'" :adaptive="true">
    <div class="pb-4 px-3 py-4">
    <label class="text-lg font-semibold text-gray-700">Tambah Alamat Baru</label>
      <form class="flex flex-col" @submit.prevent="">
        <div class="mb-4 pt-4">
          <v-select 
            :clearable="false"
            class="bg-gray-100"
            placeholder="Pilih kabupaten"
            v-model="kab"
            label="namakabupaten"
            :options="kabupatens"
            @input="pilKab"
            >
          </v-select>
        </div>
        <div class="mb-4">
          <v-select
            :clearable="false"
            class="bg-gray-100"
            placeholder="Pilih kecamatan"
            v-model="kec"
            label="namakecamatan"
            :options="kecamatans"
            @input="pilKec"
            >
          </v-select>
        </div>
        <div class="mb-4">
          <v-select 
            :clearable="false"
            class="bg-gray-100"
            placeholder="Pilih desa"
            v-model="des"
            label="namadesa"
            :options="desas"
            >
          </v-select>
        </div>
        <div class="mb-8">
          <label class="block text-gray-700 text-sm font-bold mb-2 ml-1">Alamat Lengkap</label>
          <textarea type="text" class="bg-gray-100 rounded w-full text-gray-800 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 pt-2 pb-2 px-3" v-model="alamat_lengkap" placeholder="Isikan nama jalan atau penanda tempat barang akan diantar">
          </textarea>
        </div>

        <p>{{alamatUser.alamat_lengkap}}</p>
        <button class="hover:bg-purple-700 bg-purple-500 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit" @click="saveAlamat">Simpan Alamat</button>

      </form>
    </div>
  </modal>
</div>
</template>

<script>
import vSelect from 'vue-select'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  components: {
      vSelect,
  },
  data() {
    return {
      alamat_lengkap : '',
      kabupatens : [],
      kecamatans : [],
      desas : [],
      kab : null,
      kec : null,
      des : null,
    }
  },
  async asyncData({store, params}){
    let data = params.id
    await Promise.all([
      store.dispatch('alamat/getAlamatUserId', data)
    ])
    return
  },
  computed: {
  // ...mapGetters(['loggedInUser']),
    ...mapState('alamat', {
      alamatUser: state => state.alamatUserId
    }),
  },
  methods: {
    ...mapActions('alamat', [
      'getKabupatenData',
      'getDesaKec',
      'getKecKab',
      'tambahAlamatData',
      'getAlamatUserId',
      'getAlamatId',
      'hapusAlamatData'
    ]),

    showModal() {
      this.getKabupatenData().then(()=>{
        this.kabupatens = this.$store.state.alamat.kabupatens;
      })
      this.$modal.show('modal-alamat');
    },

    pilKab(){
      this.getKecKab(this.kab.id).then(() => {
        const kecam = this.$store.state.alamat.kecamatanKab
        // this.kecam = true;
        this.kec = null;
        this.des = null
        this.kecamatans = kecam
      })
    },
    pilKec(){
      this.getDesaKec(this.kec.id).then(() => {
        const desaku = this.$store.state.alamat.desaKec
        // this.desaku = true
        this.des = null
        this.desas = desaku
      })
    },
    hapusAlamat(id){
      let data = {
        userId : this.$route.params.id,
        id : id
      };
      var r = confirm("Alamat akan dihapus?");
      if (r == true) {
          this.hapusAlamatData(data).then(() => {
            this.alamatUser = this.$store.state.alamat.alamatUserId;
            alert("Alamat berhasil dihapus")
          })
      }
    },
    saveAlamat(){
      if(this.alamat_lengkap === ''){
        alert('Alamat Lengkap tidak boleh kosong');
      }else if(this.des == undefined){
        alert('Kabupaten, kecamatan, desa tidak boleh kosong');
      }else{
        let data = {
          userId : this.$route.params.id,
          desaId : this.des.id,
          alamat_lengkap : this.alamat_lengkap
        };
        this.tambahAlamatData(data).then(() => {
          alert('Berhasil menambah alamat')
          this.alamatUser = this.$store.state.alamat.alamatUserId
          this.$modal.show('modal-alamat');
        });
      }   
    },
  }
}
</script>