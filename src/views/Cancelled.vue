<template>
    <b-container fluid class="mt-5">
        <b-row>
            <b-col cols="12" md="5" lg="6">
                <h1 class="mb-4"> <strong>Orders cancelled</strong> </h1>
            </b-col>
            <b-col cols="12" md="7" lg="6" class="mb-2 mb-md-0">
                <DateGlobal @send-date="getTypeData" @send-month="getMonth" @send-day="getDay" @send-year="getYear" />
            </b-col>
        </b-row>
        <CartsCancelled :date="date" />
        <TableCanceld class="mt-4" :date="date" />
    </b-container>
</template>

<script>
    import DateGlobal from "../components/DateGlobal.vue"
    import CartsCancelled from '@/views/Cancelled/CardsCancelled.vue'
    import TableCanceld from '@/views/Cancelled/TableCancelled.vue'
    export default {
        name: 'CancelledOrders',
        components: {
            DateGlobal,
            TableCanceld,
            CartsCancelled
        },

        data() {
            return {
                date: ''
            }
        },

        methods: {
            getTypeData(payload) {
                this.date = payload
            },
            getMonth(payload) {
                this.date = payload
            },
            getDay(payload) {
                this.date = payload

            },
            getYear(payload) {
                this.date = payload
            },
        }

    }
</script>