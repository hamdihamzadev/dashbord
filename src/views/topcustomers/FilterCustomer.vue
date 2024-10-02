<template>
    <section>
        <!-- filter -->
        <b-row>
            <b-col class="p-0">
                <b-button @click="showModal" id="btn-filter" class="mb-4 ">
                    <b-icon icon="filter" aria-hidden="true"></b-icon>Filter
                </b-button>
            </b-col>
        </b-row>

        <b-modal id="modalFilter" title="Choose your filter">

            <b-row class="gap-4">
                <b-col sm="12">
                    <label for="" class="mb-2">Month :</label>
                    <b-dropdown variant="primary" class="w-100" id="dropMonth">
                        <template #button-content>
                            <b-icon icon="calendar-date" aria-hidden="true"></b-icon> {{ MonthSelecte }}
                        </template>
                        <b-dropdown-group class="w-100">
                            <b-dropdown-item-button class="w-100" @click="sendMonth(month)" v-for="month in allMonths"
                                :key="month.id">
                                {{ month }}
                            </b-dropdown-item-button>
                        </b-dropdown-group>
                    </b-dropdown>
                </b-col>

                <!-- type filter -->
                <b-col sm="12" class=" d-flex flex-column">

                    <label for="" class="mb-2">Type :</label>
                    <b-dropdown variant="primary" class="w-100" id="dropTypeFilter">
                        <template #button-content>
                            <b-icon :icon="IcontypeFilter" aria-hidden="true" id="icon-bag"></b-icon>
                            {{ filterSelcted }}
                        </template>
                        <b-dropdown-group>
                            <b-dropdown-item-button @click="choosetypeFilter(item)" v-for="item in typefilter"
                                :key="item.id">
                                {{ item }}
                            </b-dropdown-item-button>
                        </b-dropdown-group>
                    </b-dropdown>

                </b-col>

                <!-- sort filter -->
                <b-col sm="12" v-show="filterSelcted!=='All'" >

                    <label for="" class="mb-2">Sort :</label>
                    <b-row>
                        <b-col id="cont-min">
                            <b-form-checkbox v-model="checkedMin" name="check-button" switch></b-form-checkbox>
                            <label for="sb-inline" id="labelMinMax" class="custom-padding ">Min</label>
                            <b-form-spinbutton id="sb-inline" class="custom-padding" v-model="valueMin"
                                :disabled="!checkedMin" :min="0" :max="800000" inline>
                            </b-form-spinbutton>
                        </b-col>
                        <b-col>

                            <b-form-checkbox v-model="checkedMax" name="check-button" switch></b-form-checkbox>
                            <label for="sb-inline" id="labelMinMax" class="custom-padding ">Max </label>
                            <b-form-spinbutton id="sb-inline" class="custom-padding" v-model="valueMax"
                                :disabled="!checkedMax " :min="0" :max="800000" inline>
                            </b-form-spinbutton>
                        </b-col>
                    </b-row>

                </b-col>
            </b-row>
            <template #modal-footer>
                <b-button variant="secondary" @click="hideModal">Cancel</b-button>
                <b-button variant="primary" @click="sendFilter()">Filter</b-button>
            </template>



        </b-modal>

    </section>
</template>


