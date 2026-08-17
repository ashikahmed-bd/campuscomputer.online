export const usePaymentStore = defineStore("payment", {
  state: () => ({
    errors: {},
    loading: false,
  }),

  getters: {},

  actions: {
    async pay(order, payload) {
      const { $api } = useNuxtApp();
      try {
        this.loading = true;
        const response = await $api(`/api/orders/${order}/files`, {
          method: "POST",
          body: payload,
        });

        if (response?.success && response?.redirect_url) {
          await navigateTo(response.redirect_url, {
            external: true,
          });
        }
        return response;
      } catch (error) {
        this.errors = error?.response?._data?.errors;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
