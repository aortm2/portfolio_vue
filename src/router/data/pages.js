export default [
    {
        path: "/",
        component: () => import("@/views/main.vue"),
        meta: {pageTitle: "메인",}
    },

    {
      path: "/amChart",
      component: () => import("@/views/amChart.vue"),
      meta: {pageTitle: "amChart", layout: "project" }
     },

    {
        path: "/weather",
        component: () => import("@/views/weather.vue"),
        meta: {pageTitle: "날씨", layout: "project" }
    },

    {
        path: "/DragDrop",
        component: () => import("@/views/DragDrop.vue"),
        meta: {pageTitle: "Drag&Drop", layout: "project" }
    },

    
    {
        path: "/Drawing",
        component: () => import("@/views/Drawing.vue"),
        meta: {pageTitle: "그림 그리기", layout: "project" }
    },
  ];