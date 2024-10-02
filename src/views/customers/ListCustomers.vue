<template>
    <section class="listecustomers">
        <b-container fluid>
            <h1 class="text-center fw-bolder mb-sm-4">List customers</h1>

            <b-row class="align-items-center justify-content-between">
                <!----- search category ----->
                <b-col sm="6">
                    <b-input-group size="sm">
                        <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search">
                        </b-form-input>
                    </b-input-group>
                </b-col>
                <!----- add category ----->
                <b-col sm="4">
                    <b-button class="d-flex justify-content-center align-items-center" variant="primary"
                        id="btn-addCustomer" @click="addCustomer">
                        <b-icon icon="plus" font-scale="2"></b-icon>Add category
                    </b-button>
                </b-col>

            </b-row>

            <!----- TABLE PRODUCT ----->
            <b-table responsive striped hover :items="Allcustomers" :filter="filter" :fields="fields" class="mt-2" sort-icon-left
                id="my-table">
                <!-- :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" -->
                <template #cell(Action)="data">
                    <select class="form-select" aria-label="Select an action"
                        @change="handleActionChange($event,data.item)">
                        <option selected>Choose...</option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                    </select>
                </template>
            </b-table>

            <!-- <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table">
            </b-pagination> -->


            <!---------- MODAL CUTOMER --------------->

            <b-modal id="modalcustomer" ref="modalcustomer" title="Edit  your customer">
                <b-form id="form" class="p-4" @submit="addCustomer">

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
                            <b-form-input :class="{'border-danger':error.contry}" v-model="formCustomer.contry"
                                id="input-4" type="text" placeholder="Morocco - Egypt ..." required>
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
                            <b-form-input :class="{'border-danger':error.phone}" v-model="formCustomer.phone"
                                id="input-1" type="number" placeholder="06 55 22 88 55" required>
                            </b-form-input>
                            <div class="text-danger" v-show="error.phone">"Please enter a valid number</div>
                        </b-form-group>

                        <b-form-group class="col mb-4" label="Gmail" label-for="input-1">
                            <b-form-input :class="{'border-danger':error.gmail}" v-model="formCustomer.gmail"
                                id="input-1" type="email" placeholder="exemple@gmail.com" required>
                            </b-form-input>
                            <div class="text-danger" v-show="error.gmail">"Please enter a valid email address</div>
                        </b-form-group>

                    </div>

                </b-form>
                <template #modal-footer>
                    <b-button variant="secondary" @click="hideModal">Cancel</b-button>
                    <b-button variant="primary" @click="editModal">Edit</b-button>
                </template>

            </b-modal>

        </b-container>

    </section>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex';

    export default {
        name: 'ListCustomers',
        data() {
            return {
                fields: [{
                        key: 'Name',
                        sortable: false
                    },
                    {
                        key: 'Gender',
                        sortable: false
                    },
                    {
                        key: 'Contry',
                        sortable: false
                    },
                    {
                        key: 'City',
                        sortable: false
                    },
                    {
                        key: 'Adresse',
                        sortable: false
                    },
                    {
                        key: 'Phone',
                        sortable: false
                    },
                    {
                        key: 'Gmail',
                        sortable: false
                    },
                    {
                        key: 'Date',
                        sortable: false
                    },
                    {
                        key: 'Action',
                        sortable: false
                    },

                ],
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
                error: {
                    name: false,
                    contry: false,
                    city: false,
                    adress: false,
                    gmail: false,
                    gender: false,
                    phone: false
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
                idCustomer: '',
                filter: null,
            }
        },

        computed: {
            ...mapState('allCustomers', {
                Allcustomers: state => state.customers
                .filter(ele => ele.isDeleted===false)
                .map(el => {
                    const obj = new Object
                    obj.Name = el.name
                    obj.Gender = el.gender
                    obj.Contry = el.contry
                    obj.City = el.city
                    obj.Adresse = el.adresse
                    obj.Phone = `0${el.phone}`
                    obj.Gmail = el.gmail
                    obj.Date = el.date
                    obj.id = el._id
                    return obj
                })
            })
        },

        methods: {

            addCustomer() {
                this.$router.push('/Customers/AddCustomer')
            },

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

            handleActionChange(ev, item) {

                const value = ev.target.value
                this.vl = value
                if (value === 'edit') {
                    this.$bvModal.show('modalcustomer')
                    this.formCustomer.adresse = item.Adresse
                    this.formCustomer.city = item.City
                    this.formCustomer.contry = item.Contry
                    this.formCustomer.date = item.Date
                    this.formCustomer.gender = item.Gender
                    this.formCustomer.gmail = item.Gmail
                    this.formCustomer.name = item.Name
                    this.formCustomer.phone = item.Phone
                    this.idCustomer = item.id
                } else if (value === 'delete') {
                    const userConfirmed = window.confirm("Do you really want to delete this customer ?");
                    if (userConfirmed) {
                        this.$store.dispatch('allCustomers/ac_deleteCustomer', item.id)
                    }
                }

            },

            hideModal() {
                this.$bvModal.hide('modalcustomer')
            },

            editModal(event) {
                this.calcDate()
                event.preventDefault()
                this.validationName(), this.validationContry(), this.validationCity(), this
                    .validationGender(), this.validationAdresse(), this.validationPhone()
                if (this.error.adress === false && this.error.city === false && this.error.contry === false && this
                    .error.gender === false && this.error.gmail === false &&
                    this.error.name === false && this.error.phone === false) {
                    this.$store.dispatch('allCustomers/ac_updatCustomer', {
                        customer: this.formCustomer,
                        id: this.idCustomer
                    })
                    this.hideModal()
                }
            },


            validationName() {
                let regex = /^[a-zA-Z\s]*$/
                let valid = regex.test(this.formCustomer.name)
                valid === false || this.formCustomer.name === '' ? this.error.name = true : this.error.name = false
            },
            validationContry() {
                let regex = /^[a-zA-Z\s]*$/
                let valid = regex.test(this.contry)
                valid === false || this.formCustomer.contry === '' ? this.error.contry = true : this.error.contry =
                    false
            },
            validationCity() {
                let regex = /^[a-zA-Z\s]*$/
                let valid = regex.test(this.city)
                valid === false || this.formCustomer.city === '' ? this.error.city = true : this.error.city = false
            },
            validationGmail() {
                let regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
                let valid = regex.test(this.gmail)
                valid === false || this.formCustomer.gmail === '' ? this.error.gmail = true : this.error.gmail = false
            },
            validationPhone() {
                this.formCustomer.phone === '' ? this.error.phone = true : this.error.phone = false
            },
            validationGender() {
                this.formCustomer.gender === 'Choose gender' ? this.error.gender = true : this.error.gender = false
            },
            validationAdresse() {
                this.formCustomer.adresse === '' ? this.error.adress = true : this.error.adress = false
            },

            ...mapActions('allCustomers', {
                fetchCustomers: 'ac_getCustomers'
            }),

        },
        mounted() {
            this.fetchCustomers()
        }
    }
</script>

<style>
    .btn-style {
        height: -webkit-fill-available;
        border-radius: 0px 3px 3px 0px;
        background: #365cf5;
        border: none;
        color: white;
        opacity: inherit;
    }


    #btn-addCustomer {
        width: 100%;
    }

    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
        #btn-addCustomer {
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%, -50%) translate(0px, 10px);
            width: 95%;
        }
    }
</style>