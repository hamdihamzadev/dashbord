<template>
    <div class="stock">
        <b-container fluid>

            <h1 class="col text-center fw-bolder">Stock Products</h1>
               
                <b-row class="mt-5 justify-content-between gap-2 gap-md-0 ">
                     <!----- SEARCH INPUT ----->
                    <b-col md="4" lg="3" >
                        <b-form-input class="w-100" id="search-input" type="search" placeholder="Search product " @input="searchprd">
                        </b-form-input>
                    </b-col>
                    <b-col md="4" lg="3">  
                        <!----- FILTER INPUT ----->
                        <b-form-select class="w-100 px-2 " size="sm" id="input-filter" :options="optionsFilter" v-model="selected">
                        </b-form-select>
                    </b-col>
                </b-row>

            <b-row>
                <b-col cols="6" md="4" lg="2" class="mt-5" v-for="prd in ShowProductStock" :key="prd.id"
                    id="stockProduct">

                    <b-row id="productStock" class="row d-flex align-items-center mb-4 ">
                        <b-col cols="12" class="d-flex align-items-md-start align-items-center flex-column gap-2 ">
                            <div id="cont-img-pr">
                                <img :src="prd.image" alt="" srcset="" id="img-prd">
                            </div>
                            <div class="w-100 d-flex justify-content-between align-items-center">
                                <h6 class=" mb-2 mb-md-0"> {{ prd.name }} </h6>
                                <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                                    <template #button-content>
                                        <i class='bx bx-dots-horizontal-rounded'></i>
                                    </template>
                                    <b-dropdown-item href="#" @click="showModalAddStock(prd.id,prd.quantity)"> <span
                                            id="icon-action">+</span> Add to
                                        stock
                                    </b-dropdown-item>
                                    <b-dropdown-item href="#" @click="showModalSubsStock(prd.id,prd.quantity)">
                                        <span id="icon-action">-</span> Subtract from stock</b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </b-col>
                        <b-col cols="12" id="title">
                            <b-progress :value="prd.quantity" :max="max" show-progress class="mb-3"
                                :variant=prd.variant>
                            </b-progress>
                        </b-col>
                    </b-row>
                    <hr>

                </b-col>
            </b-row>

            <!-- MODAL STOCK -->
            <b-modal id="modal-Stock" ref="modal" title="Add stock" @ok="addOrsubQuantity" :ok-title="BtnModal">
                <form ref="form">
                    <b-form-group :label="textmodal" label-for="name-input" :invalid-feedback="msgInvalidInput"
                        :state="stateInputStock">
                        <b-form-input id="name-input" v-model="quantityModal" :state="stateInputStock" type="number"
                            required>
                       </b-form-input>
                       
                    </b-form-group>
                </form>
            </b-modal>

        </b-container>
    </div>
</template>

