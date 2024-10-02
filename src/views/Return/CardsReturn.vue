<template>
    <div >
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
        name: 'CardsReturn',
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

            // FILTER  BY MONTH
            getOrdersReturnByMonth() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Return.filter(ele => Number(ele.date.split('-')[1]) === this.date
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
            getOrdersReturnByDay() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Return.filter(ele => {
                        const month = parseInt(ele.date.split('-')[1], 10)
                        const day = parseInt(ele.date.split('-')[2], 10)
                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) && day ===
                            parseInt(this.date.dateSelected.split('-')[2], 10)
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
                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) && day === parseInt(
                            this.date.dateSelected.split('-')[2], 10)
                    })
                    return orders.length
                }
                return orders
            },

            
            // FILTER BY YEAR
            getOrdersReturnByYear() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Return.filter(ele => {
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

            
            // FILTER ORDERS
            filterOrdersReturn() {
                let orders = ''
                if (this.date) {
                    if (this.date.type === 'Month') {
                        orders = this.getOrdersReturnByMonth
                    } else if (this.date.type === 'Day') {
                        orders = this.getOrdersReturnByDay
                    }else if(this.date.type === 'Year'){
                        orders = this.getOrdersReturnByYear
                    }
                } else {
                    orders = this.conversionOrders.Return.filter(ele => parseInt(ele.date.split('-')[2], 10)===this.getRecentDay).length
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
                    }else if(this.date.type==='Year'){
                        orders=this.getOrdersShippeddByYear
                    }
                } else if (!this.date) {
                    orders = this.conversionOrders.Shipped.filter(ele => parseInt(ele.date.split('-')[2], 10)===this.getRecentDay).length
                }
                return orders
            },






            cards() {
                let allCards = [{
                        classicon: 'Shipped',
                        icon: 'bx bx-trip',
                        title: 'Order Return',
                        number: `${this.filterOrdersReturn} / ${this.filterOrdersShipped}`,
                        pourcentage: 5.43,
                        duration: 'Days'
                    },

                    {
                        classicon: 'delivery-rate',
                        icon: 'bx bx-chart',
                        title: 'Return Rate',
                        number: `${this.percentage} %`,

                    },

                ]

                return allCards
            },

            percentage() {
                let result=0
                let percentage = Math.floor((this.filterOrdersReturn / this.filterOrdersShipped) * 100)
                if(isNaN(percentage)){
                    result = 0
                }else{
                    result=percentage
                }
                return result
            }

        },

        methods:{
            ...mapActions('conversion', {
                fetchConversionOrders: 'ac_GetConversionOrders'
            }),
        },

        mounted(){
            ['Shipped','Return'].forEach(ele=>this.fetchConversionOrders(ele))
        }



    }
</script>