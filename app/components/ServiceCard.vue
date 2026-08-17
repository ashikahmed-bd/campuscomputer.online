<script setup>
defineProps({
  service: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink
    :to="`/services/${service.slug}`"
    class="group block overflow-hidden rounded-xl border border-border bg-white p-4 transition-all duration-300 hover:-translate-y-1"
  >
    <div class="mx-auto flex size-20 items-center justify-center rounded-2xl">
      <img
        :src="service.image_url"
        :alt="service.name"
        class="size-16 object-contain"
      />
    </div>

    <h3 class="mt-4 text-center text-base font-semibold text-title">
      {{ service.name }}
    </h3>

    <p class="mt-2 text-center text-xs text-body line-clamp-2">
      {{ service.description }}
    </p>
  </RouterLink>
</template>
