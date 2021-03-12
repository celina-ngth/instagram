const routes = [
  { path: "/authentication", component: () => import("pages/Auth.vue") },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageHome.vue") },
      { path: "/camera", component: () => import("pages/PageCamera.vue") },
      { path: "/profil", component: () => import("pages/PageProfil.vue") },
      { path: "/profil/edit", component: () => import("pages/EditProfile.vue") },
      {
        path: "/profil/:id", name: "post",
        component: () => import("pages/Post.vue"), props: true
      }
    ]
  },

  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
