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
        name: 'CardsConfirmed',
        props: ['date'],
        components: {
            CardGlobal,
        },
 
        computed: {

            ...mapState('conversion', {
                conversionOrders: state => state.conversionOrders
            }),
            ...mapState('allOrders', {
                allOrders: state => state.orders
            }),

            // GET RECENT DAY
            getRecentDay(){
                let day=new Date().getDate()
                return day
                
            },
            
            // FILTER  BY MONTH
            getNewOrdersByMonth() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.New.filter(ele => Number(ele.date.split('-')[1]) === this.date
                        .dateSelected)
                }
                return orders.length
            },

            getOrdersConfirmedByMonth() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Confirmed.filter(ele => Number(ele.date.split('-')[1]) === this.date
                        .dateSelected)
                }
                return orders.length
            },

            // FILTER  BY DAY
            getNewOrdersByDay() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.New.filter(ele => {
                        const month = parseInt(ele.date.split('-')[1], 10)
                        const day = parseInt(ele.date.split('-')[2], 10)
                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) && day === parseInt(
                            this.date.dateSelected.split('-')[2], 10)
                    })
                    return orders.length
                }
                return orders
            },

            getOrdersConfirmedByDay() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Confirmed.filter(ele => {
                        const month = parseInt(ele.date.split('-')[1], 10)
                        const day = parseInt(ele.date.split('-')[2], 10)
                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) && day ===
                            parseInt(this.date.dateSelected.split('-')[2], 10)
                    })
                    return orders.length
                }
                return orders
            },

            // FILTER  BY YEAR
            getNewOrdersByYear() {
                let orders = ''
                if (this.date) {
                    orders=this.conversionOrders.New.filter(ele => {
                        const year = parseInt(ele.date.split('-')[0],10)
                        return year === this.date.dateSelected
                    })
                    return orders.length
                }
                return orders
            },

            getOrdersConfirmedByYear() {
                let orders = ''
                if (this.date) {
                    orders = this.conversionOrders.Confirmed.filter(ele => {
                        const year = parseInt(ele.date.split('-')[0],10)
                        return year === this.date.dateSelected
                    })
                    return orders.length
                }
                return orders
            },

            // filter orders
            filterNewOrders(){
                let orders = ''
                if(this.date){
                    if(this.date.type==='Month'){
                        orders=this.getNewOrdersByMonth
                    }else if(this.date.type==='Day'){
                        orders=this.getNewOrdersByDay
                    }else if(this.date.type==='Year'){
                        orders=this.getNewOrdersByYear
                    }
                }else if(!this.date) {
                  orders=this.conversionOrders.New.filter(ele=> parseInt(ele.date.split('-')[2], 10)===this.getRecentDay).length
                }
                return orders
            },

            filterOrdersConfirmed(){
                let orders = ''
                if(this.date){
                    if(this.date.type==='Month'){
                        orders=this.getOrdersConfirmedByMonth
                    }else if(this.date.type==='Day'){
                        orders=this.getOrdersConfirmedByDay
                    }else if(this.date.type==='Year'){
                        orders=this.getOrdersConfirmedByYear
                    }
                }else{
                    orders=this.conversionOrders.Confirmed.filter(ele=> parseInt(ele.date.split('-')[2], 10)===this.getRecentDay).length
                }
                return orders
            },

            // CARDS
            cards() {
                const cards = [{
                        classicon: 'Order-Confirmed',
                        icon: 'bx bx-package',
                        title: 'Order Confirmed',
                        number: `${this.filterOrdersConfirmed}/${this.filterNewOrders}`,
                        pourcentage: 3.20,
                        duration: 'Today'

                    },
                    {

                        classicon: 'confirmation-rate',
                        icon: 'bx bx-chart',
                        title: 'Confirmation Rate',
                        number: `${this.percentage}%`,
                        pourcentage: 3.20,
                        duration: 'Today'
                    }
                ]
                return cards
            },

            percentage() {
                let result=0
                let percentage = Math.floor((this.filterOrdersConfirmed / this.filterNewOrders) * 100)
                if(isNaN(percentage)){
                    result=0
                }else{
                    result=percentage
                }
                return result
         
            },

        },

        methods:{
            ...mapActions('conversion', {
                fetchConversionOrders: 'ac_GetConversionOrders'
            }),
            ...mapActions('allOrders', {
                fetchOrders: 'ac_getOrders'
            }),



        },

        mounted(){
           ['New','Confirmed'].forEach(ele=>this.fetchConversionOrders(ele))
           this.fetchOrders()
        }

    }
</script>