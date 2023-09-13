import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
//auth
import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import LogOut from '../components/logOut.vue'
//category
import CategoryView from '../views/category/CategoryView.vue'
import AddCategory from '../views/category/AddCategory.vue'
import EditCategory from '../views/category/EditCategory.vue'
//product
import ProductView from '../views/product/ProductView.vue'
import AddProduct from '../views/product/AddProduct.vue'
import EditProduct from '../views/product/EditProduct.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/logout',
    name: 'logOut',
    component: LogOut
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryView
  },
  {
    path: '/categories/add',
    name: 'categories add',
    component: AddCategory
  },
  {
    path: '/categories/edit/:id',
    name: 'edit categories',
    component: EditCategory
  },
  {
    path: '/products',
    name: 'products',
    component: ProductView
  },
  {
    path: '/products/add',
    name: 'products add',
    component: AddProduct
  },
  {
    path: '/products/edit/:id',
    name: 'edit products',
    component: EditProduct
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
