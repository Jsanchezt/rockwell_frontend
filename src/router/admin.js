export default [
    {
        path: 'users',
        name: 'users',
        redirect: { name: "users.index" },
        children: [
            {
                path: "",
                name: "users.index",
                component: () => import('../pages/users/users.vue'),
            },
            {
                path: ":user_id",
                name: "users.detail",
                component: () => import('../pages/users/users_detail.vue'),
            }
        ]
    },
    {
        path: 'categories',
        name: 'categories',
        redirect: { name: "categories.index" },
        children: [
            {
                path: "",
                name: "categories.index",
                component: () => import('../pages/categories/categories.vue'),
            },
            {
                path: "/new",
                name: "categories.new",
                component: () => import('../pages/categories/categories_new.vue'),
            },
            {
                path: ":category_id",
                name: "categories.detail",
                component: () => import('../pages/categories/categories_detail.vue'),
            }
        ]
    },
    {
        path: 'products',
        name: 'products',
        redirect: { name: "products.index" },
        children: [
            {
                path: "",
                name: "products.index",
                component: () => import('../pages/products/products.vue'),
            },
            {
                path: "/new",
                name: "products.new",
                component: () => import('../pages/categories/categories_new.vue'),
            },
            {
                path: ":product_id",
                name: "products.detail",
                component: () => import('../pages/categories/categories_detail.vue'),
            }
        ]
    }
];
