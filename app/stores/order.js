export const useOrderStore = defineStore("order", {
    state: () => ({
        errors: {},
        loading: false,
    }),


    getters: {

    },

    actions: {

        async getOrders() {
            const { $api } = useNuxtApp();
            try {
                return await $api("/api/orders");
            } catch (error) {
                this.errors = error?.response?._data?.errors
                throw error
            }
        },

    },
});