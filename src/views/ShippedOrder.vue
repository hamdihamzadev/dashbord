<template>

    <b-container fluid class="shipped">
        <b-row>
            <b-col cols="12" md="5" lg="6"  >
                <h1 class="mb-4"> <strong>Orders shipped</strong> </h1>
            </b-col>
            <b-col cols="12" md="7" lg="6" class="mb-2 mb-md-0" >
                <DateGlobal @send-date="getTypeData" @send-month="getMonth" @send-day="getDay"  @send-year="getYear"  />
            </b-col>
        </b-row>
        <CardsShipped :date="date" />
        <TableShipped class="mt-4" :date="date" />
    </b-container>

</template>

<script>
    import DateGlobal from "../components/DateGlobal.vue"
    import CardsShipped from '@/views/shipped/CardsShipped.vue'
    import TableShipped from '@/views/shipped/TableShipped.vue'


    export default {
        name: 'ShippedOrder',
        components: {
            DateGlobal,
            CardsShipped,
            TableShipped
          
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