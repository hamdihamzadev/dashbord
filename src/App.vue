<template>
  <div id="app" class="container-flui d-flex">
    <div :class="{'visible':visibleHeaderAside}" ref="sidebar">
      <SideBar @toggle-MenuAsidePhone="toggleMenuAsidePhone" :is-hidden-asid-phone="isHiddenAsidPhone" />
    </div>
    <div class="head-cont" :class="{'fullWidth':visibleHeaderAside}" ref="headCont">
      <HeaDer @toggel-header="toggelheader()"  @toggel-headerPhone="toggelheaderPhone()" :class="{'visible':visibleHeaderAside}" />
      <router-view />
    </div>
  </div>
</template>

<script>
  import SideBar from './components/app/SideBar.vue'
  import HeaDer from './components/app/HeaDer.vue'

  export default {
    name: 'App',
    components: {
      SideBar,
      HeaDer
    },

    data(){
      return{
        isHiddenAsidPhone:false
      }
    },

    computed: {
      visibleHeaderAside() {
        let visible = false
        const token=localStorage.getItem('token')
        this.$route.path === '/Login' || this.$route.path === '/' || this.$route.name === 'NotFound' ||token===null ? visible = true :
          visible = false
        return visible

      },

    },

    methods: {
      toggelheader() {
        this.isHiddenAsidPhone=true
        const sidebar = this.$refs.sidebar
        const headCont = this.$refs.headCont
        sidebar.classList.toggle('visible')
        headCont.classList.toggle('fullWidth')

      },

      // toggle aside in phone
      toggelheaderPhone(){
        this.isHiddenAsidPhone=true
      },
      toggleMenuAsidePhone(){
        this.isHiddenAsidPhone=false
      },

      checkUserIsConnected(){
        const token=localStorage.getItem('token')

        if(token===null){
          this.$route.path!=='/' && this.$route.path!=='/Login' ? this.$router.push('/Login') :''
        }

      }
    },

    mounted(){
     this.checkUserIsConnected()
     
    }

  }
</script>



<style lang="scss">
  #app {
    background-color: #02021e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: white;
    overflow-x: hidden;

    .head-cont {
      width: 100%;
      margin-left: 14%;
      transition: 0.3s;
      height: 100vh;

      .dashbord,
      .neworders,
      .confirmedorders,
      .shipped,
      .delivred,
      .return,
      .postpond,
      .inprogress,
      .addOrder,
      #addCustomer,
      #section-topCustomer,
      #topStatistics,
      .allcategories,
      .listecustomers{
        margin: 47px 0px;

      }

      .namepage {
        margin-bottom: 30px;
      }
    }

    .fullWidth {
      margin-left: 0px;
    }

    .visible {
      display: none;
    }


     /* Style for tablets (less than de 992px) */
  @media (max-width: 991.98px) {
    .head-cont {
      margin-left: 0%;
    }
    .fullWidth {
      margin-left: 0px;
    }
  }
    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
      .head-cont {
        margin-left: 0px;
      }

    }
  }
</style>