<script>
    import axios from 'axios';
    export default {
        name: 'FilterCustomer',
        data() {
            return {
                typefilter: ['All', 'Orders', 'Sales'],
                allMonths: [

                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'

                ],
                filterSelcted: 'All',
                MonthSelecte: '',
                Allorders: '',
                ordersAllCustomers: '',
                isDisabled: true,
                checkedMin: true,
                checkedMax: true,
                valueMin: 0,
                valueMax: 0,
                resultFilterByOrders: '',
                resultFilterBySales: '',
                apiUrl:process.env.VUE_APP_API_URL

            }
        },

        computed: {


            IcontypeFilter() {
                if (this.filterSelcted === 'Orders') {
                    return 'bag'
                } else {
                    return 'cash-stack'
                }
            },

            customersFilter() {
                let reslt = ''
                if (this.filterSelcted === 'Orders') {
                    reslt = this.resultFilterByOrders.map(ele => ele.customer)
                } else if (this.filterSelcted === 'Sales') {
                    reslt = this.resultFilterBySales.map(ele => ele.customer)
                } else if (this.filterSelcted === 'All') {
                    reslt = this.AllCustomers
                }
                return reslt
            },



        },

        methods: {

            showModal() {
                this.inFilter = !this.inFilter
                this.selectCurrentMonth()
                this.$bvModal.show('modalFilter')
            },

            hideModal() {
                this.$bvModal.hide('modalFilter')
            },

            sendMonth(month) {
                this.MonthSelecte = month
            },

            selectCurrentMonth() {
                let newdate = new Date()
                let month = this.allMonths[(newdate.getMonth()).toString()]
                this.MonthSelecte = month
            },

            choosesortFilter(item) {
                this.sortSelected = item
            },

            choosetypeFilter(type) {
                this.filterSelcted = type
            },

            sendFilter() {

                this.valueMin = this.checkedMin === false ? 0 : this.valueMin
                this.valueMax = this.checkedMax === false ? Infinity : this.valueMax
                this.GetfilterByOredrs()
                this.GetfilterBySales()
                this.hideModal()
                this.$emit('send-customersfilter', {
                    customersFilter: this.customersFilter
                })


            },

            GetfilterByOredrs() {

                this.resultFilterByOrders = this.ordersAllCustomers.filter(ele => {
                    return ele.orders.length >= this.valueMin && ele.orders.length <= this.valueMax
                })

            },

            GetfilterBySales() {

                const tolasales = this.ordersAllCustomers.filter(ele => {
                    const sales = ele.orders.reduce((acc, order) => acc + order.total, 0)
                    return sales >= this.valueMin && sales <= this.valueMax
                })

                this.resultFilterBySales = tolasales

            },

            async getOrdersForAnyCustomer() {
                try {
                    let month = this.allMonths.indexOf(this.MonthSelecte) + 1
                    const token = localStorage.getItem('token')
                    const response = await axios.get(`${this.apiUrl}/api/getOrdersAllCustomer/${month}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                    this.ordersAllCustomers = response.data.orderscustomers

                } catch (error) {
                    console.log(`error is : ${error}`)
                }
            },


        },

        mounted() {
            this.selectCurrentMonth()
            this.getOrdersForAnyCustomer()
    
        }

    }
</script>

<style scoped lang="scss">
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        padding: 0px;
        margin: 0px;
    }

    #statistics {

        padding: 43px 30px;
        border-radius: 18px;
    }

    /* FILTER BY NUMBER */
    #container-form {
        background: #eaeaea;
        margin-top: 11px;
        padding: 10px 18px;
        width: 300px;
        border-radius: 8px;
        box-shadow: 0px 15px 63px 14px rgba(0, 0, 0, 0.33);
        -webkit-box-shadow: 0px 15px 63px 14px rgba(0, 0, 0, 0.33);
        -moz-box-shadow: 0px 15px 63px 14px rgba(0, 0, 0, 0.33);
    }

    #container-bag {
        width: 27%;
        border-radius: 0.375rem 0 0 0.375rem;
        border-color: #6c757d;
        background-color: #3a5aec;
        color: white;
    }

    #icon-bag {
        font-size: 22px;

    }


    #list-topcategorie {
        color: #95A4E0
    }

    #classment-color {
        width: 10px;
        height: 100%;
        left: 0px;
        border-radius: 9px;
    }


    #dropMonth :last-child,
    #dropTypeFilter {
        width: inherit;
    }


    #dropTypeFilter:last-child {
        width: inherit;
    }

    #labelMinMax {
        background-color: #3a5aec;
        color: white;
        border-radius: 0.375rem;
        margin-right: 4px;
    }

    .custom-padding {
        padding: 10px;
    }

    #btn-filter{
        background-color:var(--couleur-primaire-4);
        border: none;
    }


    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
        #btn-filter {
            position: fixed;
            bottom: 0;
            width: 87%;
            left: 50%;
            right: 50%;
            transform: translate(-50%, -50%) translate(0px, 10px);
            background-color:var(--couleur-primaire-4);
            border: none;
        }

    }
</style>