<template>
    <section class="addOrder pb-5">
        <b-container fluid>
            <b-row class="mb-4 class-md-0" >
                <b-col cols="12" md="6">
                    <h1 class="mb-3"> <strong>Conversion Rate</strong> </h1>
                </b-col>
                <b-col cols="12" md="6">
                    <DateGlobal @send-date="getTypeData" @send-month="getMonth" @send-day="getDay" @send-year="getYear" />
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="12" class="mb-4">
                    <CardsConfirmed :date="date" />
                </b-col>
                <b-col cols="12" class="mb-4">
                    <CardsShipped :date="date"/>
                </b-col>
                <b-col cols="12" class="mb-4">
                    <CardsDeliverd :date="date" />
                </b-col>
                <b-col cols="12" class="mb-4">
                    <CardsReturn :date="date" />
                </b-col>
                <b-col cols="12" class="mb-4">
                    <CartsCancelled :date="date" />
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
    import CardsConfirmed from '@/views/Confirmed/CardsConfirmed.vue'
    import CardsShipped from '@/views/shipped/CardsShipped.vue'
    import CardsDeliverd from '@/views/Deliverd/CardsDeliverd.vue'
    import CardsReturn from '@/views/Return/CardsReturn.vue'
    import CartsCancelled from '@/views/Cancelled/CardsCancelled.vue'
    import DateGlobal from "../components/DateGlobal.vue"
import { mapActions } from 'vuex'
    
    export default {
        name: 'ConversionRate',
        components: {
            CardsShipped,
            CardsConfirmed,
            CardsDeliverd,
            CardsReturn,
            CartsCancelled,
            DateGlobal
        },
        data() {
            return {
                date:''
            }
        },

        methods: {
            getTypeData(payload) {
                this.date = payload
            },
            getMonth(payload) {
                this.date = payload
            },
            getDay(payload){
                this.date=payload
            },
            getYear(payload){
                this.date=payload
            },

            ...mapActions('allOrders', {
                fetchOrders: 'ac_GetConversionOrders'
            })
        },
           
        mounted() {
            ['New','Confirmed','Shipped','Delivered','Return'].forEach(ele => this.fetchOrders(ele))
        }

    }
</script>