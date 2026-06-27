export const useCartStore = defineStore("cart", {
    state: () => ({
        errors: {},
        loading: false,
        token: null,
        cart: null,
    }),


    getters: {
        items: (state) => state.cart?.items ?? [],

        itemsCount: (state) => state.cart?.items?.length ?? 0,

        quantity: (state) => state.cart?.items?.reduce((t, i) => t + i.quantity, 0) ?? 0,

        subtotal: (state) => state.cart?.subtotal ?? 0,

        total: (state) => state.cart?.total ?? 0,
    },

    actions: {

        async getCart() {
            const { $api } = useNuxtApp();
            try {
                const response = await $api("/api/cart");
                this.cart = response.data;
                return response;
            } catch (error) {
                throw error;
            }
        },


        async addItem(payload) {
            const { $api } = useNuxtApp();
            try {
                const response = await $api("/api/cart", {
                    method: "POST",
                    body: payload,
                });

                return response;
            } catch (error) {
                throw error
            }
        },

        async update(item, quantity) {
            try {
                const { $api } = useNuxtApp();
                const response = await $api(`/api/cart/${item}`, {
                    method: "PUT",
                    body: {
                        quantity,
                    },
                });
                return response;
            } catch (error) {
                throw error;
            }

        },

        async remove(item) {
            try {
                const { $api } = useNuxtApp();

                await $api(`/api/cart/${item}`, {
                    method: "DELETE",
                });
            } catch (error) {
                throw error;
            }
        },


        async clear() {
            try {
                const { $api } = useNuxtApp();

                await $api("/api/cart", {
                    method: "DELETE",
                });

                await this.getCart();
            } catch (error) {
                throw error;
            }
        },


        async checkout(payload) {
            try {
                const { $api } = useNuxtApp();

                const response = await $api("/api/checkout", {
                    method: "POST",
                    body: payload
                });

                await navigateTo(`/orders/${response.order.id}/files`);

                return response;
            } catch (error) {
                throw error;
            }
        }
    },
});