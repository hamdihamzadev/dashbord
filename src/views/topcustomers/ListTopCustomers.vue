<template>
    <section>

        <div class="customer d-flex justify-content-between align-items-center  mb-3 "
            v-for=" (item,index) in customersInfilter" :key="item.id" @click="toggleActive(index,item)"
            :style="styleActive(index)">
            <!-- laptop -->
            <div class="d-none d-md-block  position-absolute" id="classment-color"
                :style="backgroundClassmentLst(index)">
                <p class="d-md-none" id="classment-number-phone">{{ `${index+1}` }}</p>
            </div>
            <!-- phone -->
            <div class=" d-md-none position-absolute d-flex justify-content-center align-items-center "
                id="classment-color-phone" :style="backgroundClassmentLst(index)">
                <p>{{ `${index+1}` }}</p>
            </div>
            <div class="d-flex  align-items-center gap-2">
                <b-icon icon="person" aria-hidden="true"></b-icon>
                <p>{{ item.name }}</p>
            </div>
            <div class="d-flex  align-items-center gap-2">
                <b-icon icon="telephone" aria-hidden="true"></b-icon>
                <p>0{{ item.phone }}</p>
            </div>
            <div class="d-flex  align-items-center gap-2">
                <b-icon icon="pin-map" aria-hidden="true"></b-icon>
                <p>{{ item.city }}</p>
            </div>
            <p class="d-none d-md-block">{{ `${index+1}` }}</p>
        </div>


    </section>
</template>

<script>
    import axios from 'axios'
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'ListTopCustomers',
        props: ['customers'],
        data() {
            return {
                activeIndex: '',
                ordersCustomer: '',
                ordersDelivred: '',
                apiUrl: process.env.VUE_APP_API_URL


            }
        },

        // get all customers in table top

        computed: {
            ...mapState('allCustomers', {
                Allcustomers: state => state.customers
                    .map(ele => {
                        return {
                            id: ele._id,
                            name: ele.name,
                            city: ele.city,
                            phone: ele.phone
                        }
                    })
            }),
            customersInfilter() {
                let reslt = ''
                if (this.customers) {
                    reslt = this.customers
                } else {
                    reslt = this.Allcustomers
                }
                return reslt
            }
        },

        methods: {


            // TOGGLE ACTIVE
            async toggleActive(index, item) {
                this.activeIndex = index

                // preparing customer objet
                await this.getOrdersCustomer(item.id)
                console.log(this.ordersCustomer)

                const customerSelected = {
                    name: item.name,
                    classment: 1 + index,
                    orders: this.ordersCustomer.map(ele => {
                        const obj = {}
                        obj.namePrd = ele.product.name
                        obj.imagePrd = ele.product.image
                        obj.category = ele.product.category.name
                        obj.quantity = ele.quantity
                        obj.total = ele.total
                        return obj
                    })
                }
                this.$emit('send-Customer', {
                    customer: customerSelected
                })


            },


            styleActive(index) {
                if (this.activeIndex === index) {
                    return {
                        backgroundColor: '#242460',
                        border: '1px solid rgb(54, 92, 245)',
                        boxShadow: 'rgb(54 92 245 / 44%) 1px 8px 20px -2px'
                    }
                }
            },

            backgroundClassmentLst(index) {
                let classment = index + 1
                if (classment >= 1 && classment <= 10) {
                    return 'backgroundColor:#219653';
                } else if (classment >= 11 && classment <= 30) {
                    return 'backgroundColor:#08459e';
                } else if (classment >= 30 && classment <= 80) {
                    return 'backgroundColor:#9f7804';
                } else {
                    return 'backgroundColor:#cf1616';
                }
            },

            async getOrdersCustomer(id) {
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.get(`${this.apiUrl}/api/orders/customers/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    this.ordersCustomer = response.data.orders


                } catch (error) {
                    console.log(`error in get orders customer is ${error}`)
                }
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

<style scoped>
    /**customer */

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

    .customer {
        background-color: var(--couleur-primaire-5);
        padding: 13px 24px;
        border-radius: 9px;
        position: relative;
        cursor: pointer;
    }

    .customer:hover {
        background-color: var(--couleur-primaire-6);

    }

    .customer .active {
        background-color: var(--couleur-primaire-6);
    }


    #classment-color {
        width: 10px;
        height: -webkit-fill-available;
        left: 0;
        border-radius: 50px;
    }

    .customer div {
        flex: 1;
    }

    .customer p {
        flex: 0;
    }


    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
        .customer {
            font-size: 12px;
        }

        #classment-number-phone {
            width: 20px;
        }

        #classment-color-phone {
            width: 20px;
            height: -webkit-fill-available;
            left: 0;
            border-radius: 50px;

        }


    }
</style>