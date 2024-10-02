<template>
  <b-container class="bv-example-row" id="table-global" fluid>
    <!---------- TITLE AND SEARCH --------------->
    <b-row class="mb-5 d-flex justify-content-between ">
      <!----- TITLE ----->
      <b-col cols="6" md="4">
        <h1 class="title">Orders</h1>
      </b-col>
      <b-col cols="6" md="4">
        <!----- SEARCH INPUT ----->
        <b-form-input id="filter-input" type="search" placeholder="Search product or ..." @input="searchprd">
        </b-form-input>
      </b-col>
    </b-row>

    <!---------- TABLE --------------->
    <b-table responsive striped hover :items="ordersByFilter" :fields="fields" sort-icon-left :per-page="perPage"
      :current-page="currentPage" class="mt-2" id="my-table">
      <template #cell(Status)="data">
        <b-form-select v-model="data.item.Status" :options="status" @change="changeStatus(data.item.id,$event)">
        </b-form-select>
      </template>
      <template #cell(Action)="data">
        <select class="form-select" aria-label="Select an action" @change="handleActionChange($event,data.item)">
          <option selected>Choose...</option>
          <option value="send">Send</option>
          <option value="edit" v-show="showEditAction" >Edit</option>
        </select>
      </template>
    </b-table>

    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="my-table">
    </b-pagination>

    <!----------  POPUP EDIT ORDER --------------->
    <b-modal id="modalorder" ref="modalOrder" title="Edit your order">
      <b-row>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Customer:" label-for="input-1">
            <b-form-input v-model="orderUpdate.Customer" id="input-1" type="text" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Phone:" label-for="input-1">
            <b-form-input v-model="orderUpdate.Phone" id="input-1" type="number" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="City:" label-for="input-1">
            <b-form-input v-model="orderUpdate.City" id="input-1" type="text" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Adress:" label-for="input-1">
            <b-form-input v-model="orderUpdate.Adress" id="input-1" type="text" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Product:" label-for="input-1">
            <b-form-input v-model="orderUpdate.Product" id="input-1" type="text" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Price:" label-for="input-1">
            <b-form-input v-model="orderUpdate.Price" id="input-1" type="number" placeholder="Enter name product"
              :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Quantity:" label-for="input-1">
            <b-form-input v-model="orderUpdate.Quantity" id="input-1" type="number" placeholder="Enter name product">
            </b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group class="mb-4" id="input-name" label="Total:" label-for="input-1">
            <b-form-input v-model="Total" id="input-1" type="number" placeholder="Enter name product" :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="12">
          <b-form-group class="mb-4" id="input-name" label="Status:" label-for="input-1">
            <b-form-input v-model="orderUpdate.Status" id="input-1" type="text" :disabled='true'>
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <template #modal-footer>
        <b-button variant="secondary" @click="hideModal">Cancel</b-button>
        <b-button variant="primary" @click="editOrder()">Edit</b-button>
      </template>

    </b-modal>

  </b-container>
</template>

<script>

