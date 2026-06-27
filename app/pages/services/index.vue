<script setup>
const serviceStore = useServiceStore();

const { data: services, pending, error, refresh } = await useAsyncData("services", async () => {
    return await serviceStore.getServices();
});

</script>

<template>
    <main>
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
