<template>
    <b-row>
        <b-col lg="5"><img src="../assets/Rectangle 56.png" alt="" class="vh-100 w-100 d-none d-lg-block "></b-col>
        <b-col lg="7" class="d-flex flex-column justify-content-center vh-100">
            <div class="text-center">
                <strong id="welcome">Create Your Account Today !</strong>
                <p id="subtitle-welcome">Join us now to unlock exclusive benefits and personalized experiences</p>
            </div>

            <b-form @submit.prevent="signup" id="form-login">

                <div class="row">

                    <b-form-group class="col-6">
                        <label id="custom-labelel">Full Name</label>
                        <b-form-input id="Name" v-model="form.fullName" type="text" required>
                        </b-form-input>

                    </b-form-group>

                    <b-form-group class="col-6">
                        <label id="custom-labelel">Age</label>
                        <b-form-input id="Age" v-model="form.age" type="number" required>
                        </b-form-input>

                    </b-form-group>
                </div>

                <label id="custom-labelel">Email</label>
                <b-form-group>
                    <b-form-input id="email" v-model="form.email" type="email" required></b-form-input>

                </b-form-group>

                <label id="custom-labelel">Password</label>
                <b-form-group>
                    <b-form-input type="password" id="password" v-model="form.password" required></b-form-input>

                </b-form-group>

                <b-button type="submit" variant="light" class="fw-bold w-100" id="button">Create account</b-button>
                <p class="text-center mt-3">Already have an account? <a href="" @click="login">Sign in</a></p>

            </b-form>
        </b-col>
    </b-row>


</template>

<script>
    import axios from 'axios';
    export default {
        name: 'SignUp',
        data() {
            return {
                form: {
                    fullName: '',
                    age: '',
                    email: '',
                    password: '',
                    apiUrl:process.env.VUE_APP_API_URL

                }
            }
        },

        methods: {
            async signup() {
                try {
                    await axios.post(`${this.apiUrl}/api/signup`, this.form)
                    this.$router.push('/Login')
                } catch (error) {
                    console.log('error is ', error)
                }
            },

            login() {
                this.$router.push('/Login')
            }
        },

        mounted() {
            let token = localStorage.getItem('token')
            if (token) {
                this.$router.push('/Dashbord')
            }
        }

    }
</script>


<style scoped>
    #welcome {
        font-size: 22px;
    }

    #subtitle-welcome {
        font-size: 14px;
        color: #969696;
        margin-top: 4px;
    }

    #logo {
        position: absolute;
        top: 41px;
        transform: translate(167%, 66%);
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
        margin-bottom: 7px;
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

        #form-login {
            margin-inline: 5%;

        }
    }
</style>