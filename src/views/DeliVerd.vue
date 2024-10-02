
<template>
    <b-container fluid class="delivred">
        <b-row>
            <b-col cols="12" md="5" lg="6" ><h1 class="mb-4"><strong>Orders Delivered</strong> </h1></b-col>
            <b-col cols="12" md="7" lg="6" class="mb-2 mb-md-0">
                <DateGlobal @send-date="getTypeData" @send-month="getMonth" @send-day="getDay"/>
            </b-col>
        </b-row>
        <CardsDeliverd :date="date" />
        <TableDelivred class="mt-4" :date="date" />
    </b-container>
</template>

<script>
import DateGlobal from "../components/DateGlobal.vue"
import CardsDeliverd from '@/views/Deliverd/CardsDeliverd.vue'
import TableDelivred from '@/views/Deliverd/TableDelivred.vue'


export default{

    name:'DeliVerd',
    components:{
        DateGlobal,
        CardsDeliverd,
        TableDelivred,
      
    },

    data(){
        return{
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
            getDay(payload) {
                this.date = payload
            },
        }
}
</script>