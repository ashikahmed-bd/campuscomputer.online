export const useServiceStore = defineStore("service", {
  state: () => ({
    errors: {},
    loading: false,
    services: [],
  }),

  getters: {},

  actions: {
    async getAll() {
      const { $api } = useNuxtApp();
      try {
        this.loading = true;
        const response = await $api("/api/v1/services");
        console.log("Services response:", response); // Log the response for debugging
        this.services = response.data;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getServices() {
      const { $api } = useNuxtApp();
      try {
        return await $api("/api/services");
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },

    async getService(slug) {
      const { $api } = useNuxtApp();
      try {
        return await $api(`/api/services/${slug}`);
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
