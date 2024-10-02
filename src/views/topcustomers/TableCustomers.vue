<template>
    <section >
        <div id="table-customer" class="d-none d-md-block">
            <div class="d-flex flex-column " id="container-table-customer">

                <div class="d-flex justify-content-between align-items-center mb-5">
                    <p id="name-customer"> {{customer===""?'Name':customer.name }} </p>
                    <div id="container-classment" :style="backgroundClassmentTable">
                        <p>{{ customer === "" ? 0: customer.classment }}</p>
                    </div>
                </div>


                <div>
                    <div id="container-statistics" class="d-flex justify-content-between align-items-center  py-2">
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <div id="container-iconRevenue">
                                <i class="bx bx-money"></i>
                            </div>
                            <div>
                                <p id="title-statistics-Revenue">Sales </p>
                                <p id="subtitle-statistics">Sales management</p>
                            </div>

                        </div>
                        <p id="result-statistics">{{ sales }} $</p>
                        <hr class="position-absolute">
                    </div>
                    <hr>
                </div>


                <div>
                    <div id="container-statistics" class="d-flex justify-content-between align-items-center  py-2">
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <div id="container-iconOrders">
                                <i class='bx bx-package'></i>
                            </div>
                            <div>
                                <p id="title-statistics-Orders">Orders </p>
                                <p id="subtitle-statistics">All Orders Operations</p>
                            </div>
                        </div>
                        <p id="result-statistics">{{ NumbersOrders }}</p>
                    </div>
                    <hr>
                </div>


                <div>
                    <div id="container-statistics" class="d-flex justify-content-between align-items-center  py-2">
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <div id="container-iconCategories">
                                <i class='bx bx-pie-chart'></i>
                            </div>
                            <div>
                                <p id="title-statistics-Categories">Categories</p>
                                <p id="subtitle-statistics">Top Purchased Categories</p>
                            </div>
                        </div>
                        <p id="result-statistics" v-b-toggle.collapse-category>
                            ({{ topCategories==='0'?'0':topCategories.length }})
                            Categories
                            <i class='bx bx-chevron-down'></i>
                        </p>

                    </div>
                    <b-collapse id="collapse-category" class="mt-4 ">
                        <p id="list-topcategorie" class="d-flex justify-content-between py-2 "
                            v-for="item in topCategories" :key="item.id">
                            {{ item.name }} <span>{{ item.orders }} Orders</span> </p>

                    </b-collapse>
                    <hr>
                </div>


                <div>
                    <div id="container-statistics" class="d-flex justify-content-between align-items-center  py-2">
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <div id="container-iconProducts">
                                <i class='bx bx-shopping-bag'></i>
                            </div>
                            <div>
                                <p id="title-statistics-Products">Products </p>
                                <p id="subtitle-statistics">Top Purchased Products</p>
                            </div>
                        </div>
                        <p id="result-statistics" v-b-toggle.collapse-products>
                            ({{ topProducts===''?"0":topProducts.length }})
                            Products
                            <i class='bx bx-chevron-down'></i></p>
                    </div>
                    <b-collapse id="collapse-products" class="mt-4 ">
                        <p id="list-topcategorie" class="d-flex justify-content-between py-2 "
                            v-for="item in topProducts" :key="item.id">
                            <img id="image-product" :src="item.image" alt="" srcset=""> {{ item.name }}
                            <span>{{ item.numberOfOrders }} Orders</span>
                        </p>

                    </b-collapse>
                    <hr>
                </div>
            </div>
        </div>
        <!-- MODAL FOR PHONE -->
        <b-modal modal-class="custom-modal-bg" content-class="shadow" id="modaltablephone" title="Client Statistics"
            hide-footer>
            <div class="d-flex  flex-column " id="container-table-customer">

                <div class="d-flex justify-content-between align-items-center mb-5">
                    <p id="name-customer"> {{customer===""?'Name':customer.name }} </p>
                    <div id="container-classment" :style="backgroundClassmentTable">
                        <p>{{ customer === "" ? 0: customer.classment }}</p>
                    </div>
                </div>


                <div>
                    <div id="container-statistics" class="d-flex justify-content-between align-items-center  py-2">
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <div id="container-iconRevenue">
                                <i class="bx bx-money"></i>
                            </div>
                            <div>
                                <p id="title-statistics-Revenue">Sales </p>
                                <p id="subtitle-statistics">Sales management</p>
                            </div>

                        </div>
                        <p id="result-statistics">{{ sales }} $</p>
                        <hr class="position-absolute">
                    </div>
                    <hr>
                </div>


                <div>
                    <div id="container-statistics" class="d-flex justify-content-between align-items-center  py-2">
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <div id="container-iconOrders">
                                <i class='bx bx-package'></i>
                            </div>
                            <div>
                                <p id="title-statistics-Orders">Orders </p>
                                <p id="subtitle-statistics">All Orders Operations</p>
                            </div>
                        </div>
                        <p id="result-statistics">{{ NumbersOrders }}</p>
                    </div>
                    <hr>
                </div>


                <div>
                    <div id="container-statistics" class="d-flex justify-content-between align-items-center  py-2">
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <div id="container-iconCategories">
                                <i class='bx bx-pie-chart'></i>
                            </div>
                            <div>
                                <p id="title-statistics-Categories">Categories</p>
                                <p id="subtitle-statistics">Top Purchased Categories</p>
                            </div>
                        </div>
                        <p id="result-statistics" v-b-toggle.collapse-category>
                            ({{ topCategories==='0'?'0':topCategories.length }})
                            Categories
                            <i class='bx bx-chevron-down'></i>
                        </p>

                    </div>
                    <b-collapse id="collapse-category" class="mt-4 ">
                        <p id="list-topcategorie" class="d-flex justify-content-between py-2 "
                            v-for="item in topCategories" :key="item.id">
                            {{ item.name }} <span>{{ item.orders }} Orders</span> </p>

                    </b-collapse>
                    <hr>
                </div>


                <div>
                    <div id="container-statistics" class="d-flex justify-content-between align-items-center  py-2">
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <div id="container-iconProducts">
                                <i class='bx bx-shopping-bag'></i>
                            </div>
                            <div>
                                <p id="title-statistics-Products">Products </p>
                                <p id="subtitle-statistics">Top Purchased Products</p>
                            </div>
                        </div>
                        <p id="result-statistics" v-b-toggle.collapse-products>
                            ({{ topProducts===''?"0":topProducts.length }})
                            Products
                            <i class='bx bx-chevron-down'></i></p>
                    </div>
                    <b-collapse id="collapse-products" class="mt-4 ">
                        <p id="list-topcategorie" class="d-flex justify-content-between align-items-center py-2 "
                            v-for="item in topProducts" :key="item.id">
                            <img id="image-product" :src="item.image" alt="" srcset=""> {{ item.name }}
                            <span>{{ item.numberOfOrders }} Orders</span>
                        </p>

                    </b-collapse>
                    <hr>
                </div>
            </div>
        </b-modal>

    </section>
