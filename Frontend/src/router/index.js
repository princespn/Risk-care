import { createRouter, createWebHashHistory } from "vue-router"; 
//import { createRouter, createWebHistory } from "vue-router"; 

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Home.vue"),
  },
  {
    path: "/autoquote/to/vehicle",
    name: "Vehicle",
    component: () => import("../components/Autoquoteone.vue"),
  },
  {
    path: "/autoquote/to/driver",
    name: "Driver",
    component: () => import("../components/Autoquotetwo.vue"),
  },
  {
    path: "/autoquote/to/discounts",
    name: "Discounts",
    component: () => import("../components/Autoquotethree.vue"),
  },
  {
    path: "/autoquote/to/your-rate",
    name: "YourRate",
    component: () => import("../components/Autoquotefinal.vue"),
  },
 {
  path: "/home-quote/to/address",
    name: "Home quote",
    component: () => import("../components/HomeInsurance/Homequote.vue"),

 },
 {
  path: "/home-quote/to/applicantion",
  name: "Home Application Info",
  component: () => import("../components/HomeInsurance/HomeApplicationquote.vue"), 
 },
 {
  path: "/home-quote/to/property",
  name: "Home Property Info",
  component: () => import("../components/HomeInsurance/Homepropertyquote.vue"), 
 },
 {
  path: "/home-quote/to/discounts",
  name: "Home Discount Info",
  component: () => import("../components/HomeInsurance/Homediscountyquote.vue"), 
 },
 {
 path: "/condo-quote/to/address",
 name: "Condo quote",
 component: () => import("../components/HomeInsurance/Condoquote.vue"),

},
{
  path: "/tenant-quote/to/address",
  name: "Tenant quote",
  component: () => import("../components/HomeInsurance/Tenantquote.vue"),
 
 },
  {
    path: "/admin",
    component: () => import("../components/admin/AdminLayout.vue"),
    children: [
      {
        path: "login",
        name: "Admin Login",
        component: () => import("../components/admin/Login.vue"),
      },
      {
        path: "dashboard",
        name: "Admin Dashboard",
        component: () => import("../components/admin/Dashboard.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "users",
        name: "Admin users",
        component: () => import("../components/admin/UserDetails.vue"),
        meta: { requiresAuth: true },
      },
        {
        path: "get_quotes",
        name: "Admin Quotes",
        component: () => import("../components/admin/QuotesDetails.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "quotes_details/:id",   
        name: "quotes_details",
        component: () => import("../components/admin/AdminQuoteDetail.vue"),
        meta: { requiresAuth: true },
      },

    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(), 
  routes,
});

router.beforeEach((to, _, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  console.log("Navigating to:", to.fullPath, "Auth:", isAuthenticated);
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/admin/login");
  } else {
    next();
  }
});

export default router;
