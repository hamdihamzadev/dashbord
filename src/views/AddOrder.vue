<template>
    <section class="addOrder pb-5">
        <b-container fluid>
            <h1 class="text-center mb-3"> <strong>Add new order</strong> </h1>
            <form id="form" class="p-4">
                <div class="row">
                    <b-form-group class="col-12 mb-4" id="select-product" label="Customers:" label-for="selectCategory">
                        <b-form-select v-model="customerSelected" class="w-100" id="select-product"
                            :options="AllCustomers" required>
                        </b-form-select>
                        <p class="text-danger" v-show="error.customer">Select your customer</p>

                    </b-form-group>

                    <div class="col-12 d-flex flex-column">
                        <b-form-group class=" mb-4 mt-4" id="select-product" label="Product:"
                            label-for="selectCategory">
                            <b-dropdown id="select-product" text="Select a product" menu-class="w-100" class="w-100">
                                <b-dropdown-item @click="onProductChange(product.value,product.text)"
                                    v-for="product in allProducts" :key="product.value.id">
                                    <div class="d-flex align-items-center gap-4  border  rounded p-2">
                                        <img :src="product.text.image" alt="" class="img-thumbnail mr-2"
                                            style="width: 50px; height: auto;">
                                        {{ product.text.name }}
                                    </div>
                                </b-dropdown-item>
                            </b-dropdown>
                            <p class="text-danger" v-show="error.product">Select your product</p>
                        </b-form-group>

                        <div class="d-flex align-items-center gap-4  border  rounded p-2 mb-4 mt-4">
                            <img :src="ProductSelectedText.image" alt="" class="img-thumbnail mr-2"
                                style="width: 50px; height: auto;">
                            {{ ProductSelectedText.name }}
                        </div>
                    </div>

                    <b-form-group class="col-6 mb-4 mt-4" id="input-price" label="Price:" label-for="input-1">
                        <b-form-input v-model="ProductSelected.price" id="input-1" type="number"
                            placeholder="Enter price product" disabled required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4 mt-4" label="Quantity:" label-for="input-1">
                        <b-form-spinbutton id="sb-quantity" v-model="Quantity" min="1" :max="ProductSelected.quantity"
                            style="height: 37px;"></b-form-spinbutton>
                    </b-form-group>

                    <b-form-group class="col-12 mb-4" id="input-price" label="Total:" label-for="input-1">
                        <b-form-input v-model="Total" id="input-1" type="number" placeholder="Total order" required>
                        </b-form-input>
                    </b-form-group>
                    <p v-show="stockout" class="text-danger text-center">Stock out</p>
                    <div  >
                        <b-button class="w-100 mt-4 d-flex align-items-center justify-content-center " variant="primary" id="btn-addprd" @click="addOrder"
                            :disabled="stockout">
                            <b-icon icon="plus" font-scale="2"></b-icon>Add Order
                        </b-button>
                    </div>
                </div>
            </form>
        </b-container>

    </section>
</template>

<script>
    import axios from 'axios';
import { mapActions, mapState } from 'vuex';
    export default {
        name: 'AddOrder',
        data() {
            return {
                customerSelected: '',
                ProductSelected: '',
                Quantity: 1,
                formOrder: {
                    customer: '',
                    product: '',
                    quantity: '',
                    total: '',
                    date: '',
                    statussuivi:'New',
                    statustable:'Not treat',
                    conversionStatus:'New'
                },
                error: {
                    customer: false,
                    product: false,
                },
                ProductSelectedText: '',
                apiUrl:process.env.VUE_APP_API_URL
            }
        },

        computed: {

            ...mapState('allCustomers',{
                AllCustomers:state=>state.customers
                .filter(ele=> ele.isDeleted===false)
                .map(ele => {
                        let obj = new Object
                        obj.text = ele.name + '-' + ele.gmail
                        obj.value = ele._id
                        return obj
                    })
            }),

            ...mapState('allProducts',{
                allProducts:state=>state.Products.map(ele => {
                        const obj = new Object
                        obj.text = {
                            name: ele.name,
                            image: ele.image
                        }
                        obj.value = {
                            id: ele._id,
                            quantity: ele.quantity,
                            price: ele.price,
                        }
                        return obj
                    })
            }),

            Total() {
                const total = this.Quantity * this.ProductSelected.price
                return total
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

            // Calc quantity product after enter order
            quantity() {
                const quantityProduct = this.ProductSelected.quantity - this.Quantity
                return quantityProduct
            },

            stockout() {
                if (this.ProductSelected.quantity === 0) {
                    return true
                } else {
                    return false
                }
            }
        },

        methods: {

            onProductChange(value, text) {
                this.ProductSelected = value
                this.ProductSelectedText = text

            },

            addOrder() {
                this.valideForm()
                if (this.error.customer === false && this.error.product === false) {
                    this.formOrder.customer = this.customerSelected
                    this.formOrder.product = this.ProductSelected.id
                    this.formOrder.quantity = this.Quantity
                    this.formOrder.total = this.Total
                    this.formOrder.date = this.caclDate
                    // this.postOrder()
                    let order=this.formOrder
                    this.$store.dispatch('allOrders/ac_addOrder',order)
                    this.sendConversionStatusOrders()
                    this.editQuantity()
                    this.RestValues()
                   
                }

            },

            async editQuantity() {
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.put(
                        `${this.apiUrl}/api/productQuantity/${this.formOrder.product}`, {
                            quantity: this.quantity
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                    console.log(response.data.message)
                } catch (error) {
                    console.log(`error the update is  : ${error}`)
                }
            },

            async sendConversionStatusOrders(){
                try{
                    const token=localStorage.getItem('token')
                    const response=await axios.post(`${this.apiUrl}/api/order/conversion`,{
                        status:'New',
                        date:this.caclDate
                    },{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    console.log(response.data.message)

                }
                catch(error){
                    console.log(`error the conversion status order is ${error}`)
                }
            },

            // validat form
            valideForm() {
                this.customerSelected === '' ? this.error.customer = true : this.error.customer = false
                this.ProductSelected === '' ? this.error.product = true : this.error.product = false
            },
            
            // Reset values 
            RestValues() {
                this.customerSelected = ''
                this.ProductSelecte = ''
                this.ProductSelected.price = ''
                this.ProductSelectedText = ''
                this.Quantity=1

            },
            ...mapActions('allProducts',{
                fetchProducts:'ac_getProducts'
            }),
            ...mapActions('allCustomers',{
                fetchCustomers:'ac_getCustomers'
            }),

   
        },

        mounted() {
            this.fetchProducts()
            this.fetchCustomers()
        }
    }
</script>

<style scoped>
    #btn-addorder {
        background-color: var(--couleur-primaire-4);
    }

    #select-product {
        height: 37px;
        border-radius: 0.375rem;
    }

    #sb-quantity {
        height: 37px;
        border-radius: 0.375rem;
    }

    #form {
        background-color: var(--couleur-primaire-1);
        border-radius: 12px;
    }

    #select-product__BV_toggle_ {
        width: 100%;
    }
</style>