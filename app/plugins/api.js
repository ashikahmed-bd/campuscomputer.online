export default defineNuxtPlugin(() => {
    const api = $fetch.create({
        baseURL: 'http://127.0.0.1:8000', //http://127.0.0.1:8000

        onRequest({ options }) {
            const authStore = useAuthStore();
            const cartToken = useCartToken();

            options.headers = new Headers(options.headers);
            options.headers.set("X-Source", "Web");

            if (authStore.token) {
                options.headers.set("Authorization", `Bearer ${authStore.token}`);
            }

            if (cartToken.value) {
                options.headers.set("X-Cart-Token", cartToken.value)
            }
        },

        onResponseError({ response }) {
            const authStore = useAuthStore();

            if (response.status === 401) {
                authStore.$reset()
                navigateTo('/auth/login')
            }

            console.error('API Error:', response)
        }
    })

    return {
        provide: {
            api,
        },
    }
})