<template>
    <div id="top-product" class="p-3">
        <!-- filter -->
        <FilterGlobal @send-filter="getFilter" />

        <!----- SHOW PRODUCTS -->

        <div id="products-filter" class="mt-4 mt-md-0">
            <div id="product" class="d-flex flex-column gap-5 " v-for="(product,index) in filterProduct"
                :key="product.id">
                <div class="d-flex justify-content-between align-items-center" id="row-1">
                    <div id="name" class="d-flex align-items-center gap-2">
                        <img :src="product.image" alt="" class="w-25 rounded">
                        <div>
                            <h5 class="mb-0" id="title-prd">{{product.name}}</h5>
                            <p class="mt-1 mb-0" id="category">{{ product.category }}</p>
                        </div>
                    </div>
                    <div id="classment">
                        <p class="mb-0">#{{index+1}}</p>
                    </div>
                </div>


                <div id="numbers-result" class="d-flex justify-content-between align-items-center gap-4">
                    <div>
                        <h5>{{ product.sales }} $</h5>
                        <p class="mb-0">Sales</p>
                    </div>
                    <div>
                        <h5>{{ product.orders }}</h5>
                        <p class="mb-0">Orders</p>
                    </div>
                    <div>
                        <h5>{{ product.quantity }}</h5>
                        <p class="mb-0">Quantity</p>
                    </div>
                </div>

                <div id="percentage" v-show="showPercentageOrders">
                    <p>percentage (Orders)</p>
                    <b-progress max="100">
                        <b-progress-bar :value="product.PercentageOr" :label="`${product.PercentageOr}%`">
                        </b-progress-bar>
                    </b-progress>
                </div>
                <div id="percentage" v-show="showPercentageSales">
                    <p>percentage (Sales)</p>
                    <b-progress max="100">
                        <b-progress-bar :value="product.PercentageSl" :label="`${product.PercentageSl}%`">
                        </b-progress-bar>
                    </b-progress>
                </div>
            </div>
        </div>




    </div>
</template>

