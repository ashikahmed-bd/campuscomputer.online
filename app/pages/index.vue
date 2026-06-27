<script setup>
const serviceStore = useServiceStore();

const { data: services, pending, error, refresh } = await useAsyncData("services", async () => {
    return await serviceStore.getServices();
});


const banners = [
    {
        id: 1,
        title: "Professional Printing Service",
        subtitle: "Photo Print, Photocopy, Scan & Custom Print",
        image: "https://placehold.co/600x200",
        button_text: "Order Now",
        button_link: "/services/color-print"
    },
    {
        id: 2,
        title: "Passport Photo Service",
        subtitle: "Instant Passport & Visa Size Photo",
        image: "https://placehold.co/600x200",
        button_text: "Get Started",
        button_link: "/services/passport-photo"
    }
]

const goToCart = () => {
    return navigateTo('/cart')
}
</script>

<template>
    <main>
        <section class="max-w-full">
            <UCarousel v-slot="{ item }" :items="banners" class="w-full">
                <div class="max-w-lg px-4 py-6">
                    <h1 class="text-2xl font-bold">
                        {{ item.title }}
                    </h1>
                    <p class="mb-5 text-lg">
                        {{ item.subtitle }}
                    </p>

                    <UButton :to="item.button_link" size="lg">
                        {{ item.button_text }}
                    </UButton>
                </div>
            </UCarousel>
        </section>

        <section class="max-w-full px-4 py-2.5">
            <div class="flex justify-between items-center mb-2.5">
                <h2 class="text-xl font-bold">Services</h2>
                <NuxtLink to="/services" class="text-primary">
                    View all
                </NuxtLink>
            </div>

            <div class="grid grid-cols-2 gap-2.5">
                <ServiceCard v-for="service in services.data" :key="service.id" :service="service" />
            </div>
        </section>
    </main>
</template>
