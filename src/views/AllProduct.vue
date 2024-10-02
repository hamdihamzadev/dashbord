<template>
    <section class="allproduts">
        <b-container fluid>
            <div class="row">
                <h1 class="col text-center fw-bolder">All products</h1>             
            </div>
            <div class="d-flex justify-content-between mt-5 flex-column flex-md-row gap-3">
                <!----- SEARCH INPUT ----->
                <SearchTable />
                <!----- add prduct ----->
                <AddProduct ref="componentAddprd" />
            </div>

            <!----- TABLE PRODUCT ----->
            <b-table responsive striped hover :items="allProducts" :fields="fields" sort-icon-left :per-page="perPage" :current-page="currentPage"  class="mt-2" id="my-table">

                <template #cell(Image)="image">
                    <b-img :src="image.value" alt="Responsive image" id="img-product"></b-img>
                </template>

                <template #cell(Category)="category">
                    <!-- show name without id -->
                    {{ category.value.name }}
                </template>

                <template #cell(Checked)="dataSelected">
                    <b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted"
                        @change="selectBox($event,dataSelected.item,dataSelected.index)">
                    </b-form-checkbox>
                </template>

                <template #cell(Action)="data">
                    <select class="form-select" aria-label="Select an action"
                        @change="handleActionChange($event,data.item)">
                        <option selected>Choose...</option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                    </select>
                </template>


            </b-table>

            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="my-table">
            </b-pagination>

        </b-container>

    </section>
</template>

<script>
    import AddProduct from '../views/products/AddProducts.vue'
    import SearchTable from '../components/SearchTable.vue'

    import {
        mapState,
        mapActions
    } from 'vuex';


    export default {
        name: 'AllProducts',
        components: {
            AddProduct,
            SearchTable
        },
        data() {
            return {
                sortBy: 'Date',
                sortDesc: true,
                fields: [{
                        key: 'Checked',
                        sortable: false
                    },
                    {
                        key: 'Image',
                        sortable: false,
                        tdClass: 'image-cell'
                    },

                    {
                        key: 'Name',
                        sortable: false
                    },
                    {
                        key: 'Price',
                        sortable: false
                    },
                    {
                        key: 'Category',
                        sortable: false
                    },

                    {
                        key: 'Quantity',
                        sortable: false
                    },

                    {
                        key: 'Description',
                        sortable: false
                    },

                    {
                        key: 'Date',
                        sortable: false
                    },
                    {
                        key: 'Action',
                        sortable: false
                    },

                ],
                Choose: 'Choose...',
                nameInput: '',
                NbrPrdDelete: 0,
                allPrdDelete: [],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
            }
        },

        computed: {
            ...mapState('allCategories', {
                allcategories: state => state.categories.map(ele => {
                    const obj = new Object
                    obj.name = ele.name
                    obj.id = ele._id
                    return obj
                })
            }),

            ...mapState('allProducts', {
                Products: state => state.Products  
            }),

            allProducts(){
                return this.Products
                .map(ele => {
                    const obj = new Object
                    obj.Image = ele.image
                    obj.Name = ele.name
                    obj.Price = ele.price
                    obj.Category={
                        id:this.allcategories.find(ctg=> ctg.id===ele.category) ? this.allcategories.find(ctg=> ctg.id===ele.category).id:'', 
                        name:this.allcategories.find(ctg=> ctg.id===ele.category) ? this.allcategories.find(ctg=> ctg.id===ele.category).name:''
                    }
                    obj.Quantity = ele.quantity
                    obj.Date = ele.date
                    obj.Description = ele.description
                    obj.id = ele._id
                    
                    return obj
                })
            }
           
        },

        methods: {

            selectBox(event, item) {

                if (event === 'accepted') {
                    this.NbrPrdDelete = this.NbrPrdDelete + 1
                    this.allPrdDelete.push(item)
                } else if (event === 'not_accepted') {
                    this.NbrPrdDelete = this.NbrPrdDelete - 1
                    this.allPrdDelete = this.allPrdDelete.filter(product => {
                        return product.Date !== item.Date
                    })
                }
                console.log(this.allPrdDelete)
            },

            handleActionChange(ev, item) {
                const value = ev.target.value
                if (value === "edit") {
                    this.$refs.componentAddprd.showmodalEdit(item)
                } else if (value === "delete") {
                    const userConfirmed = window.confirm("Do you really want to delete this product ?")
                    if (userConfirmed) {
                        this.$store.dispatch('allProducts/ac_deleteProduct',item.id)
                    }

                }

            },


            ...mapActions('allProducts', {
                fetchProducts: 'ac_getProducts'
            }),
            ...mapActions("allCategories", {
                fetchCategories: 'ac_getCategories'
            })

        },

        mounted() {
            this.fetchProducts()
            this.fetchCategories()
            this.totalRows = this.allProducts.length
        }

    }
</script>


<style scoped>
    .allproduts {
        margin-top: 23px;
    }

    #btn-addprd {
        width: 18%;
        height: 37px;
        color: white;
        border: none;
        border-radius: 6px;
        width: 16%;
        height: 37px;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .cursor {
        cursor: pointer;
    }

    thead tr th span {
        display: none;
    }

    #img-product {
        width: 100px;
        height: 100px
    }

    .image-cell {
        width: 141px;
    }
</style>