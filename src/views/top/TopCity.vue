<template>
    <section id="top-city" class="p-4">
        <FilterGlobal @send-filter="getTypeFilter" />
        <!------  SHOW PRODUCTS :per-page="perPage" :current-page="currentPage" v-for="(product,index) in filterByAll "
                :key="product.id"  ------>
        <div id="all-products" class="mt-4 mt-md-0" v-for="(city,index) in filterCities " :key="city.id">
            <div id="product" class=" position-relative mb-4 ">
                <div id="classment" class="position-absolute">
                    <p>{{ index+1 }}</p>
                </div>
                <h6 id="name-city">
                    <i class='bx bx-trip'></i> <SPAN><strong>{{ city.name }}</strong></SPAN>
                </h6>
                <b-row id="row-statistics" class="gap-4 gap-md-0">
                    <b-col sm="4" class="d-flex flex-md-column justify-content-between gap-3">
                        <div class="d-flex flex-md-row flex-column flex-grow-1   gap-3">
                            <div id="icon-orders"><i class='bx bx-shopping-bag'></i></div>
                            <div>
                                <h6 id="number-statis"><strong>{{ city.Numberoforders }}</strong> </h6>
                                <p id="title-statistics">Orders</p>
                            </div>
                        </div>
                        <div class="d-flex flex-md-row flex-column flex-grow-1  gap-3">
                            <div id="icon-money"><i class='bx bx-money'></i></div>
                            <div>
                                <h6 id="number-statis"><strong> {{city.sales}} $</strong></h6>
                                <p id="title-statistics">Sales</p>
                            </div>
                        </div>
                    </b-col>

                    <b-col sm="4" class="d-flex flex-md-column justify-content-between gap-3">
                        <div class="d-flex flex-md-row flex-column flex-grow-1  gap-3">
                            <div id="icon-category"><i class='bx bx-store-alt'></i></div>
                            <div>
                                <h6 id="number-statis">
                                    <strong>{{city.TopCategoryOrders.number}}/{{city.TopCategoryOrders.category}}</strong>
                                </h6>
                                <p id="title-statistics">Top Category orders</p>
                            </div>
                        </div>
                        <div class="d-flex flex-md-row flex-column flex-grow-1  gap-3">
                            <div id="icon-category"><i class='bx bx-store-alt'></i></div>
                            <div>
                                <h6 id="number-statis"><strong>{{city.TopCategorySales.total}}
                                        $/{{city.TopCategorySales.category}}</strong> </h6>
                                <p id="title-statistics">Top Category Sales</p>
                            </div>
                        </div>
                    </b-col>

                    <b-col sm="4" class="d-flex flex-md-column justify-content-between gap-3">
                        <div class="d-flex flex-md-row flex-column flex-grow-1 gap-3 ">
                            <div id="icon-percentage"><i class='bx bx-pie-chart-alt-2'></i></div>
                            <div>
                                <h6 id="number-statis">
                                    <b-progress max="100">
                                        <b-progress-bar :value="city.percentageOr" :label="`${city.percentageOr}%`">
                                        </b-progress-bar>
                                    </b-progress>
                                </h6>
                                <p id="title-statistics">Percentage orders</p>
                            </div>
                        </div>
                        <div class="d-flex flex-md-row flex-column flex-grow-1  gap-3 ">
                            <div id="icon-percentage"><i class='bx bx-pie-chart-alt-2'></i></div>
                            <div>
                                <h6 id="number-statis">
                                    <b-progress max="100">
                                        <b-progress-bar :value="city.percentageSl" :label="`${city.percentageSl}%`">
                                        </b-progress-bar>
                                    </b-progress>
                                </h6>
                                <p id="title-statistics">Percentage Sales</p>
                            </div>
                        </div>
                    </b-col>

                </b-row>
            </div>
        </div>

        <!-- <b-pagination v-model="currentPage" :total-rows="productsFilter.length" :per-page="perPage"
            aria-controls="product">
        </b-pagination> -->
    </section>
</template>

