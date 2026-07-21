<script setup></script>

<template>
  <main class="flex items-center justify-center bg-gray-50">
    <div class="w-full rounded-2xl bg-white text-center p-4">
      <div
        class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-50"
      >
        <UIcon
          name="i-lucide-shopping-cart"
          class="h-10 w-10 text-primary-600"
        />
      </div>

      <div class="py-4">
        <h1 class="text-2xl font-bold text-gray-900">Your cart is empty</h1>

        <p class="mt-3 text-sm leading-6 text-gray-500">
          Looks like you haven't added any products yet. Browse our collection
          and find something you'll love.
        </p>
        <UButton
          class="mt-8 w-full justify-center"
          size="lg"
          icon="i-lucide-arrow-right"
          trailing
          @click="navigateTo('/')"
        >
          Continue Shopping
        </UButton>
      </div>
    </div>
  </main>
</template>