</template>

<script>
    export default {
        name: 'TableCustomers',
        props: ['customer'],

        data() {
            return {
                hello: "kaama",
                NumberOfCategories: '0'
            }
        },
        computed: {

            // TOP CATEGORIES
            topCategories() {
                let orders = '0'
                if (this.customer.orders) {
                    const names = orders = this.customer.orders.map(ele => ele.category)
                    const numberAnyCategory = names.map(ele => {
                        return {
                            name: ele,
                            orders: names.filter(ctg => ele === ctg).length
                        }
                    })
                    const uniqueCtg = numberAnyCategory.filter((ctg, index) => index === numberAnyCategory.findIndex(
                        ele => ele.name === ctg.name)).sort((a, b) => b.orders - a.orders)

                    return uniqueCtg

                } else {
                    return orders
                }
            },

            // TOP PRODUCTS 
            topProducts() {
                let Products = ''
                if (this.customer.orders) {
                    let products = this.customer.orders.map(order => {
                        return {
                            name: order.namePrd,
                            image: order.imagePrd
                        }
                    })

                    let filterProducts = products.map(prd => {
                        return {
                            name: prd.name,
                            numberOfOrders: products.filter(anyPrd => anyPrd.name === prd.name).length,
                            image: prd.image
                        }
                    })
                    const uniqueProduct = filterProducts.filter((ele, index) => index === filterProducts.findIndex(
                            product => product.name === ele.name))
                        .sort((a, b) => b.numberOfOrders - a.numberOfOrders)
                    return uniqueProduct


                } else {
                    return Products
                }


                // let uniqueProduct = filterProducts.filter((product, index) => {
                //     return index === filterProducts.findIndex(objPrd => objPrd.product === product.product)
                // })

                // uniqueProduct.sort((ctgA, ctgB) => ctgB.orders - ctgA.orders)
                // return {
                //     uniqueProduct
                // }
            },

            // COLOR BACK CLASSMENT
            backgroundClassmentTable() {

                if (this.customer.classment >= 1 && this.customer.classment <= 10) {
                    return 'backgroundColor:#219653';
                } else if (this.customer.classment >= 11 && this.customer.classment <= 30) {
                    return 'backgroundColor:#08459e';
                } else if (this.customer.classment >= 30 && this.customer.classment <= 80) {
                    return 'backgroundColor:#9f7804';
                } else {
                    return 'backgroundColor:#cf1616';
                }
            },

            // NUMBER OF ORDERS
            NumbersOrders() {
                let numberOrdes = '0'
                if (this.customer.orders) {
                    numberOrdes = this.customer.orders.length
                    return numberOrdes
                } else {
                    return numberOrdes
                }
            },

            // SALES
            sales() {
                let sales = '0'
                if (this.customer.orders) {
                    sales = this.customer.orders.map(ele => ele.total).reduce((accu, total) => accu + total, 0)
                    return sales
                } else {
                    return sales
                }
            },
            customerBySales() {
                let filterCustomers = []
                this.customers.forEach(customer => {
                    if (this.revenueCustomer(customer.orders).revenue >= this.numberFilter) {
                        let objCustomer = {
                            name: customer.name,
                            city: customer.city,
                            phone: customer.phone,
                            revenue: this.revenueCustomer(customer.orders).revenue,
                            orders: customer.orders.length,
                            topCategories: this.topCategories(customer.orders).uniqueCategory,
                            topProducts: this.topProducts(customer.orders).uniqueProduct
                        }
                        filterCustomers.push(objCustomer)
                    }
                })
                filterCustomers.sort((itemA, itemB) => itemB.revenue - itemA.revenue)
                return filterCustomers
            },

            customerByOrders() {
                let filterCustomers = []
                this.customers.forEach(customer => {
                    if (customer.orders.length >= this.numberFilter) {
                        let objCustomer = {
                            name: customer.name,
                            city: customer.city,
                            phone: customer.phone,
                            revenue: this.revenueCustomer(customer.orders).revenue,
                            orders: customer.orders.length,
                            topCategories: this.topCategories(customer.orders).uniqueCategory,
                            topProducts: this.topProducts(customer.orders).uniqueProduct
                        }
                        filterCustomers.push(objCustomer)
                    }
                })

                filterCustomers.sort((itemA, itemB) => itemB.orders - itemA.orders)
                return filterCustomers
            },

        },

        methods: {
            openModalPhone() {
                if (window.innerWidth < 768) {
                    this.$bvModal.show('modaltablephone')
                } else {
                    return
                }

            }
        }
    }