import axios from 'axios'
  import {
    mapState,
    mapActions
  } from 'vuex';
  export default {
    name: "TableGlobal",
    props: ['orders', 'fields', 'status', 'dateFilterOrders'],
    data() {
      return {
        orderUpdate: '',
        orderUpdateApi: '',
        oldQuantityOrder:'',
        stockProduct: '',
        OrderDelete: '',
        statusSuivi: '',
        allstatus: '',
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        apiUrl: process.env.VUE_APP_API_URL
      }
    },



    computed: {

      // ------------------------------------- STORE START -------------------------------------

      ...mapState('allProducts', {
        allProducts: state => state.Products.map(ele => {
          const obj = new Object
          obj.id = ele._id
          obj.quantity = ele.quantity
          return obj
        })
      }),
      
      ...mapState('allOrders', {
        allOrders: state => state
      }),

      // ------------------------------------- STORE END -------------------------------------


      Total() {
        const totalOrder = this.orderUpdate.Price * this.orderUpdate.Quantity;
        return totalOrder
      },

      showStatus() {
        let show = ''
        this.$route.path === '/Orders/Deliverd' ? show = false : show = true
        return show
      },

      caclDate() {
        let newdate = new Date();
        let year = newdate.getFullYear().toString()
        let month = (newdate.getMonth() + 1).toString()
        let day = newdate.getDate()
        let hour = newdate.getHours().toString()
        let munite = newdate.getMinutes().toString()
        let seconde = newdate.getSeconds().toString()

        const date = `${year}-${month}-${day} ${hour}:${munite}:${seconde}`
        return date
      },

      showEditAction(){
         const show= this.$route.path==='/Orders/Confirmed' || this.$route.path==='/Orders/NewOrders' ? true : false
         return show
      },

      // ------------------------------- prepartion orders show in table start -------------------------------------


      // GET RECENT DATE
      recentDate() {
        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        let year = new Date().getFullYear()

        return {
          month,
          day,
          year
        }
      },

      // FILTER ORDERS BY DATE START
      filterByMonth() {
        let orders = []
        if (this.dateFilterOrders) {
          orders = this.orders.filter(ele => {
            return parseInt(ele.Date.split('-')[1], 10) === this.dateFilterOrders.dateSelected
          })
        }
        return orders
      },

      filterByDay() {
        let orders = []
        if (this.dateFilterOrders) {
          orders = this.orders.filter(ele => {
            return parseInt(ele.Date.split('-')[1], 10) === parseInt(this.dateFilterOrders.dateSelected.split('-')[
                1], 10) && // month
              parseInt(ele.Date.substring(7, 9), 10) === parseInt(this.dateFilterOrders.dateSelected.split('-')[2],
                10) // day
          })
        }
        return orders
      },

      filterByYear() {
        let orders = []
        if (this.dateFilterOrders) {
          orders = this.orders.filter(ele => {
            return parseInt(ele.Date.split('-')[0], 10) === this.dateFilterOrders.dateSelected
          })
        }
        return orders
      },

      filterByToday() {
        let orders = []
        if (!this.dateFilterOrders) {
          orders = this.orders.filter(ele => {
            return parseInt(ele.Date.split('-')[0], 10) === this.recentDate.year &&
              parseInt(ele.Date.split('-')[1], 10) === this.recentDate.month &&
              parseInt(ele.Date.substring(7, 9), 10) === this.recentDate.day
          })
        }
        return orders
      },


      ordersByFilter() {
        let orders = []
        if (this.dateFilterOrders.type === 'Month') {
          orders = this.filterByMonth
        } else if (this.dateFilterOrders.type === 'Day') {
          orders = this.filterByDay
        } else if (this.dateFilterOrders.type === 'Year') {
          orders = this.filterByYear
        } else if (!this.dateFilterOrders) {
          orders = this.filterByToday
        }
        return orders

      },

       // ------------------------------- prepartion orders show in table end -------------------------------------



      // ------------------------------------- STOCK PRODUCT START -------------------------------------

      // edit ===> get order and

      // EDIT ORDER
      CalcRecentStockProductInEdit() {
        let StockFinal = ''
        const newQuantity = this.orderUpdate.Quantity
        const lastQuantity = this.oldQuantityOrder
        const Product = this.allProducts.find(item => item.id === this.orderUpdate.productId)
        let recentStock = ''
        Product ? recentStock = Product.quantity : ''
        if (newQuantity > lastQuantity) {
          StockFinal = parseInt(recentStock) - (parseInt(newQuantity) - parseInt(lastQuantity))
        } else if (newQuantity < lastQuantity) {
          StockFinal = parseInt(recentStock) + (parseInt(lastQuantity) - parseInt(newQuantity))
        }
        return StockFinal
      },

      // DELETE ORDER
      StockPrdinOrderDelete() {

        let recentStock = ''
        const Product = this.allProducts.find(item => item.id === this.OrderDelete.productId)
        if (Product) {
          recentStock = parseInt(Product.quantity) + parseInt(this.OrderDelete.Quantity)
        }

        return recentStock

      },

      // ------------------------------------- STOCK PRODUCT START -------------------------------------



    },
    methods: {

      // ------------------------------------- MODAL -------------------------------------

      // HIDE
      hideModal() {
        this.$bvModal.hide('modalorder')
      },

      // EDIT ORDER 
      editOrder() {
        this.$store.dispatch('allOrders/ac_updateOrder',{
            id:this.orderUpdate.id,
            quantity:this.orderUpdate.Quantity,
            total: this.Total
          })
        this.$store.dispatch('allProducts/ac_updateQuantityProduct',{id:this.orderUpdate.productId,quantity:this.CalcRecentStockProductInEdit})
        this.hideModal()

      },


      // ------------------------------------- CHANGE SELECT START -------------------------------------

      //  STATUS 
      changeStatus(id, value) {
        this.updateStatusTable(id,value)
        this.statusSuivi = value
      },

      //  ACTION
      handleActionChange(ev, order) {

        const value = ev.target.value
        if (value === 'delete') {
          const userConfirmed = window.confirm("Do you really want to delete this order ?");
          this.OrderDelete = order
          if (userConfirmed) {
            this.StockPrdinOrderDelete()
            this.editStockProductInDeleteOrder()
            this.deletOrder(this.OrderDelete.id)
          }
        } else if (value === 'edit') {

          this.$bvModal.show('modalorder')
          this.orderUpdate = order
          this.oldQuantityOrder=order.Quantity
          this.Total

          

        } else if (value === 'send') {
          this.sendConversionStatusOrders()
          console.log(order.Status)
          this.$store.dispatch('allOrders/ac_changeStatusSuivi',{statusSuivi:order.Status,id:order.id})

        }
      },




      // ------------------------------------- CHANGE SELECT END -------------------------------------



      // ------------------------------------- FUNTION WITH BACKEND START -------------------------------------


      // UPDATE STATUS TABLE
      async updateStatusTable(id, value) {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.put(`${this.apiUrl}/api/order/statusTable/${id}`, {
            statustable: value
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data.message)
        } catch (error) {
          console.log(`error is ${error}`)
        }
      },

      async sendConversionStatusOrders() {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.post(`${this.apiUrl}/api/order/conversion`, {
            status: this.statusSuivi,
            date: this.caclDate
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data.message)

        } catch (error) {
          console.log(`error the conversion status order is ${error}`)
        }
      },

      // DELETE ORDER
      async deletOrder(id) {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.delete(`${this.apiUrl}api/order/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data.message)
        } catch (error) {
          console.log(`error is ${error}`)
        }
      },

      // delet con
      async deleteconversion(id) {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.delete(`${this.apiUrl}api/orderConversionStatus/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data.message)
        } catch (error) {
          console.log(`error delted convesion is ${error} `)
        }
      },


      // ------------------------------------- FUNTION WITH BACKEND END -------------------------------------



      // ------------------------------------- EDIT STOCK PRODUCT DATABASE START -------------------------------------


      // IN DELETE
      async editStockProductInDeleteOrder() {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.put(
            `${this.apiUrl}/api/productQuantity/${this.OrderDelete.productId}`, {
              quantity: this.StockPrdinOrderDelete
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          console.log(response.data.message)
        } catch (error) {
          console.log(`error the update stock is  : ${error}`)
        }
      },

      // ------------------------------------- EDIT STOCK PRODUCT DATABASE END -------------------------------------



      // ------------------------------------- SEARCH PRODUCT IN TABLE START -------------------------------------
      searchprd(val) {

        // GET VALUE IN INPUT
        let value = val.toLowerCase()
        // GET ALL TR - AND LOOP FOR EVERY TR
        let alltr = Array.from(this.$el.querySelector('tbody').children)
        alltr.forEach(tr => {

          let isVisible = Array.from(tr.children).some(td => {
            // CHECK EVERY TD.TEXTCONTENT
            let tdtext = td.textContent.toLowerCase();
            return tdtext.includes(value);
          });

          tr.style.display = isVisible ? '' : 'none';

        })
      },


      // SEND OK popup
      handleOk(bvModalEvent) {

        let inputPopup = this.$refs.inputPopup.$el.value
        inputPopup === '' ? (bvModalEvent.preventDefault(), this.stateInputPopup = false) : this.stateInputPopup = null

      },


      // ------------------------------------- FUNCTION STORE -------------------------------------
      ...mapActions('allProducts', {
        fetchProducts: 'ac_getProducts'
      }),

    },

    mounted() {
      this.fetchProducts()
      this.totalRows = this.orders.length
    }
  }
