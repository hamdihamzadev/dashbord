<template>
    <div>
        <CardGlobal :carts="Allcarts" />
    </div>

</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {

        name: 'CardNeworders',
        props: ['date'],
        components: {
            CardGlobal
        },

        computed: {

            ...mapState('conversion', {
                conversionOrders: state => state.conversionOrders.New
            }),
            ...mapState('allOrders', {
                allOrders: state => state.orders
            }),

            // GET RECENT DAY
            getRecentDay() {
                let day = new Date().getDate()
                return day

            },

            // FILTER  BY MONTH
            OrdersByMonth() {
                let orders = {}
                if (this.date) {
                    orders = this.conversionOrders.filter(ele => parseInt(ele.date.split('-')[1], 10) === this.date
                        .dateSelected).length
                }
                return orders
            },

            SalesByMonth() {
                let sales = {}
                if (this.date) {
                    sales = this.allOrders.filter(ele => parseInt(ele.date.split('-')[1], 10) === this.date
                            .dateSelected)
                        .reduce((accu, order) => accu + order.total, 0)
                }
                return sales
            },


            // FILTER  BY DAY
            OrdersByDay() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.filter(ele => {
                        const month = parseInt(ele.date.split('-')[1], 10)
                        const day = parseInt(ele.date.split('-')[2], 10)
                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) &&
                            day === parseInt(this.date.dateSelected.split('-')[2], 10)
                    }).length

                }
                return orders
            },

            SalesByDay() {
                let sales = ''
                if (this.date) {
                    sales = this.allOrders.filter(ele => {
                        const month = parseInt(ele.date.split('-')[1], 10)
                        const day = parseInt(ele.date.split('-')[2], 10)
                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) &&
                            day === parseInt(this.date.dateSelected.split('-')[2], 10)
                    }).reduce((accu, order) => accu + order.total, 0)
                }
                return sales
            },

            // FILTER BY YEAR
            OrdersByYear() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.filter(ele => {
                        const year = parseInt(ele.date.split('-')[0], 10)
                        return year === this.date.dateSelected
                    }).length

                }
                return orders
            },

            SalesByYear() {
                let sales = ''
                if (this.date) {
                    sales = this.allOrders.filter(ele => {
                        const year = parseInt(ele.date.split('-')[0], 10)
                        return year === this.date.dateSelected
                    }).reduce((accu, order) => accu + order.total, 0)
                }
                return sales
            },


            // FILTER ORDERS
            FilterOrders() {
                let orders = ''
                if (this.date) {
                    if (this.date.type === 'Month') {
                        orders = this.OrdersByMonth
                    } else if (this.date.type === 'Day') {
                        orders = this.OrdersByDay
                    } else if (this.date.type === 'Year') {
                        orders = this.OrdersByYear
                    }
                } else {
                    orders = this.conversionOrders.filter(ele => parseInt(ele.date.split('-')[2], 10) === this
                        .getRecentDay).length
                }
                return orders
            },

            FilterSales() {
                let sales = ''
                if (this.date) {
                    if (this.date.type === 'Month') {
                        sales = this.SalesByMonth
                    } else if (this.date.type === 'Day') {
                        sales = this.SalesByDay
                    } else if (this.date.type === 'Year') {
                        sales = this.SalesByYear
                    }
                } else {
                    sales = this.allOrders.filter(ele => parseInt(ele.date.split('-')[2], 10) === this.getRecentDay)
                        .reduce((accu, order) => accu + order.total, 0)
                }
                return sales
            },


            Allcarts() {
                let carts = [{
                        classicon: 'Neworders',
                        icon: 'bx bx-cart-add',
                        title: 'New orders',
                        number: this.FilterOrders,

                    },

                    {
                        classicon: 'income',
                        icon: 'bx bx-money',
                        title: 'Sales',
                        number: this.FilterSales,
                        dollar: '$',

                    },

                ]
                return carts
            },

        },

        methods: {
            ...mapActions('conversion', {
                fetchConversionOrders: 'ac_GetConversionOrders'
            }),
            ...mapActions('allOrders', {
                fetchOrders: 'ac_getOrders'
            }),

        },

        mounted() {
            this.fetchConversionOrders('New')
            this.fetchOrders()
        },

    }
</script>