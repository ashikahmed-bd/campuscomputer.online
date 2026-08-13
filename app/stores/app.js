export const useAppStore = defineStore("app", {
  state: () => ({
    errors: {},
    loading: false,
  }),

  getters: {},

  actions: {
    async dashboard(date) {
      const { $api } = useNuxtApp();
      try {
        this.loading = true;
        const response = await $api("/api/v1/dashboard", {
          query: {
            date: date,
          },
        });
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
