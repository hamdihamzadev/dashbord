<template>

  <b-row>
    <b-col lg="5"> <img src="../assets/Rectangle 56.png" alt="" class="vh-100 w-100" id="img"></b-col>
    <b-col lg="7" class="d-flex flex-column justify-content-center vh-100">

      <img src="../assets/logo-white 1.png" alt="" class="d-block mx-auto" id="logo">
      <div class="text-center">
        <strong id="welcome">Welcome to our platform!</strong>
        <p id="subtitle-welcome">Log in to access your account and start exploring</p>
      </div>

      <b-form @submit.prevent="login" id="form-login">

        <label id="custom-labelel">Email</label>
        <b-form-group id="input-group-1">
          <b-form-input id="email" v-model="formLogin.email" type="email" placeholder="Enter email" required>
          </b-form-input>

        </b-form-group>

        <label id="custom-labelel">Password</label>
        <b-form-group id="input-group-2">
          <b-form-input type="password" id="password" v-model="formLogin.password" placeholder="Enter password"
            required></b-form-input>

        </b-form-group>

        <b-button type="submit" variant="light" class="fw-bold w-100" id="button">Login</b-button>
        <p class="text-center mt-3">Not registered yet? <a href="" @click="$router.push('/')">Sign up here</a></p>

      </b-form>

    </b-col>
  </b-row>


</template>

<script>
  
import axios from 'axios';
  export default {
    name: 'LoginUser',
    data() {
      return {
        formLogin: {
          email: '',
          password: '',
        },
         apiUrl:process.env.VUE_APP_API_URL,
       
      }
    },

    methods: {
      async login() {
        try {
          const response = await axios.post(`${this.apiUrl}/api/login`, this.formLogin)
          localStorage.setItem('token', response.data.token)
          this.$router.push('/DashBord')
        } catch (error) {
          console.log('error is :', error)

        }
      },

    },

   



  }
</script>



<style scoped>
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0px;
    padding: 0px;
  }

  #logo {
    margin-bottom: 60px;
  }

  #welcome {
    font-size: 22px;
  }

  #subtitle-welcome {
    font-size: 14px;
    color: #969696;
    margin-top: 4px;
  }

  #form-login {
    margin-inline: 24%;
    margin-top: 26px;
  }

  #Name,
  #Age,
  #email,
  #password {
    background: transparent;
    border: 1px solid #969696;
    height: 46px;
    margin-bottom: 21px;
    display: block;
    color: white;
    border-radius: 6px;
    padding-left: 15px;
  }





  #email::placeholder {
    color: #969696;
  }

  #password::placeholder {
    color: #969696;
  }

  #Age::placeholder {
    color: #969696;
  }

  #Name::placeholder {
    color: #969696;
  }




  #Name:focus {
    color: #ffffff;
    box-shadow: none;
    border-color: white;
  }

  #Age:focus {
    color: #ffffff;
    box-shadow: none;
    border-color: white;
  }

  #email:focus {
    color: #ffffff;
    box-shadow: none;
    border-color: white;
  }

  #password:focus {
    color: #ffffff;
    box-shadow: none;
    border-color: white;
  }


  #button {

    margin-top: 35px;
    color: #02021E;
    height: 46px;

  }

  #custom-labelel {
    background: #02021e;
    position: relative;
    top: 8px;
    width: AUTO;
    text-align: center;
    left: 11px;
    font-size: 13px;
    display: inline-block;
    padding: 0px 4px;
  }

  /* Style for tablets (less than de 992px) */
  @media (max-width: 991.98px) {

    #img {
      display: none;
    }
    #form-login {
      margin-inline: 12%;

    }
  }

  /* Style for phone (less than de 767.98px) */
  @media (max-width: 767.98px) {
    #img {
      display: none;
    }

    #form-login{
      margin-inline: 5%;

    }
  }
</style>