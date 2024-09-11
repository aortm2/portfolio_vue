export default [
    {
        path: "/",
        component: () => import("@/views/main.vue"),
        meta: {pageTitle: "메인",}
    },
    {
      path: "/eChart",
      component: () => import("@/views/eChart.vue"),
      meta: {pageTitle: "eChart", layout: "empty" }
  },
  ];