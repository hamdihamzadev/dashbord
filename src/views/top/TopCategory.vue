<template>
    <div class="p-3" id="top-category">
        <FilterGlobal @send-filter="getFilter" />
        <b-table class="mt-4 mt-md-0" responsive striped hover :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
            <template #cell(Percentage)="data">
                <b-progress :max="max">
                    <b-progress-bar :value="data.item.Percentage" :label="`${data.item.Percentage}%`">
                    </b-progress-bar>
                </b-progress>
            </template>
        </b-table>
        <p class="text-center" v-show="items.length===0"><strong>No orders in this month</strong></p>

    </div>
</template>

<script>
    import FilterGlobal from '@/components/FilterGlobal.vue'
    
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'TopCategory',
        components: {
            FilterGlobal
        },
        data() {
            return {

                fields: [{
                        key: 'Name',
                        sortable: false
                    },
                    {
                        key: 'Orders',
                        sortable: true
                    },
                    {
                        key: 'PercentageOr',
                        sortable: false
                    },

                    {
                        key: 'Revenue',
                        sortable: true
                    },
                    {
                        key: 'PercentageRv',
                        sortable: false
                    },


                ],
                max: 100,
                sortBy: 'Orders',
                sortDesc: true,
                filter: '',

            }


        },

        computed: {

            // STORE ALL ORDERS
            ...mapState('allOrders', {
                allOrders: state => state.orders
            }),

            // STORE ALL CATEGORIES
            ...mapState('allCategories', {
                allCategories: state => state.categories.map(ele=>{return {id:ele._id,name:ele.name}})
            }),
          
            createObjCtg() {
                let categories =this.allCategories.map(ele=>{
                    const Name=ele.name
                    const Orders=this.getOrdersMonth.filter(order=> order.product.category._id===ele.id).length
                    let percentageOrCalc=Math.round(Orders/this.getOrdersMonth.length*100)
                    const PercentageOr=`${isNaN(percentageOrCalc)?0:percentageOrCalc} %`
                    const Revenue=`${this.getOrdersMonth.filter(order=> order.product.category._id===ele.id).reduce((acc,order)=>acc+order.total,0)} $`
                    const rv=this.getOrdersMonth.filter(order=> order.product.category._id===ele.id).reduce((acc,order)=>acc+order.total,0)
                    const PercentageRvCalc=Math.round(rv/this.getOrdersMonth.reduce((acc,order)=>acc+order.total,0)*100)
                    const PercentageRv=`${isNaN(PercentageRvCalc)?0:PercentageRvCalc} %`
                    return {Name,Orders,PercentageOr,Revenue,PercentageRv}
                })
                return categories
            },

            // filer by orders
            filerByOrders(){
               const result= this.createObjCtg.filter(ele=> ele.Orders>=this.filter.sort.min && ele.Orders<=this.filter.sort.max  )
               return result
            },
                  

            // filer by sales
            filerBySales(){
               const result= this.createObjCtg.filter(ele=> Number(ele.Revenue.split(' ')[0])>=this.filter.sort.min && Number(ele.Revenue.split(' ')[0])<=this.filter.sort.max  )
               return result
            },
                  
            items(){
                let result=''
                if(!this.filter || this.filter.type==='All'){
                    result=this.createObjCtg
                }
                else if(this.filter.type==='Orders'){
                    result=this.filerByOrders
                }
                else if(this.filter.type==='Sales'){
                    result=this.filerBySales
                }
                return result
            },


            getOrdersMonth() {
                let orders=''
                if(this.filter){
                    orders=this.allOrders.filter(ele => Number(ele.date.split('-')[1]) === this.filter.month)
                }else{
                    orders=this.allOrders.filter(ele => Number(ele.date.split('-')[1]) === new Date().getMonth()+1)
                }
                                    
                return orders
            },


        },

        methods: {
            getFilter(payload) {
                this.filter = payload
            },

            ...mapActions('allOrders', {
                fetchOrders: 'ac_getOrders'
            }),
            ...mapActions('allCategories', {
                fetchCategories: 'ac_getCategories'
            }),

        },

        mounted() {
            this.fetchOrders()
            this.fetchCategories()
            this.month = this.selectCurrentMonth
        }
    }
</script>


<style scoped>
    #para-filter {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    #para-filter::before {
        content: "";
        display: block;
        width: 4px;
        height: 17px;
        background: #ffffff;
        border-radius: 10px;
    }

    #btn-filter {
        background: #3c5df5;
        border: none;
    }

    #container-month {
        background: #3c5df5;
        padding-inline: 7px;
    }

    #select-mois {
        background: #3c5df5;
        color: white;
        border: none;
    }

    #top-category {
        background-color: var(--couleur-primaire-1)
    }

    #icon-category {
        color: #14142d;
        background: white;
        margin-right: 7px;
        padding: 3px;
        border-radius: 3px;
    }

    /** filter */
    #input-filter {
        width: 70%;
        border-radius: 0 0.375rem 0.375rem 0;
        border-color: #3a5aec;
        background-color: transparent;
        color: #3a5aec;
    }

    #input-filter::placeholder {
        color: #3a5aec;
    }

    #select-filter {
        width: 27%;
        border-radius: 0.375rem 0 0 0.375rem;
        border-color: #6c757d;
        background-color: #3a5aec;
        color: white;
    }

    #input-filter:focus {
        box-shadow: none;
        color: #3a5aec;

    }

    #icon-bag {
        font-size: 22px;

    }

    #container-form {
        background: #eaeaea;
        margin-top: 11px;
        padding: 10px 18px;
        width: 300px;
        left: -62px;
        border-radius: 8px;
        box-shadow: 0px 15px 63px 14px rgba(0, 0, 0, 0.33);
        -webkit-box-shadow: 0px 15px 63px 14px rgba(0, 0, 0, 0.33);
        -moz-box-shadow: 0px 15px 63px 14px rgba(0, 0, 0, 0.33);
    }

    #btn-changeFilter {
        background-color: #3a5aec;
    }

    #para-form {
        color: #3a5aec;
        font-weight: 700;
    }
</style>