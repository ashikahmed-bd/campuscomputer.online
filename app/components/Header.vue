<script setup>
const goToCart = () => {
  navigateTo("/cart");
};
</script>

<template>
  <header class="sticky max-w-sm mx-auto top-0 z-40 border-b bg-white">
    <div class="mx-auto flex max-w-sm items-center justify-between px-4 py-3">
      <a href="/" class="flex items-center gap-3">
        <img
          src="/logo.svg"
          alt="Campus Computer"
          class="h-10 w-auto object-cover"
        />
      </a>
      <button
        @click="goToCart"
        type="button"
        class="relative bg-gray-200 flex justify-center items-center text-xl p-2 rounded-full"
      >
        <UIcon name="i-lucide-shopping-cart" class="size-5" />
      </button>
    </div>
  </header>
</template>
