<script setup></script>

<template>
  <footer
    class="bg-white fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm py-3 z-50"
  >
    <nav class="flex justify-around items-center">
      <NuxtLink
        to="/"
        active-class="text-primary"
        exact-active-class="text-primary"
        class="flex flex-col items-center gap-1"
      >
        <UIcon name="i-lucide-house" class="size-5" />
        <h4 class="text-xs font-semibold">Home</h4>
      </NuxtLink>

      <NuxtLink
        to="/services"
        active-class="text-primary"
        exact-active-class="text-primary"
        class="flex flex-col items-center gap-1"
      >
        <UIcon name="i-lucide-component" class="size-5" />
        <h4 class="text-xs font-semibold">Services</h4>
      </NuxtLink>

      <NuxtLink
        to="/orders"
        active-class="text-primary"
        exact-active-class="text-primary"
        class="flex flex-col items-center gap-1"
      >
        <UIcon name="i-lucide-layout-list" class="size-5" />
        <h4 class="text-xs font-semibold">Orders</h4>
      </NuxtLink>

      <a
        href="https://wa.me/8801742402101?text=Hello%2C%20I%20need%20support."
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center gap-1"
      >
        <UIcon name="i-lucide-message-circle" class="size-5" />
        <h4 class="text-xs font-semibold">WhatsApp</h4>
      </a>
    </nav>
  </footer>
</template>

<style scoped></style>
