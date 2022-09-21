import { createWebHistory, createRouter } from "vue-router";

import Home from "../components/pages/Home.vue";
import Calculator from "../components/pages/Calculator.vue";
import ReksadanaCampuran from "../components/pages/reksadana-campuran/reksadanaCampuran";
import ReksadanaDetail from "../components/pages/reksadana-campuran/reksadanaDetail";
import InvestmentPlan from "../components/pages/InvestmentPlan";
import risetPage from "../components/pages/RisetPage"
import corporateFinance from "../components/pages/CorporateFinance"
import QNAPage from "../components/pages/QNAPage"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/calculator",
    name: "calculator",
    component: Calculator,
  },
  {
    path: "/reksadana-campuran",
    name: "reksadanaCampuran",
    component: ReksadanaCampuran,
  },
  {
    path: "/reksadana-campuran/:name",
    name: "reksadanaDetail",
    component: ReksadanaDetail,
    props:{
      default: true,
      product: {}
    }
  },
  {
    path: "/investment-plan",
    name: "investmentPlan",
    component: InvestmentPlan
  },
  {
    path: "/riset",
    name: "risetPage",
    component: risetPage
  },
  {
    path: "/corporate-finance",
    name: "corporateFinance",
    component: corporateFinance
  },
  {
    path: "/tanya-jawab",
    name: "QNAPage",
    component: QNAPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
