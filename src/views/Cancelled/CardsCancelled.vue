<template>
    <div class="carts-confirmed">
        <CardGlobal :carts="cards" />
    </div>
</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'CartsCancelled',
        props: ['date'],
        components: {
            CardGlobal,
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

            // FILTER BY MONTH
            OrdersCancelledByMonth() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Cancelled.filter(ele => parseInt(ele.date.split('-')[1], 10) === this.date.dateSelected)
                }
                return orders.length
            },

            NewOrdersByMonth() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.New.filter(ele => parseInt(ele.date.split('-')[1], 10) === this.date
                        .dateSelected)
                }
                return orders.length
            },

            // FILTER BY DAY
            OrdersCancelledByDay() {
                let orders = []
                if (this.date) {
                    orders = this.conversionOrders.Cancelled.filter(ele => {

                        const month = parseInt(ele.date.split('-')[1], 10)
                        const day = parseInt(ele.date.split('-')[2], 10)

                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) &&
                            day === parseInt(this.date.dateSelected.split('-')[2], 10)
                    })
                }
                return orders.length
            },

            NewOrdersByDay() {
                let orders = []
                if (this.date) {
                    orders = this.conversionOrders.New.filter(ele => {

                        const month = parseInt(ele.date.split('-')[1], 10)
                        const day = parseInt(ele.date.split('-')[2], 10)

                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) &&
                            day === parseInt(this.date.dateSelected.split('-')[2], 10)
                    })

                }
                return orders.length
            },

            // FILTER BY YEAR
            OrdersCancelledByYear() {
                let orders = []
                if (this.date) {
                    orders = this.conversionOrders.Cancelled.filter(ele => {
                        const year = parseInt(ele.date.split('-')[0], 10)
                        return year === this.date.dateSelected
                    })
                }
                return orders.length
            },

            NewOrdersByYear() {
                let orders = []
                if (this.date) {
                    orders = this.conversionOrders.New.filter(ele => {
                        const year = parseInt(ele.date.split('-')[0], 10)
                        return year === this.date.dateSelected
                    })
                }
                return orders.length
            },

            // FILTER ORDERS
            filterOrderCancelled() {
                let orders = []

                if (this.date) {
                    if (this.date.type === 'Year') {
                        orders = this.OrdersCancelledByYear
       
                    } else if (this.date.type === 'Month') {
                        orders = this.OrdersCancelledByMonth
                      
                    } else if (this.date.type==='Day') {
                        orders = this.OrdersCancelledByDay
                       
                    }
                } else if(!this.date) {
                    orders = this.conversionOrders.Cancelled.filter(ele => parseInt(ele.date.split('-')[2], 10) === this.getRecentDay).length
                }

                return orders
            },

            filterNewOrders() {
                let orders = []
                if (this.date) {
                    if (this.date.type === 'Year') {
                        orders = this.NewOrdersByYear
    
                    } else if (this.date.type === 'Month') {
                        orders = this.NewOrdersByMonth

                    } else if (this.date.type==='Day') {
                        orders = this.NewOrdersByDay
                    }
                    
                } else if(!this.date) {
                    orders = this.conversionOrders.New.filter(ele => parseInt(ele.date.split('-')[2], 10) === this.getRecentDay).length
                }

                return orders
            },

            percentage(){
                let result=0
                let percentage=Math.round(this.filterOrderCancelled/this.filterNewOrders*100)
                if(isNaN(percentage)){
                    result=0
                }else{
                    result=percentage
                }
                return result
            },

            cards() {
                let allCards = [

                    {
                        classicon: 'Order-Confirmed',
                        icon: 'bx bx-package',
                        title: 'Order Canceld',
                        number: `${this.filterOrderCancelled} / ${this.filterNewOrders}`,
                        pourcentage: 1.20,
                        duration: 'Today'

                    },
                    {

                        classicon: 'confirmation-rate',
                        icon: 'bx bx-chart',
                        title: 'cancelled Rate',
                        number: `${this.percentage} %`,
                        pourcentage: 1.20,
                        duration: 'Today'
                    }
                ]
                return allCards
            },

        },

        methods: {
            ...mapActions('conversion', {
                fetchConversionOrders: 'ac_GetConversionOrders'
            }),
        },

        mounted() {
            ['New', 'Cancelled'].forEach(ele => this.fetchConversionOrders(ele))
        }

    }
</script>