<template>
    <section id="section-topCustomer" class="pb-5">
        <b-container class="p-4" fluid>
            <b-row>
                <b-col><h1 class="text-center fw-bolder mb-4">Top Customers</h1></b-col>
                <!-- Filter customers -->
                 <b-col sm="12" >
                    <FilterCustomer  @send-customersfilter="getCustomesFilter"/>
                 </b-col>
                <!-- list customers -->
                <b-col cols="12" lg="6" class="p-0">
                    <ListTopCustomers :customers="listcustomers" @send-Customer="getCustomerSelected" />
                </b-col>
                <!-- TABLE CUSTOMER -->
                <b-col lg="6" class="p-md-0 p-lg-2">
                    <TableCustomers ref="ComponentTableCustomers" :customer="customerSelected" />
                </b-col>


            </b-row>
        </b-container>
    </section>
</template>

<script>

import FilterCustomer from '../topcustomers/FilterCustomer.vue'
    import ListTopCustomers from '../topcustomers/ListTopCustomers.vue'
    import TableCustomers from '../topcustomers/TableCustomers.vue'
    export default {
        name: 'TopCustomer',
        data() {
            return {
            
                active: '',
                customerSelected: '',
                listcustomers: '',

            }
        },
        components: {
            ListTopCustomers,
            TableCustomers,
            FilterCustomer
            
        },


        methods: {
            getCustomerSelected(payload) {
                this.customerSelected = payload.customer
                this.$refs.ComponentTableCustomers.openModalPhone()

            },
            getCustomesFilter(payload){
                this.listcustomers=payload.customersFilter
                
            }
        },

       

    }
</script>


