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

    {
        path: "/DragDrop",
        component: () => import("@/views/DragDrop.vue"),
        meta: {pageTitle: "Drag&Drop", layout: "projcet" }
    },

    
    {
        path: "/Drawing",
        component: () => import("@/views/Drawing.vue"),
        meta: {pageTitle: "그림 그리기", layout: "projcet" }
    },
  ];