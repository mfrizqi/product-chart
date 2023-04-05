import { createWebHistory, createRouter } from "vue-router";

import Home from "../components/pages/Home.vue";
import Calculator from "../components/pages/Calculator.vue";
import ReksadanaCampuran from "../components/pages/reksadana-campuran/reksadanaCampuran";
import ReksadanaDetail from "../components/pages/reksadana-campuran/reksadanaDetail";
import InvestmentPlan from "../components/pages/InvestmentPlan";
import risetPage from "../components/pages/RisetPage"
import corporateFinance from "../components/pages/CorporateFinance"
import QNAPage from "../components/pages/QNAPage"
import FormPage from "../components/pages/FormPage"
import ChartsPage from "../components/pages/ChartsPage"

// CHART PAGES
import chart002 from "../components/pages/investment-charts/002"
import chart005 from "../components/pages/investment-charts/005"
import chart008 from "../components/pages/investment-charts/008"
import chart014 from "../components/pages/investment-charts/014"
import chart020 from "../components/pages/investment-charts/020"
import chart049 from "../components/pages/investment-charts/049"
import chart108 from "../components/pages/investment-charts/108"
import chart132 from "../components/pages/investment-charts/132"
import chart150 from "../components/pages/investment-charts/150"

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
  },
  {
    path: "/form",
    name: "FormPage",
    component: FormPage
  },
  {
    path: "/chart-page",
    name: "ChartPage",
    component: ChartsPage
  },
  {
    path: "/investment-chart/002",
    name: "Chart 002",
    component: chart002
  },
  {
    path: "/investment-chart/005",
    name: "Chart 005",
    component: chart005
  },
  {
    path: "/investment-chart/008",
    name: "Chart 008",
    component: chart008
  },
  {
    path: "/investment-chart/014",
    name: "Chart 014",
    component: chart014
  },
  {
    path: "/investment-chart/020",
    name: "Chart 020",
    component: chart020
  },
  {
    path: "/investment-chart/049",
    name: "Chart 049",
    component: chart049
  },
  {
    path: "/investment-chart/108",
    name: "Chart 108",
    component: chart108
  },
  {
    path: "/investment-chart/132",
    name: "Chart 132",
    component: chart132
  },
  {
    path: "/investment-chart/150",
    name: "Chart 150",
    component: chart150
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
