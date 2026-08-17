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

const banners = [
  {
    id: 1,
    image: "/hero.jpg",
    alt: "Photocopy & Printing",
    url: "/services/photocopy",
  },
  {
    id: 2,
    image: "/hero.jpg",
    alt: "Spiral Binding",
    url: "/services/spiral-binding",
  },
];
</script>

<template>
  <main>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else-if="services">
      <SeoMeta
        title="Printing, Photocopy & Binding Services | Campus Computer"
        description="Get professional photocopy, printing, spiral binding, tape binding and thesis binding services at Campus Computer. High-quality, reliable and affordable document services for students, offices and businesses."
        keywords="photocopy service, printing service, thesis binding, spiral binding, tape binding, document printing, color printing, black and white printing, binding service, Campus Computer"
      />

      <section class="max-w-full py-2.5">
        <UCarousel
          v-slot="{ item }"
          :items="banners"
          :ui="{
            item: 'basis-full',
          }"
        >
          <NuxtLink :to="item.url">
            <img :src="item.image" :alt="item.alt" class="rounded" />
          </NuxtLink>
        </UCarousel>
      </section>

      <section class="max-w-full py-2.5">
        <div class="flex justify-between items-center mb-2.5">
          <h2 class="text-xl font-bold">Services</h2>
          <NuxtLink to="/services" class="text-primary"> View all </NuxtLink>
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          <ServiceCard
            v-for="service in services.data"
            :key="service.id"
            :service="service"
          />
        </div>
      </section>
    </template>

    <EmptyState v-else />
  </main>
</template>
