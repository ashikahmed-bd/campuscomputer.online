<script setup>
const serviceStore = useServiceStore();

const {
  data: services,
  pending,
  error,
  refresh,
} = await useAsyncData("services", async () => {
  return await serviceStore.getServices();
});

useSeoMeta({
  title: "Printing, Photocopy & Binding Services",
  description:
    "Professional printing, photocopy, and binding services for documents, assignments, projects, reports, and other academic and business needs.",
  keywords:
    "printing services, photocopy services, binding services, document printing, assignment printing, project binding",
  robots: "index, follow",
});
</script>

<template>
  <main>
    <section class="max-w-full py-2.5">
      <div class="py-4">
        <h1 class="text-base font-bold">Print, Copy & Binding Services</h1>
        <p class="text-body text-sm max-w-2xl">
          Quality printing, photocopy, and binding services with fast delivery.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-2.5">
        <ServiceCard
          v-for="service in services.data"
          :key="service.id"
          :service="service"
        />
      </div>
    </section>
  </main>
</template>
