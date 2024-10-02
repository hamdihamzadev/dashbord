<template>
  <div class="aside"  :class="{'showSidePhone':isHiddenAsidPhone}"  id="aside">
    
    <div class="nav-aside">
      <div class="logobrand d-none d-lg-block ">
        <img src="https://demo.plainadmin.com/assets/images/logo/logo-white.svg" alt="">
      </div>

      <!------ BTN TOGGLE PHONE ------->
      <b-icon icon="list" aria-hidden="true" @click="toggleMenuAsidePhone" class="d-lg-none fs-4" id="icon-menu" ></b-icon>

      <div class="links ">
        <ul>
          <router-link v-for="(item,index) in links" :key="item.id" :to="item.path?item.path:actualPath" tag="li">
            <a href="" v-b-toggle="item.collapseId" @click="toggleaActive(index)"
              :class="{'active':ActiveIndex===index}">
              <i :class='item.iconLink'></i>{{ item.text }}<i class='bx bxs-chevron-up' v-show="item.arrowCollapse"></i>
            </a>

            <b-collapse :id="item.collapseId" class="mt-3 mb-3">
              <router-link v-for="(itemCopls,indexChild) in item.childPath" :key="itemCopls.id" :to="itemCopls.path"
                tag="li">
                <a href="" @click="toggleaActiveChild((indexChild+ 1).toString().padStart(3, `${0}${index}`))"
                  id="linkdrop"
                  :class="{'active':ActiveIndex===(indexChild+1).toString().padStart(3,`${0}${index}`)}">{{ itemCopls.text }}
                </a>
              </router-link>
            </b-collapse>

          </router-link>
        </ul>

      </div>

    </div>
  </div>
</template>

<script>
  export default {

    name: 'SideBar',
    props: ['isHiddenAsidPhone'],
    data() {
      return {
        links: [{
            path: '/DashBord',
            text: 'DashBord',
            iconLink: 'bx bxs-pie-chart-alt'

          },
          {
            text: 'Orders',
            iconLink: 'bx bxs-cart-alt',
            collapseId: 'collapseOrders',
            arrowCollapse: true,
            childPath: [{
                path: '/Orders/Addorder',
                text: 'Add Order'
              },
              {
                path: '/Orders/NewOrders',
                text: 'New Orders'
              },
              {
                path: '/Orders/Confirmed',
                text: 'Confirmed'
              },
              {
                path: '/Orders/Shipped',
                text: 'Shipped'
              },
              {
                path: '/Orders/Deliverd',
                text: 'Deliverd'
              },
              {
                path: '/Orders/Return',
                text: 'Return'
              },
              {
                path: '/Orders/Cancelled',
                text: 'Cancelled'
              },
            ]

          },
          {
            path: '/conversion',
            text: 'Conversion',
            iconLink: 'bx bxs-pie-chart-alt-2',
          },
          {
            path: '/Products',
            text: 'Products',
            iconLink: 'bx bxs-shopping-bag-alt',

          },

          {
            path: '/Categories',
            text: 'Categories',
            iconLink: 'bx bxs-category',
          },

          {
            text: 'Customers',
            iconLink: 'bx bx-user',
            collapseId: 'collapseCustomers',
            arrowCollapse: true,
            childPath: [{
                path: '/Customers/AddCustomer',
                text: 'Add Customer'
              },
              {
                path: '/Customers/ListCustomers',
                text: 'List Customers'
              },
              {
                path: '/Customers/TopCustomer',
                text: 'Top Customer'
              },
            ]

          },

          {
            path: '/Stock',
            text: 'Stock',
            iconLink: 'bx bxs-doughnut-chart'

          },

          {
            text: 'Statistics',
            iconLink: 'bx bxs-bar-chart-alt-2',
            collapseId: 'collapseStatistics',
            arrowCollapse: true,
            childPath: [{
              path: '/Statistics/top/category',
              text: 'Top'
            }, ]

          },

        ],
        ActiveIndex: '',

      }
    },

    computed: {
      actualPath() {
        let path = this.$route.path
        return path
      },

    },

    methods: {
      toggleaActive(index) {
        this.ActiveIndex = index
      },
      toggleaActiveChild(index) {
        this.ActiveIndex = index
      },

      activeLinkMounted() {
        let actualPath = this.$route.path;
        this.links.forEach((link, index) => {
          if (link.path) {
            link.path === actualPath ? this.ActiveIndex = index : ''
          } else {
            link.childPath.forEach((ele, idxChild) => {
              ele.path === actualPath ? this.ActiveIndex = (idxChild + 1).toString().padStart(3,
                `${0}${index}`) : ''
            })
          }
        });
      },

      toggleMenuAsidePhone(){
        this.$emit('toggle-MenuAsidePhone')
      }


    },

    mounted() {
      this.activeLinkMounted()

    }

  }
</script>

<style lang="scss">
  .aside {
    background: var(--couleur-primaire-1);
    width: 14%;
    height: 100vh;
    transition: 0.3s;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    .nav-aside {
      margin-top: 30px;

      .logobrand {
        margin-bottom: 96px;
        padding: 0px 25px;
      }

      .links ul {
        list-style: none;
        padding-left: 1rem;

        li {
          margin-bottom: 11px;
          padding: 0px 25px;

          a {
            text-decoration: none;
            color: var(--couleur-primaire-2);
            text-wrap: nowrap;
            display: block;

            .bx {
              margin-right: 13px;
            }

            #iDrop {
              float: right;
              margin-top: 6px;
            }

            #icArrow-statist {
              float: right;
              margin-top: 6px;
              margin-right: 0px;
            }

          }

          a:hover,
          .active {
            color: var(--couleur-primaire-3);
          }

          a:hover .bx,
          .active .bx {
            color: var(--couleur-primaire-4);
          }

          a:hover #iDrop,
          .active #iDrop {
            color: var(--couleur-primaire-3);
          }

        }

      }
    }
  }

  #linkdrop {
    font-size: 13px;
  }


  /* Style for tablets (less than de 992px) */
  @media (max-width: 991.98px) {
    .aside {
      width: fit-content;
      left: -275px;
      z-index: 5;
    }
    .showSidePhone {
      left: 0;
      transition: left 0.8s;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      z-index: 5;
    }
    #icon-menu{
      margin: 41px;
    }

  }

  /* Style for phone (less than de 767.98px) */
  @media (max-width: 767.98px) {
    .aside {
      width: fit-content;
      left: -275px;
      z-index: 5;
    }
    .showSidePhone {
      left: 0;
      transition: left 0.8s;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      z-index: 5;
    }

    #icon-menu{
      margin: 41px;
    }


  }
</style>