export default [
    {
        path: "/",
        component: () => import("@/views/main.vue"),
        meta: {pageTitle: "메인",}
    },

    {
      path: "/amChart",
      component: () => import("@/views/amChart.vue"),
      meta: {pageTitle: "amChart", layout: "projcet" }
     },

    {
        path: "/weather",
        component: () => import("@/views/weather.vue"),
        meta: {pageTitle: "날씨", layout: "projcet" }
    },
  ];