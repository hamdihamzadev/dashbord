<template>
    <section class="neworders">
        <b-container  fluid>
            <b-row class="mb-4 mb-md-0">
                <b-col cols="12" md="5" lg="6">
                    <h1 class="mb-4">New Orders</h1>
                </b-col>
                <b-col cols="12" md="7" lg="6">
                    <DateGlobal @send-date="getTypeData" @send-month="getMonth" @send-day="getDay"
                        @send-year="getYear" />
                </b-col>
            </b-row>
            <CardNeworders :date="date" />
            <TableNeworders class="mt-4" :date="date" />
        </b-container>
    </section>
</template>

<script>
    import DateGlobal from "../components/DateGlobal.vue"
    import CardNeworders from '@/views/NewOrders/CardNeworders.vue'
    import TableNeworders from '@/views/NewOrders/TabelNeworders.vue'

    export default {
        name: 'NewOrders',
        components: {
            DateGlobal,
            CardNeworders,
            TableNeworders

        },

        data() {
            return {
                date: '',
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