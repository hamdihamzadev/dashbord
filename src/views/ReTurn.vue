<template>
    <b-container class="return" fluid>
        <b-row>
            <b-col cols="12" md="5" lg="6" >
                <h1 class="mb-4"> <strong>Orders Return</strong> </h1>
            </b-col>
            <b-col cols="12" md="7" lg="6" class="mb-2 mb-md-0" >
                <DateGlobal @send-date="getTypeData" @send-month="getMonth" @send-day="getDay" />
            </b-col>
        </b-row>
        <CardsReturn :date="date" />
        <TableReturn class="mt-4" :date="date"/>
    </b-container>
</template>

<script>
    import CardsReturn from '@/views/Return/CardsReturn.vue'
    import TableReturn from '@/views/Return/TableReturn.vue'
    import DateGlobal from "../components/DateGlobal.vue"
    export default {
        name: 'ReTurn',
        components: {
            CardsReturn,
            TableReturn,
            DateGlobal
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
        }
    }
</script>