<script>
    import FilterGlobal from '@/components/FilterGlobal.vue'
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'TopCity',
        components: {
            FilterGlobal
        },
        data() {
            return {
                perPage: 3,
                currentPage: 1,
                filter: ''
            }
        },

        watch: {
            filter(newval, old) {
                console.log(`new val ${JSON.stringify(newval)} and old val is ${JSON.stringify(old)}`)
            }
        },

        computed: {

            // STORE ALL ORDERS
            ...mapState('allOrders', {
                allOrders: state => state.orders
            }),

            // ORDERS MONTH SELECTED
            getOrdersMonth() {
                let orders = ''
                if (this.filter) {
                    orders = this.allOrders.filter(ele => Number(ele.date.split('-')[1]) === this.filter.month)
                } else {
                    orders = this.allOrders.filter(ele => Number(ele.date.split('-')[1]) === new Date().getMonth() + 1)
                }

                return orders
            },

            // NAMES CITY
            namesCity() {
                let city = this.allOrders.map(ele => ele.customer.city)
                city = [...new Set(city)]
                return city
            },

            // FILTER BY 'All'
            createObjCity() {
                let products = this.namesCity
                    .map(ele => {
                        const name = ele
                        const filterOrders = this.getOrdersMonth.filter(order => order.customer.city === ele)
                        const Numberoforders = filterOrders.length
                        const sales = filterOrders.reduce((accu, order) => accu + order.total, 0)
                        const percentageOr = Math.round(Numberoforders / this.getOrdersMonth.length * 100)
                        const percentageSl = Math.round(sales / this.getOrdersMonth.reduce((accu, order) => accu +
                            order.total, 0) * 100)
                        const TopCategoryOrders = this.TopCategoryOrders(ele)
                        const TopCategorySales = this.TopCategorySales(ele)
                        return {
                            name,
                            Numberoforders,
                            sales,
                            percentageOr,
                            percentageSl,
                            TopCategoryOrders,
                            TopCategorySales
                        }
                    })
                return products
            },

            filterCities() {
                let cities = ''
                if (!this.filter || this.filter.type === 'All') {
                    cities = this.createObjCity
                } else if (this.filter.type === 'Orders') {
                    cities = this.createObjCity
                        .filter(ele => ele.Numberoforders >= this.filter.sort.min && ele.Numberoforders <= this.filter
                            .sort.max)
                        .sort((a, b) => b.percentageOr - a.percentageOr)

                } else if (this.filter.type === 'Sales') {
                    cities = this.createObjCity
                        .filter(ele => ele.sales >= this.filter.sort.min && ele.sales <= this.filter.sort.max)
                        .sort((a, b) => b.percentageSl - a.percentageSl)

                }
                return cities
            },

            showOrders() {
                let showPer = false
                if (!this.filter || this.filter.type === 'All' || this.filter.type === 'Orders') {
                    showPer = true
                }
                return showPer
            },

            showSales() {
                let showPer = false
                if (!this.filter || this.filter.type === 'All' || this.filter.type === 'Sales') {
                    showPer = true
                }
                return showPer
            },


        },


        methods: {
            getTypeFilter(payload) {
                console.log(payload)
                this.filter = payload
            },

            TopCategoryOrders(city) {
                let Namescategories = this.getOrdersMonth.filter(order => order.customer.city === city).map(order =>
                    order.product.category.name)
                let numberAnyctg = Namescategories.map(ctg => {
                        const number = Namescategories.filter(ele => ele === ctg).length
                        return {
                            category: ctg,
                            number
                        }
                    })
                    .sort((a, b) => b.number - a.number)
                return numberAnyctg[0]
            },

            TopCategorySales(city) {

                let Namescategories = this.getOrdersMonth.filter(order => order.customer.city === city)
                    .map(order => ({
                        category: order.product.category.name,
                        total: order.total
                    }))
                    .sort((a, b) => b.total - a.total)
                return Namescategories[0]

            },

            ...mapActions('allOrders', {
                fetchOrders: 'ac_getOrders'
            }),

        },

        mounted() {
            this.fetchOrders()

        }
    }
</script>






<style scoped lang="scss">
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        padding: 0px;
        margin: 0px;
    }


    /*ROW  FILTER*/
    #btn-numberfilter {
        background: #3c5df5;
        border: none;
        padding: 6px 13px;
        font-size: 13px;
    }

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


    /** PRODUCTS IN FILTER */

    #top-city {
        background-color: var(--couleur-primaire-1);


        #product {
            background-color: #1F1F51;
            border-radius: 10px;
            padding: 40px 40px;
            box-shadow: 2px 10px 37px 0px rgba(0, 0, 0, 0.36);
            -webkit-box-shadow: 2px 10px 37px 0px rgba(0, 0, 0, 0.36);
            -moz-box-shadow: 2px 10px 37px 0px rgba(0, 0, 0, 0.36);

            #classment {
                background: #058F4D;
                width: fit-content;
                padding: 5px 15px;
                border-radius: 4px;
                top: -16px;
            }

            #name-city {
                margin-bottom: 32px;
                display: flex;
                gap: 5px;
            }

            #name-city::after {
                content: "";
                content: "";
                background-color: white;
                width: -webkit-fill-available;
                height: 2px;
                margin-bottom: 3px;
                align-self: end;
                margin-left: 14px;

            }

            #row-statistics {
                #icon-money {
                    background: rgba(33, 150, 83, 0.1);
                    color: #219653;
                    padding: 11px;
                    border-radius: 13px;
                    height: 45px;
                    width: 45px;

                    .bx {
                        font-size: 22px;
                    }

                }

                #icon-orders {
                    background: rgba(155, 81, 224, 0.1);
                    color: #9b51e0;
                    padding: 11px;
                    border-radius: 13px;
                    height: 45px;
                    width: 45px;              

                    .bx {
                        font-size: 22px;
                    }

                }

                #icon-category {
                    background: rgba(54, 92, 245, 0.1);
                    color: #365CF5;
                    padding: 11px;
                    border-radius: 13px;
                    height: 45px;
                    width: 45px;

                    .bx {
                        font-size: 22px;
                    }

                }

                #icon-percentage {
                    background: rgba(242, 153, 74, 0.1);
                    color: #f2994a;
                    padding: 11px;
                    border-radius: 13px;
                    height: 45px;
                    width: 45px;

                    .bx {
                        font-size: 22px;
                    }

                }

                #number-statis {
                    margin-bottom: 2px;
                    letter-spacing: 1px;
                }

                #title-statistics {
                    font-size: 14px;
                    color: #95A4E0;
                }


            }
        }

    }

    /* Style for phone (less than de 767.98px) */
    @media screen and (max-width: 767.98px) {


        #top-city #product {
            padding: 15px 15px;
        }
    }
</style>