</script>


<style>
  #table-global {
    background: var(--couleur-primaire-1);
    padding: 41px 26px;
    border-radius: 12px;
  }


  #filter-input {
    background: transparent;
    height: 40px;
    color: white;
    border: 1px solid #6c757d;
  }


  #table-Order th {
    border-top: none;
    background-color: var(--couleur-primaire-1);
    color: var(--couleur-primaire-3);
  }

  #tbody td {
    background-color: var(--couleur-primaire-1);
    color: var(--couleur-primaire-3);
  }

  #select-sts .valuopton :hover {
    background-color: #cb0303
  }


  .selectstatus {
    border-radius: 13.25rem;
    font-weight: 700;
    font-size: 14px;
    height: 34px;
    border-radius: 13.25rem;
    padding: 0.375rem 0.75rem 0.375rem 0.75rem;
    width: auto;
  }


  .select {
    font-size: 13px;
  }



  #modal-1___BV_modal_backdrop_ {
    background-color: #00000026;
  }


  .popup {
    display: none;
  }

  #modal-footer-sm___BV_modal_footer_ :first-child {
    background-color: #cb0303;
    border: none;
  }

  #modal-footer-sm___BV_modal_footer_ :last-child {
    background-color: #04a820;
  }


  .bg-green {
    background: rgba(33, 150, 83, 0.1);
    color: #219653;
    font-size: 13px;
  }

  .Canceled {
    background-color: #FF6347;
    font-size: 13px;
  }

  .white {
    background-color: white;
    font-size: 13px;
  }
</style>


<b-form-select :options="options">
</b-form-select>