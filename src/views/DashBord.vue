<template>
  <b-container fluid class="dashbord">
    <b-row class="mb-4 mb-md-0">
      <b-col cols="12" md="4" lg="6" >
        <h1 class="mb-4">Dashbord vue</h1>
      </b-col>
      <b-col  cols="12" md="8" lg="6" >
        <DateDashbord @send-date="getTypeData" @send-month="getMonth" @send-day="getDay" @send-year="getYear" />
      </b-col>
    </b-row>
    <CartsAllorders :date="date" />
    <b-row>

      <b-col cols="12" lg="6" >
        <GraphiqueOrders />
      </b-col>

      <b-col cols="12"  lg="6">
        <ChartSales />
      </b-col>

    </b-row>

  </b-container>
</template>

<script>
  import CartsAllorders from '@/views/dashbord/CartsAllorders.vue'
  import GraphiqueOrders from '@/views/dashbord/ChartOrders.vue'
  import ChartSales from '@/views/dashbord/ChartSales.vue'
  import DateDashbord from '../views/dashbord/DateDashbord.vue'

  export default {
    name: 'DashBord',
    components: {
      CartsAllorders,
      GraphiqueOrders,
      ChartSales,
      DateDashbord
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

<style>
  #table-Order {
    color: white
  }

  #table {
    color: white
  }
</style>