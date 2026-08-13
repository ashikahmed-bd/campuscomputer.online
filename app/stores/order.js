export const useOrderStore = defineStore("order", {
  state: () => ({
    errors: {},
    loading: false,
    orders: [],
    order: {},
  }),

  getters: {},

  actions: {
    async getAll() {
      const { $api } = useNuxtApp();
      try {
        this.loading = true;
        const response = await $api("/api/v1/orders");
        this.orders = response;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async show(order) {
      const { $api } = useNuxtApp();
      try {
        this.loading = true;
        const response = await $api(`/api/v1/orders/${order}`);
        this.order = response.data;
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getOrders() {
      const { $api } = useNuxtApp();
      try {
        return await $api("/api/orders");
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      }
    },
  },
});
