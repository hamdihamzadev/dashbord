<template>
  <div>
    <TableGlobal :orders="ordersReturn" :status="status" :fields="fields" :date-filter-orders="date"/>
  </div>
</template>

<script>
  import TableGlobal from '@/components/TableGlobal.vue'
  import {
    mapState,
    mapActions
  } from 'vuex';
  export default {
    name: 'TableReturn',
    props: ['date'],
    components: {
      TableGlobal
    },

    data() {
      return {
        status: [{
            value: 'Confirmed',
            text: 'Confirmed'
          },
          {
            value: 'Delivered',
            text: 'Delivered'
          },
          {
            value: 'Shipped',
            text: 'Shipped'
          },
          {
            value: 'Canceled',
            text: 'Canceled'
          },
          {
            value: 'New',
            text: 'New'
          },
          {
            value: 'Progress',
            text: 'Progress'
          },
          {
            value: 'Not treat',
            text: 'Not treat'
          },
          {
            value: 'Postponed',
            text: 'Postponed'
          },
        ],
        fields: [{
            key: 'Customer',
            sortable: false
          },
          {
            key: 'Phone',
            sortable: false
          },

          {
            key: 'City',
            sortable: false
          },
          {
            key: 'Adress',
            sortable: false
          },
          {
            key: 'Product',
            sortable: false
          },
          {
            key: 'Price',
            sortable: false
          },
          {
            key: 'Quantity',
            sortable: false
          },
          {
            key: 'Total',
            sortable: false
          },
          {
            key: 'Date',
            sortable: false
          },
        ],
      }
    },


    computed: {
      // STORE ALL ORDERS
      ...mapState('allOrders', {
        ordersReturn: state => state.orders
          .filter(ele => ele.statussuivi === 'Return')
          .map(ele => {
            const objOrder = new Object
            objOrder.Customer = ele.customer.name
            objOrder.Phone = `0${ele.customer.phone}`
            objOrder.City = ele.customer.city
            objOrder.Adress = ele.customer.adresse
            objOrder.productId = ele.product._id
            objOrder.Product = ele.product.name
            objOrder.Price = ele.product.price
            objOrder.Quantity = ele.quantity
            objOrder.Total = ele.total
            objOrder.Date = ele.date
            objOrder.Status = ele.statustable
            objOrder.id = ele._id
            return objOrder
          })
      }),
    },



    methods: {
      ...mapActions('allOrders', {
        fetchOrders: 'ac_getOrders'
      })

    },

    mounted() {
      this.fetchOrders()
    }


  }
</script>