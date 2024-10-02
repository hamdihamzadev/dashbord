<template>
    <div class="analytnewOrder">
        <CardGlobal :carts="cards" />
    </div>
</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
import { mapActions, mapState } from 'vuex';
    export default {
        name: 'CartsAllorders',
        props: ['date'],
        components: {
            CardGlobal
        },

        computed: {
            ...mapState('allOrders',{
                allOrders:state=>state.orders
            }),
            getRecentYear(){
                let year=new Date().getFullYear()
                return year
            },


            // FILTER BY YEAR
            ordersByYear(){
                let orders=""
                if(this.date){
                   orders= this.allOrders.filter(ele =>{
                        return parseInt(ele.date.split('-')[0],10) === this.date.dateSelected
                    }).length
                }
                return orders
            },

            salesByYear(){
                let sales=''
                if(this.date){
                    sales=this.allOrders.filter(ele=>{
                        return parseInt(ele.date.split('-')[0],10) === this.date.dateSelected
                    }).reduce((accu,order)=> accu+order.total,0)
                }
                return sales
            },

            // FILTER BY MONTH
            ordersByMonth(){
                let orders=''
                if(this.date){
                    orders=this.allOrders.filter(ele=>{
                        return parseInt(ele.date.split('-')[1],10) === this.date.dateSelected
                    }).length
                }
                return orders
            },
            salesByMonth(){
                let sales=''
                if(this.date){
                    sales=this.allOrders.filter(ele=>{
                        return parseInt(ele.date.split('-')[1],10) === this.date.dateSelected
                    }).reduce((accu,order)=> accu+order.total,0)
                }
                return sales
            },

            // FILTER BY DAY
            ordersByDay(){
                let orders=''
                if(this.date){
                    orders=this.allOrders.filter(ele=>{
                        const month = parseInt(ele.date.split('-')[1], 10)
                        const day = parseInt(ele.date.split('-')[2], 10)
                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) &&
                               day === parseInt(this.date.dateSelected.split('-')[2], 10)
                    }).length
                }
                return orders
            },

            salesByDay(){
                let sales=''
                if(this.date){
                    sales=this.allOrders.filter(ele=>{
                        const month = parseInt(ele.date.split('-')[1], 10)
                        const day = parseInt(ele.date.split('-')[2], 10)
                        return month === parseInt(this.date.dateSelected.split('-')[1], 10) &&
                               day === parseInt(this.date.dateSelected.split('-')[2], 10)
                    }).reduce((accu,order)=> accu+order.total,0)
                }
                return sales
            },

            // FILTER ORDERS AND SALES
            filterOrders(){
                let orders = ''
                if (this.date) {
                    if (this.date.type === 'Month') {
                        orders = this.ordersByMonth
                    } else if (this.date.type === 'Day') {
                        orders = this.ordersByDay
                    } else if (this.date.type === 'Year') {
                        orders = this.ordersByYear
                    }
                } else {
                    orders = this.allOrders.filter(ele => parseInt(ele.date.split('-')[0], 10) === this.getRecentYear).length
                }
                return orders
            },

            
            FilterSales() {
                let sales = ''
                if (this.date) {
                    if (this.date.type === 'Month') {
                        sales = this.salesByMonth
                    } else if (this.date.type === 'Day') {
                        sales = this.salesByDay
                    } else if (this.date.type === 'Year') {
                        sales = this.salesByYear
                    }
                } else {
                    sales = this.allOrders.filter(ele => parseInt(ele.date.split('-')[0], 10) === this.getRecentYear).reduce((accu,order)=>accu+order.total,0)
                }
                return sales
            },


            // CARDS 
            cards() {
                let allcards = [{
                        classicon: 'allorders',
                        icon: 'bx bx-shopping-bag',
                        title: 'All Orders',
                        number: this.filterOrders,
                        pourcentage: 2.43
                    },
                    {
                        classicon: 'income',
                        icon: 'bx bx-money',
                        title: 'Sales',
                        number: this.FilterSales,
                        dollar: '$',
                        pourcentage: 2.43
                    },
                    {
                        classicon: 'views',
                        icon: 'bx bx-show',
                        title: 'All Views',
                        number: 6085,
                        pourcentage: 2.43
                    },

                ]
                return allcards
            },

        },

        methods: {
            ...mapActions('allOrders',{
                fetchOrders:'ac_getOrders'
            })
        },

        mounted() {
            this.fetchOrders()
        }

    }
</script>