<script>
  
    import {
        mapActions,
        mapState
    } from 'vuex';
    export default {
        name: 'StockProduct',
        data() {
            return {
                max: 100,
                valuepo: 50,
                selected: 'All products',
                msgInvalidInput: '',
                optionsFilter: [{
                        value: 'All products',
                        text: 'All products'
                    },

                    {
                        value: 'Suffisant',
                        text: 'Suffisant'
                    },
                    {
                        value: 'Acceptable',
                        text: 'Acceptable'
                    },
                    {
                        value: 'Faible',
                        text: 'Faible'
                    },
                    {
                        value: 'Épuisé',
                        text: 'Épuisé'
                    },

                ],
                stateInputStock: null,
                categoryPrdStock: '',
                indexPrdStock: '',
                Send: 'Add Stock',
                ActionDropdown: '',
                ProductsFromDataBase: '',
                textmodal: '',
                BtnModal: '',
                productUpdatedQuantity: {
                    id: '',
                    quantity: ''
                },
                quantityModal: '',
            }
        },

        computed: {

            // STORE ALL PRODUCTS
            ...mapState('allProducts', {
                allProducts: state => state.Products.filter(ele=> ele.isDeleted===false )
            }),

            createobjProducts() {
                let products = this.allProducts.map(ele => {
                    const obj = new Object
                    obj.name = ele.name
                    obj.image = ele.image
                    obj.id = ele._id
                    obj.quantity = ele.quantity
                    obj.variant = this.getProgressVariant(ele.quantity)
                    return obj
                })
                return products
            },

            ShowProductStock() {
                let result
                switch (this.selected) {
                    case 'Suffisant':
                        result = this.createobjProducts.filter(product => {
                            return Math.round(product.quantity) >= 75
                        })
                        break;

                    case 'Acceptable':
                        result = this.createobjProducts.filter(product => {
                            return Math.round(product.quantity) >= 45 && Math.round(product
                                .quantity) < 75
                        })
                        break;

                    case 'Faible':
                        result = this.createobjProducts.filter(product => {
                            return Math.round(product.quantity) >= 10 && Math.round(product
                                .quantity) < 45
                        })
                        break;

                    case 'Épuisé':
                        result = this.createobjProducts.filter(product => {
                            return Math.round(product.quantity) < 10
                        })
                        break;
                    default:
                        result = this.createobjProducts

                }
                return result
            }

        },

        methods: {

            getProgressVariant(valueProgres) {
                if (valueProgres >= 90) {
                    return 'success';
                } else if (valueProgres >= 70) {
                    return 'primary';
                } else if (valueProgres >= 50) {
                    return 'warning';
                } else {
                    return 'danger';
                }
            },

            showModalAddStock(id, quantity) {
                this.$bvModal.show('modal-Stock')
                this.textmodal = 'Please add number quantity to your prdouct'
                this.BtnModal = "Add"
                this.productUpdatedQuantity.id = id
                this.productUpdatedQuantity.quantity = quantity
            },

            showModalSubsStock(id, quantity) {
                this.$bvModal.show('modal-Stock')
                this.textmodal = 'Please substract number quantity to your prdouct'
                this.BtnModal = 'Substract'
                this.productUpdatedQuantity.id = id
                this.productUpdatedQuantity.quantity = quantity
            },

            addOrsubQuantity() {
                if (this.BtnModal === "Add") {
                    this.productUpdatedQuantity.quantity = parseInt(this.productUpdatedQuantity.quantity) + parseInt(
                        this.quantityModal)
                        this.$store.dispatch('allProducts/ac_updateQuantityProduct',{id:this.productUpdatedQuantity.id,quantity:this.productUpdatedQuantity.quantity})
                        window.location.reload()
                } else if (this.BtnModal === "Substract") {
                    this.productUpdatedQuantity.quantity = parseInt(this.productUpdatedQuantity.quantity) - parseInt(
                        this.quantityModal)
                        this.$store.dispatch('allProducts/ac_updateQuantityProduct',{id:this.productUpdatedQuantity.id,quantity:this.productUpdatedQuantity.quantity})
                        window.location.reload()
                }
            },


            
            searchprd(value) {
                let Products = Array.from(this.$el.querySelectorAll('#stockProduct'))

                Products.forEach(prd => {
                    let nameProduct = prd.children[0].children[0].lastChild.firstChild.textContent.toLowerCase()
                    prd.style.display = nameProduct.includes(value.toLowerCase()) ? '' : 'none'
                })
            },



            ...mapActions('allProducts', {
                fetchProducts: 'ac_getProducts'
            })
        },

        mounted() {
            this.fetchProducts()
        }


    }
</script>

<style scoped>
    .stock {
        padding-top: 23px;
        padding-bottom: 23px;
    }

    #stock-con {
        background: #14142d;
        margin-inline: 3px;
        border-radius: 24px;
        padding-inline: 20px;
        padding-top: 39px;
        padding-bottom: 39px;

    }



    #input-filter {
        height: 37px;
        background: var(--couleur-primaire-4);
        color: white;
        border: none;
        border-radius: 6px;
    }

    #search-input {
        height: 37px;
        background: transparent;
        border-color: var(--couleur-primaire-2);
    }

    #search-input::placeholder {
        color: var(--couleur-primaire-2);
    }

    #search-input:focus {
        color: white;
        box-shadow: none;
        border-color: var(--couleur-primaire-3);
    }

    hr {
        width: 100%;
        margin: auto;
        border: 1px solid #365cf5;
        border-radius: 26px;
    }

    .success {
        background-color: green;
    }

    .warning {
        background-color: yellow;
    }

    #__BVID__87__BV_toggle_ {
        padding: 0px !important;
    }


    #icon-action {
        font-size: 20px;
        margin-right: 8px;
    }

    #cont-img-pr {
        width: 200px;
        height: 200px;
        border-radius: 10px
    }

    #img-prd {
        width: 100%;
        height: 100%;
        object-fit: scale-down;

    }

    p {
        margin: 0px;
        padding: 0px;
    }





    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
        #cont-img-pr {
            width: 150px;
            height: 150px;
            border-radius: 10px
        }

        #img-prd {
            width: 100%;
            height: 100%;
            object-fit: scale-down;

        }


    }
</style>