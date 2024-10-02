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
        name: 'CardsDeliverd',
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
                let day=new Date().getDate()
                return day

            },

            // FILTER  BY MONTH
            getOrdersDelivredByMonth() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Delivered.filter(ele => Number(ele.date.split('-')[1]) === this.date
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
            getOrdersDelivredByDay() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Delivered.filter(ele => {
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
            getOrdersDeliveredByYear() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Delivered.filter(ele => {
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
            filterOrdersDelivred() {
                let orders = ''
                if (this.date) {
                    if (this.date.type === 'Month') {
                        orders = this.getOrdersDelivredByMonth
                    } else if (this.date.type === 'Day') {
                        orders = this.getOrdersDelivredByDay
                    }else if(this.date.type === 'Year'){
                        orders = this.getOrdersDeliveredByYear
                    }
                } else {
                    orders = this.conversionOrders.Delivered.filter(ele => parseInt(ele.date.split('-')[2], 10)===this.getRecentDay).length
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
                let AllCards = [{
                        classicon: 'Shipped',
                        icon: 'bx bx-trip',
                        title: 'Order Delivred',
                        number: `${this.filterOrdersDelivred} / ${this.filterOrdersShipped} `,
                        pourcentage: 5.43,
                        duration: 'Days'
                    },

                    {
                        classicon: 'delivery-rate',
                        icon: 'bx bx-chart',
                        title: 'Delivery Rate',
                        number: `${this.percentage} %`,
                        pourcentage: 2.43,
                        duration: 'Days'
                    },

                ]
                return AllCards
            },

            percentage() {
                let result=0
                let percentage = Math.floor((this.filterOrdersDelivred / this.filterOrdersShipped) * 100)
                if(isNaN(percentage)){
                    result=0
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
            ['Delivered','Shipped'].forEach(ele => this.fetchConversionOrders(ele) ) 
        }

    }
</script>