<script>
    import FilterGlobal from '@/components/FilterGlobal.vue'
    import {
        mapState,
        mapActions
    } from 'vuex';

    export default {
        name: 'TopProduct',
        components: {
            FilterGlobal
        },

        data() {
            return {
                filter: ''
            }
        },

        computed: {

            // STORE ALL ORDERS
            ...mapState('allOrders', {
                allOrders: state => state.orders
            }),

            // STORE ALL PRODUCTS
            ...mapState('allProducts', {
                allProducts: state => state.Products
            }),

            showPercentageOrders() {
                let showPer = false
                if (!this.filter || this.filter.type === 'All' || this.filter.type === 'Orders') {
                    showPer = true
                }
                return showPer
            },

            showPercentageSales() {
                let showPer = false
                if (!this.filter || this.filter.type === 'All' || this.filter.type === 'Sales') {
                    showPer = true
                }
                return showPer
            },

            // Names products
            namesProducts() {
                let names = this.allProducts.map(ele => {
                    return {
                        name: ele.name,
                        id: ele._id,
                        category: ele.category.name,
                        image: ele.image
                    }
                })
                return names

            },

            // Orders month selected
            getOrdersMonth() {
                let orders = ''
                if (this.filter) {
                    orders = this.allOrders.filter(ele => Number(ele.date.split('-')[1]) === this.filter.month)
                } else {
                    orders = this.allOrders.filter(ele => Number(ele.date.split('-')[1]) === new Date().getMonth() + 1)
                }

                return orders
            },

            // filter by 'All'
            createObjProducts() {
                let products = this.namesProducts
                    .map(ele => {
                        const image = ele.image
                        const name = ele.name
                        const category = ele.category
                        const id = ele.id
                        const filterOrders = this.getOrdersMonth.filter(order => order.product._id === ele.id)
                        const sales = filterOrders.reduce((accu, order) => accu + order.total, 0)
                        const orders = filterOrders.length
                        const quantity = filterOrders.reduce((accu, order) => accu + order.quantity, 0)
                        const PercentageOr = Math.round(orders / this.getOrdersMonth.length * 100)
                        const PercentageSl = Math.round(sales / this.getOrdersMonth.reduce((accu, order) => accu +
                            order.total, 0) * 100)
                        return {
                            image,
                            name,
                            category,
                            id,
                            sales,
                            orders,
                            quantity,
                            PercentageOr,
                            PercentageSl
                        }
                    })
                return products
            },

            // Product about filter
            filterProduct() {
                let products = ''
                if (!this.filter || this.filter.type === 'All') {
                    products = this.createObjProducts
                } else if (this.filter.type === 'Orders') {
                    products = this.createObjProducts
                        .filter(ele => ele.orders >= this.filter.sort.min && ele.orders <= this.filter.sort.max)
                        .sort((a, b) => b.PercentageOr - a.PercentageOr)

                } else if (this.filter.type === 'Sales') {
                    products = this.createObjProducts
                        .filter(ele => ele.sales >= this.filter.sort.min && ele.sales <= this.filter.sort.max)
                        .sort((a, b) => b.PercentageSl - a.PercentageSl)

                }
                return products
            },

        },

        methods: {
            getFilter(payload) {
                this.filter = payload
            },

            QuatitySalesProduct(ordersTheProduct) {

                let quantityProduct = ordersTheProduct.reduce((accu, order) => accu + order.quantity, 0)
                let salesProduct = ordersTheProduct.reduce((accu, order) => accu + order.total, 0)
                return {
                    quantity: quantityProduct,
                    sales: salesProduct
                }
            },
            ...mapActions('allOrders', {
                fetchOrders: 'ac_getOrders'
            }),
            ...mapActions('allProducts', {
                fetchProducts: 'ac_getProducts'
            })

        },

        mounted() {
            this.fetchProducts()
            this.fetchOrders()

        }
    }
</script>

<style lang="scss" scoped>
    #top-product {
        background-color: var(--couleur-primaire-1)
    }

    #container-month {
        background: #3c5df5;
        padding-inline: 7px;
        height: 38px;
    }

    #select-mois {
        background: #3c5df5;
        color: white;
        border: none;
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

    #btn-numberfilter {
        background: #3c5df5;
        border: none;
        padding: 6px 13px;
        font-size: 13px;
    }

    #para-form {
        color: #3a5aec;
        font-weight: 700;
    }

    #type-filter {
        background: #3c5df5;
        border: none;
    }

    .custom-button {
        background: #3c5df5;
        border: none;
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

    /** SECTION SHOW PRODUCTSIN FILTER */
    #products-filter {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 23px;
    }

    #product {
        background: #1D1D43;
        padding: 25px;
        border-radius: 16px;
        margin-bottom: 4%;

        #row-1 {

            #name {
                #title-prd {
                    font-weight: bolder;
                    font-size: 20px;
                }

                #category {
                    font-size: 14px;
                    color: #95A4E0;

                }
            }

            #classment {
                background: #058F4D;
                color: white;
                padding: 6px 10px;
                border-radius: 4px;
                font-weight: 600;
            }


        }

        #numbers-result {
            div {
                h5 {
                    font-weight: 800;
                    margin-bottom: 0px;
                }

                p {
                    font-size: 13px;
                    margin-top: 2px;
                    color: #95A4E0;
                }
            }
        }

        #percentage {
            p {
                font-size: 13px;
                color: #95A4E0;
                margin-bottom: 5px;


            }
        }


    }

    
     /* Style for tablets (less than de 992px) */
  @media (max-width: 991.98px) {
    #products-filter {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 23px;
        }
  }

    /* Style for phone (less than de 767.98px) */
    @media screen and (max-width: 767.98px) {
        #products-filter {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 23px;
        }

    }
</style>