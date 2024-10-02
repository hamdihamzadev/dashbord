import Vue from "vue";
import VueRouter from "vue-router";
import DashBord from '../views/DashBord.vue'
import NewOrders from '../views/NewOrders.vue'
import ConfirmedOredrs from '../views/ConfirmedOrders.vue'
import ShippedOrder from '../views/ShippedOrder.vue'
import DeliVerd from '../views/DeliVerd.vue'
import ReTurn from '../views/ReTurn.vue'
import CancelledOrders from '../views/Cancelled.vue'
import LoginUser from '../views/LoginUser.vue'
import SignUp from '../views/SignUp.vue'
import AllProducts from '../views/AllProduct.vue'
import StockProduct from '../views/StockProduct.vue'



import TopStatistics from '../views/TopStatistics.vue'
import TopCategory from '@/views/top/TopCategory.vue'
import TopProduct from '@/views/top/TopProduct.vue'
import TopCity from '@/views/top/TopCity.vue'


import AddOrder from '../views/AddOrder.vue'
import AddCustomer from "../views/customers/AddCustomers.vue"
import TopCustomer from '../views/customers/TopCustomer.vue'
import ProfilUser from '../views/ProfilUser.vue'
import CategoryViews from '../views/CategoryViews.vue'
import ListCustomers from '../views/customers/ListCustomers.vue'
import ConversionRate from '../views/ConversionRate.vue'

import NotFound from '../views/NotFound.vue'



Vue.use(VueRouter);

const routes = [
  
  { path: '/', component: SignUp },
  { path: '/DashBord', component: DashBord },
  { path: '/Orders/NewOrders', component: NewOrders },
  { path: '/Orders/Confirmed', component: ConfirmedOredrs},
  { path: '/Orders/Shipped', component: ShippedOrder},
  { path: '/Orders/Deliverd', component: DeliVerd},
  { path: '/Orders/Return', component: ReTurn},
  { path: '/Orders/Cancelled', component: CancelledOrders},
  { path: '/Login', component: LoginUser},
  { path: '/Products', component: AllProducts},
  { path: '/Stock', component: StockProduct},
  
  {
    path: '/Statistics/top',
    component: TopStatistics,
    children: [
      {
        path: 'category',
        component: TopCategory
      },
      {
        path: 'product',
        component: TopProduct
      },
      {
        path: 'city',
        component: TopCity
      }
    ]
  },  

  { path: '/Orders/Addorder', component: AddOrder},
  { path: '/Customers/AddCustomer', component: AddCustomer},
  { path: '/Customers/TopCustomer', component: TopCustomer},
  { path: '/Customers/ListCustomers', component: ListCustomers},
  { path: '/Profil', component: ProfilUser},
  { path: '/Categories', component: CategoryViews},
  { path: '/conversion', component: ConversionRate},
  { path: '*',name:'NotFound', component: NotFound}

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
