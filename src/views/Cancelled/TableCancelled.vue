<template>

    <div class="tabelCanceld">
        <TableGlobal :orders="ordersCancelled" :status="status" :fields="fields" :date-filter-orders="date" />
    </div>

</template>

<script>
    import TableGlobal from '@/components/TableGlobal.vue'
    import {
        mapActions,
        mapState
    } from 'vuex';

    export default {
        name: 'TableCanceld',
        props: ['date'],
        components: {
            TableGlobal
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
                status: [{
                        value: 'Confirmed',
                        text: 'Confirmed'
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
                ordersCancelled: state => state.orders
                    .filter(ele => ele.statussuivi === 'Cancelled')
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



<style>
    .tabelCanceld {
        border-radius: 12px;
    }
</style>