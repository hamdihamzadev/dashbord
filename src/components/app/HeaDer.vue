<template>
    <div id="header">
        <div class="container-fluid d-flex justify-content-between align-items-center py-3">
            <!------ BTN TOGGLE ------->
            <b-button id="btn-toggle" class="d-flex align-items-center h-50 d-none d-md-block " @click="toggle">
                <b-icon icon="list" aria-hidden="true"></b-icon> Menu
            </b-button>
            <!------ BTN TOGGLE PHONE ------->
            <b-icon icon="list" aria-hidden="true" @click="togglePhone" class="d-md-none fs-4"></b-icon>
            <!-------  LOGO BRAND PHONE   ------->
            <div class="logobrand d-block d-lg-none ">
                <img src="https://demo.plainadmin.com/assets/images/logo/logo-white.svg" alt="">
            </div>

            <!------ SEARCH ------->
            <b-nav-form class="d-none d-lg-flex  position-relative">
                <b-form-input size="sm" class="mr-sm-2 ml-2" placeholder="Search Page" id="search" @input="inputSearch"
                @focusout="handleFocusOut" >
                 
                </b-form-input>
                <div id="list-searchPage" class=" position-absolute mt-2 rounded z-3" >
                    <ul class="list-group">
                        <router-link class="list-group-item p-0" v-for="item in links" :key="item.id" tag="li"
                            :to="item.path" v-show="item.visibilte">
                            <a @click="clickLinkSearch" href="" class="text-decoration-none">{{ item.text }}</a>
                        </router-link>
                    </ul>
                </div>
            </b-nav-form>

            <!------ PROFILE MENU ------->

            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                    <b-avatar variant="info" :src="imageSrc" @click="toggleDropdown">
                        <template #badge>
                            <b-icon icon="arrow-down-circle-fill"></b-icon>
                        </template></b-avatar>
                </template>

                <b-dropdown-item href="#">Hello <strong>{{ nameUser }}</strong></b-dropdown-item>
                <b-dropdown-item href="#"> Notification</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item href="#" @click="logout">Log out <b-icon icon="box-arrow-in-right" variant="dark">
                    </b-icon>
                </b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'HeaDer',
        data() {
            return {
                imageSrc: require('@/assets/man.png'),
                listProfil: true,
                dropdownVisible: false,
                emailCurrentUser: '',
                nameUser: '',
                links: [{
                        path: '/DashBord',
                        text: 'DashBord',
                        visibilte: false

                    },
                    {
                        path: '/Orders/Addorder',
                        text: 'Add Order',
                        visibilte: false
                    },
                    {
                        path: '/Orders/NewOrders',
                        text: 'New Orders',
                        visibilte: false
                    },
                    {
                        path: '/Orders/Confirmed',
                        text: 'Confirmed',
                        visibilte: false
                    },
                    {
                        path: '/Orders/Shipped',
                        text: 'Shipped',
                        visibilte: false
                    },
                    {
                        path: '/Orders/Deliverd',
                        text: 'Deliverd',
                        visibilte: false
                    },
                    {
                        path: '/Orders/Return',
                        text: 'Return',
                        visibilte: false
                    },
                    {
                        path: '/Orders/Cancelled',
                        text: 'Cancelled',
                        visibilte: false
                    },
                    {
                        path: '/conversion',
                        text: 'Conversion',
                        visibilte: false

                    },
                    {
                        path: '/Products',
                        text: 'Products',
                        visibilte: false
                    },

                    {
                        path: '/Categories',
                        text: 'Categories',
                        visibilte: false

                    },

                    {
                        path: '/Customers/AddCustomer',
                        text: 'Add Customer',
                        visibilte: false
                    },
                    {
                        path: '/Customers/ListCustomers',
                        text: 'List Customers',
                        visibilte: false
                    },
                    {
                        path: '/Customers/TopCustomer',
                        text: 'Top Customer',
                        visibilte: false
                    },

                    {
                        path: '/Stock',
                        text: 'Stock',
                        visibilte: false

                    },
                    {
                        path: '/Statistics/top/category',
                        text: 'Top',
                        visibilte: false
                    },

                ],
                showListSearch: true,
                apiUrl: process.env.VUE_APP_API_URL
            }
        },


        methods: {

            async getUser() {
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.get(`${this.apiUrl}/api/getUser`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    this.nameUser = response.data.user.fullName
                } catch (error) {
                    console.log(`error for get user is ${error}`)
                }
            },
            toggle() {
                this.$emit('toggel-header')

            },
            togglePhone() {
                this.$emit('toggel-headerPhone')

            },

            toggleDropdown() {
                this.dropdownVisible = !this.dropdownVisible;
            },

            logout() {
                localStorage.removeItem('token')
                this.$router.push('/Login')
            },

            hideListLinkSearch(){
                this.links.forEach(ele=> ele.visibilte===true?ele.visibilte=false:ele.visibilte=false)
            },

            inputSearch(value) {
                if( value!==''){
                    this.links.forEach(ele => ele.text.toLowerCase().includes(value.toLowerCase()) ? ele.visibilte = true : ele.visibilte = false)
                }else if(value===''){
                   this.hideListLinkSearch()
                }

            },

            // OnFocusSearch() {
            //     this.links.forEach(ele=> ele.visibilte===true)
            // },

            handleBlur() {
                this.links.forEach(ele=> ele.visibilte===true?ele.visibilte=false:ele.visibilte=false)
            },

            clickLinkSearch(){
                this.hideListLinkSearch()
            },
            handleFocusOut(){
                setTimeout(()=>this.hideListLinkSearch(),200)
            }
          


        },

        mounted() {
            this.getUser()
        }

    }
</script>

<style lang="scss">
    #header {
        background-color: var(--couleur-primaire-1);

        .navbar {
            height: 77px;
        }
    }

    #btn-toggle {
        background-color: var(--couleur-primaire-4);
        border: none;
        gap: 10px;

    }

    #search {
        height: 43px;
        width: 256px;
        background-color: transparent;
        padding-left: 14px;
        border: 1px solid var(--couleur-primaire-2);
        color: var(--couleur-primaire-3);
        &::placeholder{
            color: var(--couleur-primaire-2)
        } 
        &:focus{
            box-shadow: none;
            border-color: var(--couleur-primaire-3);
        }
    }

    #list-searchPage {

        font-size: 14px;
        width: -webkit-fill-available;

        ul {
            li {
                background-color: var(--couleur-primaire-2);
                border: none;

                &:hover {
                    background-color: var(--couleur-primaire-3)
                }

                a {
                    color: var(--couleur-primaire-1);
                    display: block;
                    padding: 8px 16px;
                }
            }

        }
    }



    #btn-search {
        height: 45px;
        width: 81px;
    }

    .prof {
        font-size: 12px;
        margin: 0px;
    }

    #img-profil {
        object-fit: cover;
    }

    // btn dropdown

    #__BVID__44__BV_toggle_ {
        padding: 0px;
    }

    /* Style for tablets (less than de 992px) */
    @media (max-width: 991.98px) {}

    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
        // btn dropdown

        #__BVID__44__BV_toggle_ {
            padding: 0px;
        }
    }
</style>