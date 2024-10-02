<template>

    <div class="chart-orders">
        <div class="headline">
            <h6 class="title">Total orders in this year</h6>
            <h3 class="order-sexmonths">{{ allOrders.length }}</h3>
        </div>
        <canvas id="myorder"></canvas>
    </div>

</template>

<script>
    import Chart from 'chart.js/auto';
    import {
        mapActions,
        mapState
    } from 'vuex';
    export default {

        name: 'GraphiqueOrders',
        computed: {
            ...mapState('allOrders', {
                allOrders: state=>state.orders 
            }),

            ordersAllMonths() {
    
                let ordersAllMonths=[]
                for (let i = 0; i < 12; i++) {
                    let ordersMonth = this.allOrders.filter(order => order.date.split('-')[1] === (i + 1).toString())
                    ordersAllMonths.push(ordersMonth.length)
                }
                return ordersAllMonths
            },

            allOrdersYear(){
                let orders=this.OrdersYear.reduce((accu,month)=> accu+month ,0 )
                return orders
            }

        },

        methods: {

            canvas() {
                // CHART ORDER
                const data = {

                    labels: [

                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'

                    ],
                    datasets: [{
                        label: 'Orders',
                        data: this.ordersAllMonths,
                        backgroundColor: 'rgba(54, 92, 245, 0.1)',
                        borderColor: '#365CF5',
                        borderWidth: 1
                    }]
                };

                const ctx = document.getElementById('myorder');
                new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            },
            ...mapActions('allOrders',{
                fetchOrders:'ac_getOrders'
            })
        },
        mounted() {
            this.fetchOrders()
            this.canvas()
            

        }
    }
</script>

<style scoped>
    .chart-orders {
        margin-top: 34px;
        background: #14142D;
        padding: 41px 40px;
        border-radius: 12px;
    }

    #myorder {
        height: 20%;
        width: 30%;
    }

    .headline .title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    .headline .order-sexmonths {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 15px;
    }
</style>