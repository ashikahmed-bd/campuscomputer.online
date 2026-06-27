export const useServiceStore = defineStore("service", {
    state: () => ({
        errors: {},
        loading: false,
    }),


    getters: {

    },

    actions: {

        async getServices() {
            const { $api } = useNuxtApp();
            try {
                return await $api("/api/services");
            } catch (error) {
                this.errors = error?.response?._data?.errors
                throw error
            }
        },


        async getService(slug) {
            const { $api } = useNuxtApp();
            try {
                return await $api(`/api/services/${slug}`);
            } catch (error) {
                this.errors = error?.response?._data?.errors
                throw error
            }

        }

    },
});