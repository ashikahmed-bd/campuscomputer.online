export const useUserStore = defineStore("user", {
  state: () => ({
    errors: {},
    loading: false,
    users: [],
  }),

  getters: {},

  actions: {
    async all() {
      const { $api } = useNuxtApp();
      try {
        this.loading = true;
        const response = await $api("/api/v1/users");
        this.users = response.data;
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
