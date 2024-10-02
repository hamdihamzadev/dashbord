<template>
    <div class="chart-views">
        <div class="headline">
            <h6 class="title">Total Revenue in this yeat</h6>
            <h3 class="order-sexmonths">{{ totalRevenueYear }} $</h3>
        </div>
        <canvas id="myviews"></canvas>
    </div>

</template>

<script>
    import Chart from 'chart.js/auto';
    import { mapActions, mapState } from 'vuex';
    export default {

        name: 'ChartSales',
        computed: {
            ...mapState('allOrders', {
                allOrders: state=>state.orders 
            }),
            OrdersYear() {
                let ordersAllMonths = []
                for (let i = 0; i < 12; i++) {
                    let ordersMonth = this.allOrders.filter(order => order.date.split('-')[1] === (i + 1).toString())
                    let revenue= ordersMonth.reduce((accu,order)=> accu+order.total ,0)
                    ordersAllMonths.push(revenue)
                }
                return ordersAllMonths
            },

            totalRevenueYear(){
                let revenue=this.OrdersYear.reduce((accu,month)=> accu+month , 0)
                return revenue
            }
        },
        methods: {
            canvas() {
                const ctx = document.getElementById('myviews');
                const data = {
                    labels: [ 'January',
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
                        'December'],
                    datasets: [{
                        label: 'Total Sales',
                        data: this.OrdersYear,
                        fill: false,
                        borderColor: '#365cf5',
                        tension: 0.1
                    }]
                };
                new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                })
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
    .chart-views {
        margin-top: 34px;
        background: #14142D;
        padding: 41px 40px;
        border-radius: 12px;
    }

    #myviews {
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