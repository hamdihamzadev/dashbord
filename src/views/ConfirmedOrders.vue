<template>
    <b-container fluid class="confirmedorders">
        <b-row>
            <b-col cols="12" md="5" lg="6" >
                <h1 class="mb-4"> <strong>Orders confirmed</strong> </h1>
            </b-col>
            <b-col cols="12" md="7" lg="6" class="mb-2 mb-md-0" >
                <DateGlobal @send-date="getTypeData" @send-month="getMonth" @send-day="getDay" @send-year="getYear" />
            </b-col>
        </b-row>
        <CardsConfirmed :date="date" />
        <TableConfirmed class="mt-4" :date="date" />

    </b-container>
</template>

<script>
    import DateGlobal from "../components/DateGlobal.vue"
    import CardsConfirmed from '@/views/Confirmed/CardsConfirmed.vue'
    import TableConfirmed from '@/views/Confirmed/TableConfirmed.vue'



    export default {
        name: 'ConfirmedOredrs',
        components: {
            DateGlobal,
            CardsConfirmed,
            TableConfirmed,

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

        },
    
    }
</script>

<style scoped>
    .chartconfirmation {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
</style>