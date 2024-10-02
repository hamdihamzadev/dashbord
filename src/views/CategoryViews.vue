<template>
    <section class="allcategories">
        <b-container fluid>
            <h1 class="text-center fw-bolder mb-4">All categories</h1>
            <b-row class="align-items-center justify-content-between">
                <!----- search category ----->
                <b-col sm="6">
                    <b-input-group size="sm">
                        <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search">
                        </b-form-input>
                    </b-input-group>

                </b-col>
                <!----- add category ----->
                <b-col sm="4">
                    <b-button class="d-flex justify-content-center align-items-center " variant="primary"
                        id="btn-addCtg" @click="btnaddCtg">
                        <b-icon icon="plus" font-scale="2"></b-icon>Add category
                    </b-button>
                </b-col>

            </b-row>

            <!---------- MODAL ADD CATEGORY --------------->

            <b-modal id="modalAddcategory" ref="modalPostpond" title="Create your category">
                <form ref="form">
                    <div class="row">
                        <b-form-group class="col mb-4" id="input-name" v-model="category.name" label="Name:"
                            label-for="input-1">
                            <b-form-input v-model="category.name" id="input-1" type="text"
                                placeholder="Enter name product" required>
                            </b-form-input>
                        </b-form-group>

                        <b-form-group class="col-12 mb-4" id="input-quantity" label="Image:" label-for="input-4">
                            <b-form-file class="mt-3" @change="onFileChange" plain></b-form-file>
                            <img :src="imageUpload" alt="" srcset="" class="w-50 mt-2">
                        </b-form-group>
                    </div>
                </form>
                <template #modal-footer>
                    <b-button variant="secondary" @click="hideModal">Cancel</b-button>
                    <b-button variant="primary" @click="handleModal">{{ textBtnModal }}</b-button>
                </template>
            </b-modal>

            <!----- TABLE PRODUCT ----->
            <b-table responsive striped hover :filter="filter" :items="itemsCategories" :fields="fields" class="mt-2"
                sort-icon-left id="my-table" :current-page="currentPage">

                <template #cell(Image)="dataimage">
                    <b-img :src="dataimage.value" alt="Responsive image" id="img-ctg"></b-img>
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

    import {
        mapActions,
        mapState
    } from 'vuex';
    export default {
        name: "CategoryViews",
        data() {
            return {
                category: {
                    name: '',
                    image: ''
                },
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
                        key: 'Products',
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
                filter: null,
                imageShow: '',
                imageUpload: '',
                textBtnModal: '',
                idCtgUpdDlt: '',
                teets: '',
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                apiUrl: process.env.VUE_APP_API_URL,

            }
        },

        computed: {
            ...mapState('allProducts', {
                allProducts: state => state.Products
            }),
            ...mapState('allCategories', {
                allCategories: state => state.categories
            }),

            itemsCategories() {
                return this.allCategories
                    .map(ele => {
                        const obj = new Object
                        obj.Image = ele.image
                        obj.Name = ele.name
                        obj.Products = this.allProducts.filter(prd => prd.category === ele._id).length
                        obj.Date = ele.updatedAt.slice(0, 10)
                        obj.id = ele._id
                        return obj
                    })
            }
        },

        methods: {

            // MODAL FUNCTION
            hideModal() {
                this.$bvModal.hide('modalAddcategory')
            },

            btnaddCtg() {
                this.textBtnModal = 'Create'
                this.$bvModal.show('modalAddcategory')
            },

            // action modal
            handleModal() {
                if (this.textBtnModal === 'Update') {
                    const id = this.idCtgUpdDlt
                    const formCategoryUpdate = new FormData()
                    formCategoryUpdate.append('name', this.category.name)
                    formCategoryUpdate.append('image', this.category.image)
                    this.$store.dispatch('allCategories/ac_updateCategory',{id,formCategoryUpdate})
                    this.hideModal()
                } else if (this.textBtnModal === 'Create') {
                    const formData = new FormData()
                    formData.append('name', this.category.name)
                    formData.append('image', this.category.image)
                    this.$store.dispatch('allCategories/ac_addCategory', formData)
                    this.hideModal()
                }
            },
            
            // action table
            handleActionChange(ev, data) {
                this.idCtgUpdDlt = data.id
                if (ev.target.value === 'edit') {
                    // change content modal
                    this.textBtnModal = 'Update'
                    this.category.name = data.Name
                    this.imageUpload = data.Image
                    this.$bvModal.show('modalAddcategory')
                } else if (ev.target.value === 'delete') {
                    // delete category
                    const userConfirmed = window.confirm("Do you really want to delete this category ?");
                    const id = this.idCtgUpdDlt
                    if (userConfirmed) {
                        this.$store.dispatch('allCategories/ac_deleteCategory', id)
                    }
                }
            },

            onFileChange(event) {
                const file = event.target.files[0]
                if (file) {
                    this.category.image = file
                    this.imageUpload = URL.createObjectURL(file)
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
            this.totalRows = this.itemsCategories.length
        }


    }
</script>

<style>
    #img-ctg {
        width: 100px;
        height: 100px
    }

    .image-cell {
        width: 141px;
    }

    #filter-input {
        padding-block: 22px;
    }

    #filter-input::placeholder {
        color: rgb(184, 184, 184)
    }

    #filter-input:active {
        box-shadow: none;
        border-bottom: white;

    }

    #btn-addCtg {
        width: 100%;
    }

    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
        #btn-addCtg {
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%, -50%) translate(0px, 10px);
            width: 95%;
        }
    }
</style>