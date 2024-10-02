<template>
    <section id="addCustomer">
        <b-container fluid>
            <b-form id="form" class="p-4" @submit="addCustomer">
                <h1 class="text-center mb-4"> <strong>Add customer</strong> </h1>
                <div class="row">
                    <b-form-group class="col-6 mb-4" label="Name" label-for="input-1">
                        <b-form-input :class="{'border-danger':error.name}" v-model="formCustomer.name" id="input-1"
                            type="text" placeholder="Mohammed bakhti" required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.name">The full name is incorrect</div>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" label="Gender" label-for="selectCategory">
                        <b-form-select :class="{'border-danger':error.gender}" v-model="formCustomer.gender"
                            class="w-100" id="select-product" :options="options" required>
                        </b-form-select>
                        <div class="text-danger" v-show="error.gender">Select gender</div>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" label="Contry" label-for="input-4">
                        <b-form-input :class="{'border-danger':error.contry}" v-model="formCustomer.contry" id="input-4"
                            type="text" placeholder="Morocco - Egypt ..." required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.contry">This expression is not incorrect</div>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" label="City" label-for="input-4">
                        <b-form-input :class="{'border-danger':error.city}" v-model="formCustomer.city" id="input-4"
                            type="text" placeholder="Morocco - Egypt ..." required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.city">This expression is incorrect</div>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" label="Adress" label-for="input-4">
                        <b-form-input :class="{'border-danger':error.adress}" v-model="formCustomer.adresse"
                            id="input-4" type="text" placeholder="Adress" required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.adress">This input is failed</div>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" label="Phone" label-for="input-1">
                        <b-form-input :class="{'border-danger':error.phone}" v-model="formCustomer.phone" id="input-1"
                            type="text" placeholder="06 55 22 88 55" required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.phone">"Please enter a valid number</div>
                    </b-form-group>

                    <b-form-group class="col mb-4" label="Gmail" label-for="input-1">
                        <b-form-input :class="{'border-danger':error.gmail}" v-model="formCustomer.gmail" id="input-1"
                            type="email" placeholder="exemple@gmail.com" required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.gmail">"Please enter a valid email address</div>
                    </b-form-group>

                    <b-button type="submit" class="mt-4 d-flex justify-content-center align-items-center gap-1 "
                        variant="primary" id="btn-addcutomer" @click="addCustomer">
                        <i class='bx bx-user-plus'></i> <span>Add Customer</span>
                    </b-button>
                    <b-button type="submit" class="mt-2 d-flex justify-content-center align-items-center gap-1 "
                        variant="outline-danger" id="btn-reset">
                        <i class='bx bx-reset'></i><span>Reset</span>
                    </b-button>


                </div>

            </b-form>
        </b-container>
      
    </section>
</template>

<script>
    import axios from 'axios';


    export default {
        name: "AddCustomer",
        data() {
            return {
                formCustomer: {
                    name: '',
                    gender: 'Choose gender',
                    contry: '',
                    city: '',
                    adresse: '',
                    phone: '',
                    gmail: '',
                    date: ''
                },
                options: [{
                        text: 'Choose gender',
                        disabled: true
                    },
                    {
                        value: 'Men',
                        text: 'Men'
                    },
                    {
                        value: 'Woman',
                        text: 'Woman'
                    },
                ],
                error: {
                    name: false,
                    contry: false,
                    city: false,
                    adress: false,
                    gmail: false,
                    gender: false,
                    phone: false
                },
                apiUrl:process.env.VUE_APP_API_URL
            }
        },


        methods: {

            calcDate() {

                let newdate = new Date();
                let year = newdate.getFullYear().toString()
                let month = (newdate.getMonth() + 1).toString()
                let day = newdate.getDate()
                let hour = newdate.getHours().toString()
                let munite = newdate.getMinutes().toString()
                let seconde = newdate.getSeconds().toString()

                this.formCustomer.date = `${year}-${month}-${day} ${hour}:${munite}:${seconde}`

            },


            addCustomer(event) {
                this.calcDate()

                event.preventDefault()
                this.validationName(), this.validationContry(), this.validationCity(), this
                    .validationGender(), this.validationAdresse(), this.validationPhone()
                if (this.error.adress === false && this.error.city === false && this.error.contry === false && this
                    .error.gender === false && this.error.gmail === false &&
                    this.error.name === false && this.error.phone === false) {
                    this.$store.dispatch('allCustomers/ac_addCustomer',{customer:this.formCustomer})
                    this.formCustomer.adresse = this.formCustomer.city = this.formCustomer.contry = this.formCustomer
                    .gender = this.formCustomer.gmail = this.formCustomer.name = this.formCustomer.phone = ''
                }
            },

            resetalue(event) {
                event.preventDefault()
                this.formCustomer.adresse = this.formCustomer.city = this.formCustomer.contry = this.formCustomer
                    .gender = this.formCustomer.gmail = this.formCustomer.name = this.formCustomer.phone = ''
            },

            validationName() {
                let regex = /^[a-zA-Z\s]*$/
                let valid = regex.test(this.formCustomer.name)
                valid === false || this.formCustomer.name === '' ? this.error.name = true : this.error.name = false
            },
            validationContry() {
                let regex = /^[a-zA-Z\s]*$/
                let valid = regex.test(this.formCustomer.contry)
                valid === false || this.formCustomer.contry === '' ? this.error.contry = true : this.error.contry =
                    false
            },
            validationCity() {
                let regex = /^[a-zA-Z\s]*$/
                let valid = regex.test(this.formCustomer.city)
                valid === false || this.formCustomer.city === '' ? this.error.city = true : this.error.city = false
            },
            validationGmail() {
                let regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
                let valid = regex.test(this.formCustomer.gmail)
                valid === false || this.formCustomer.gmail === '' ? this.error.gmail = true : this.error.gmail = false
            },
            validationPhone() {
                const regex = /^[0-9]{10}$/;
                let valid=regex.test(this.formCustomer.phone);
                valid===false || this.formCustomer.phone==='' ? this.error.phone=true : this.error.phone=false
            },
            validationGender() {
                this.formCustomer.gender === 'Choose gender' ? this.error.gender = true : this.error.gender = false
            },
            validationAdresse() {
                this.formCustomer.adresse === '' ? this.error.adress = true : this.error.adress = false
            },

            async createCustomer() {
                try {
                    const token = localStorage.getItem('token')
                    const responsive = await axios.post(`${this.apiUrl}/api/customers`,this.formCustomer, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    console.log(responsive.data.message)
                } catch (error) {
                    console.log('error is :', error)
                }
            },


        },

    }
</script>


<style scoped>
    #btn-addcutomer {
        background-color: var(--couleur-primaire-4);
        width: 98%;
        margin: auto;
    }

    #btn-reset {
        width: 98%;
        margin: auto;
    }

    #select-product {
        height: 37px;
        border-radius: 0.375rem;
    }

    #sb-quantity {
        height: 37px;
        border-radius: 0.375rem;
    }

    #form {
        background-color: var(--couleur-primaire-1);
        border-radius: 12px;
    }
</style>