export const useAuthStore = defineStore("auth", {
    state: () => ({
        errors: {},
        loading: false,
        user: null,
        token: null,
    }),

    // persist: true,
    persist: {
        pick: ["user", "token"],
    },

    getters: {
        loggedIn: (state) => !!state.token,
    },

    actions: {

        async login(payload) {
            this.loading = true;
            const { $api } = useNuxtApp();
            try {
                const response = await $api("/api/auth/login", {
                    method: "POST",
                    body: payload,
                });
                return response
            } catch (error) {
                this.errors = error?.response?._data?.errors
                throw error
            } finally {
                this.loading = false;
            }
        },

    },
});