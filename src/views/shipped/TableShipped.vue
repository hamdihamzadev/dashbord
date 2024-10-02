<template>
    <div class="table-shipped">
        <TableGlobal :orders="ordersShipped" :status="status" :fields="fields" :date-filter-orders="date" />
    </div>
</template>

<script>
    import TableGlobal from '@/components/TableGlobal.vue'
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'TableShipped',
        props: ['date'],
        components: {
            TableGlobal,

        },

        data() {
            return {
                fields: [{
                        key: 'Customer',
                        sortable: false
                    },
                    {
                        key: 'Phone',
                        sortable: false
                    },

                    {
                        key: 'City',
                        sortable: false
                    },
                    {
                        key: 'Adress',
                        sortable: false
                    },
                    {
                        key: 'Product',
                        sortable: false
                    },
                    {
                        key: 'Price',
                        sortable: false
                    },
                    {
                        key: 'Quantity',
                        sortable: false
                    },
                    {
                        key: 'Total',
                        sortable: false
                    },
                    {
                        key: 'Date',
                        sortable: false
                    },
                    {
                        key: 'Status',
                        sortable: false
                    },
                    {
                        key: 'Action',
                        sortable: false
                    }
                ],
                status: [

                    {
                        value: 'Delivered',
                        text: 'Delivered'
                    },

                    {
                        value: 'Return',
                        text: 'Return'
                    },

                    {
                        value: 'Not treat',
                        text: 'Not treat'
                    },

                ],
            
            }
        },

        computed: {
            // STORE ALL ORDERS
            ...mapState('allOrders', {
                ordersShipped: state => state.orders
                .filter(ele => ele.statussuivi === 'Shipped')
                .map(ele => {
                    const objOrder = new Object
                    objOrder.Customer = ele.customer.name
                    objOrder.Phone = `0${ele.customer.phone}`
                    objOrder.City = ele.customer.city
                    objOrder.Adress = ele.customer.adresse
                    objOrder.productId = ele.product._id
                    objOrder.Product = ele.product.name
                    objOrder.Price = ele.product.price
                    objOrder.Quantity = ele.quantity
                    objOrder.Total = ele.total
                    objOrder.Date = ele.date
                    objOrder.Status = ele.statustable
                    objOrder.id = ele._id
                    return objOrder
                })
            }),

        },

        methods: {
            ...mapActions('allOrders', {
                fetchOrders: 'ac_getOrders'
            })
        },


        mounted() {
            this.fetchOrders()
        }

    }
</script>



<style scoped lang="scss">
    .popup {
        width: 22%;
        border-radius: 11px;
        height: 149px;
        left: 38%;
        background-color: #000000;
        position: fixed;
        top: 32%;
        text-align: justify;
        padding: 30px;
        transition: 0.3s;

        .title {
            font-size: 21px;
            margin-bottom: 14px;
        }

        .input input {
            border: 1px solid #3F4053;
            background-color: transparent;
            position: relative;
            height: 47px;
            width: 88%;
            padding-left: 21px;
            color: white;
            transition: border-color 0.3s;
            border-radius: 5px
        }

        .allbtn {
            display: flex;

            .btn-send {
                width: 27%;
                height: 21%;
                border: none;
                border-radius: 5px;
                margin-top: 22px;
                position: absolute;
                right: 47px;
                font-weight: 800;
                cursor: pointer;
            }

            .btn-close {
                width: 21%;
                height: 21%;
                border: none;
                border-radius: 5px;
                margin-top: 22px;
                position: absolute;
                right: 167px;
                background-color: #b70505;
                color: white;
                font-weight: 800;
                cursor: pointer;
            }
        }
    }
</style>