</script>

<style scoped>
    #table-customer {
        width: 100%;
        background-color: var(--couleur-primaire-6);
        border-radius: 9px;
        border: 1px solid rgb(54, 92, 245);
        box-shadow: rgb(54 92 245 / 44%) 1px 8px 24px -2px;
        height: fit-content;
        position: sticky;
        top: 56px;
        right: 55px;


        #container-table-customer {
            padding: 18px 12px 43px;
        }


        #name-customer {
            font-size: 20px;
            font-weight: 500;
        }

        #container-classment {
            width: fit-content;
            padding: 5px 15px;
            border-radius: 4px;
        }

        /** Revenue */
        #container-iconRevenue {
            background: #f0be0e14;
            color: #F0BE0E;
            padding: 11px;
            border-radius: 7px;
            height: 43px;

            .bx {
                font-size: 19px;
            }
        }

        #title-statistics-Revenue {
            color: #F0BE0E;
        }

        /** Orders */
        #container-iconOrders {
            background: rgb(235 77 45 / 11%);
            color: #ef5211;
            padding: 11px;
            border-radius: 7px;
            height: 43px;

            .bx {
                font-size: 19px;
            }
        }

        #title-statistics-Orders {
            color: #ef5211;
        }

        /** Categories */
        #container-iconCategories {
            background: rgb(179 29 249 / 12%);
            color: #b31df9;
            padding: 11px;
            border-radius: 7px;
            height: 43px;

            .bx {
                font-size: 19px;
            }
        }

        #title-statistics-Categories {
            color: #b31df9;
        }

        /** Products */
        #container-iconProducts {
            background: rgb(35 249 111 / 7%);
            color: #1df96f;
            padding: 11px;
            border-radius: 7px;
            height: 43px;

            .bx {
                font-size: 19px;
            }
        }

        #title-statistics-Products {
            color: #1df96f;
        }


        #subtitle-statistics {
            font-size: 13px;
            font-weight: 100;
            color: #95A4E0;
        }


        #result-statistics {
            font-size: 19px;
            font-weight: 700;
            cursor: pointer;
        }

        #image-product {
            width: 6%;
            height: 6%
        }
    }

    #modaltablephone {
        display: none;
    }

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

    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {

        #modaltablephone .modal-dialog #modaltablephone___BV_modal_content_ #modaltablephone___BV_modal_body_ {
            background-color: #ef5211
        }

        #image-product {
            width: 20%;
        }

        #container-classment {
            background-color: rgb(33, 150, 83);
            color: white;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
        }

    }
</style>