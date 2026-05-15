import apiClient from "~/utils/axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        loading: false,
        user: null,
        token: null,
        errors: {},
        showNotice: false,
    }),

    // persist: true,
    persist: {
        pick: ["user", "token", "showNotice"],
    },

    getters: {
        loggedIn: (state) => !!state.token,
    },

    actions: {
        acceptNotice() {
            this.showNotice = false;
        },

        async login(formData) {
            this.loading = true;
            const toast = useToast();
            try {
                const response = await apiClient.post("/api/auth/login", formData);
                if (response.status === 200) {
                    this.token = response.data.token;
                    this.user = response.data.user;
                    toast.success({
                        title: "অভিনন্দন",
                        message: response.data.message,
                    });

                    setTimeout(() => {
                        navigateTo("/");
                        this.showNotice = true;
                    }, 1500);
                }
            } catch (error) {
                if (error.response) {
                    toast.error({
                        title: "দুঃখিত",
                        message: error.response.data.message,
                    });
                    this.errors = error.response.data.errors;
                }
            } finally {
                this.loading = false;
            }
        },

        async getMe() {
            this.loading = true;
            try {
                const response = await apiClient.get("/api/auth/me");
                if (response.status === 200) {
                    this.user = response.data.data;

                    return Promise.resolve(response.data);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response?.status === 401) {
                        this.$reset();
                    }
                    return Promise.reject(error.response);
                }
            } finally {
                this.loading = false;
            }
        },

        async register(formData) {
            this.loading = true;
            const toast = useToast();
            try {
                const response = await apiClient.post("/api/auth/register", formData);
                if (response.status === 201) {
                    toast.success({
                        title: "অভিনন্দন",
                        message: response.data.message,
                    });
                    setTimeout(() => {
                        navigateTo("/login");
                    }, 1500);
                }
            } catch (error) {
                this.errors = error.response.data.errors;
                toast.error({
                    title: "দুঃখিত",
                    message: error.response.data.message,
                });
            } finally {
                this.loading = false;
            }
        },

        async forgot(formData) {
            this.loading = true;
            const toast = useToast();
            try {
                const response = await apiClient.post("/api/auth/forgot", formData);
                if (response.status === 200) {
                    setTimeout(() => {
                        navigateTo("/auth/login");
                    }, 2000);
                }
            } catch (error) {
                toast.error(error.response.data.message);
                toast.error({
                    title: "দুঃখিত",
                    message: error.response.data.message,
                });
                this.errors = error.response.data.errors;
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            this.loading = true;
            const toast = useToast();
            try {
                const response = await apiClient.post("/api/auth/logout");
                if (response.status === 200) {
                    this.$reset();
                    toast.success({
                        title: "Success!",
                        message: response.data.message,
                    });
                    await navigateTo("/login");
                }
            } catch (error) {
                if (error.response) {
                    return Promise.reject(error.response.data);
                }
            } finally {
                this.loading = false;
            }
        },
    },
});