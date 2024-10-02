<template>
    <div class="carts-shipped">
        <CardGlobal :carts="allCards" />
    </div>
</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'CardsShipped',
        props: ['date'],
        components: {
            CardGlobal
        },

        computed: {

            ...mapState('conversion', {
                conversionOrders: state => state.conversionOrders
            }),

            // GET RECENT DAY
            getRecentDay() {
                let day = new Date().getDate()
                return day

            },

            // FILTER  BY MONTH
            getOrdersConfirmedByMonth() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Confirmed.filter(ele => Number(ele.date.split('-')[1]) === this.date
                        .dateSelected)
                }
                return orders.length
            },

            getOrdersShippedByMonth() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Shipped.filter(ele => Number(ele.date.split('-')[1]) === this.date
                        .dateSelected)
                }
                return orders.length
            },

            // FILTER  BY DAY
            getOrdersConfirmedByDay() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Confirmed.filter(ele => {

                        const month = parseInt(ele.date.split('-')[1], 10)
                        const day = parseInt(ele.date.split('-')[2], 10)

                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) &&
                            day === parseInt(this.date.dateSelected.split('-')[2], 10)
                    })
                    return orders.length
                }
                return orders
            },

            getOrdersShippedByDay() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Shipped.filter(ele => {
                        const month = parseInt(ele.date.split('-')[1], 10)
                        const day = parseInt(ele.date.split('-')[2], 10)
                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) &&
                            day === parseInt(this.date.dateSelected.split('-')[2], 10)
                    })
                    return orders.length
                }
                return orders
            },

            // FILTER BY YEAR
            getOrdersConfirmedByYear() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Confirmed.filter(ele => {
                        const year = parseInt(ele.date.split('-')[0], 10)
                        return year === this.date.dateSelected
                    })
                    return orders.length
                }
                return orders
            },
            getOrdersShippeddByYear() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Shipped.filter(ele => {
                        const year = parseInt(ele.date.split('-')[0], 10)
                        return year === this.date.dateSelected
                    })
                    return orders.length
                }
                return orders
            },


            // filter orders
            filterOrdersConfirmed() {
                let orders = ''
                if (this.date) {
                    if (this.date.type === 'Month') {
                        orders = this.getOrdersConfirmedByMonth
                    } else if (this.date.type === 'Day') {
                        orders = this.getOrdersConfirmedByDay
                    } else if (this.date.type === 'Year') {
                        orders = this.getOrdersConfirmedByYear
                    }
                } else {
                    orders = this.conversionOrders.Confirmed.filter(ele => parseInt(ele.date.split('-')[2], 10) === this
                        .getRecentDay).length
                }
                return orders
            },

            filterOrdersShipped() {
                let orders = ''
                if (this.date) {
                    if (this.date.type === 'Month') {
                        orders = this.getOrdersShippedByMonth
                    } else if (this.date.type === 'Day') {
                        orders = this.getOrdersShippedByDay
                    } else if (this.date.type === 'Year') {
                        orders = this.getOrdersShippeddByYear
                    }
                } else if (!this.date) {
                    orders = this.conversionOrders.Shipped.filter(ele => parseInt(ele.date.split('-')[2], 10) === this
                        .getRecentDay).length
                }
                return orders
            },


            allCards() {
                let Cards = [{
                        classicon: 'Shipped',
                        icon: 'bx bx-trip',
                        title: 'Order Shipped',
                        number: `${this.filterOrdersShipped}/${this.filterOrdersConfirmed}`,

                    },

                    {
                        classicon: 'delivery-rate',
                        icon: 'bx bx-chart',
                        title: 'Shipped Rate',
                        number: `${this.percentage} %`,

                    },

                ]

                return Cards
            },
            percentage() {
                let result = 0
                let percentage = Math.floor((this.filterOrdersShipped / this.filterOrdersConfirmed) * 100)
                if (isNaN(percentage)) {
                    result = 0
                } else {
                    result = percentage
                }
                return result

            }

        },

        methods: {
            ...mapActions('conversion', {
                fetchConversionOrders: 'ac_GetConversionOrders'
            }),

 
        },

        mounted() {
            [ 'Confirmed', 'Shipped'].forEach(ele => this.fetchConversionOrders(ele))
        }

    }
</script>