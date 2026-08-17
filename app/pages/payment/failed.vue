<script setup>
useSeoMeta({
  title: "Payment Failed",
  description:
    "Your payment could not be completed. Please try again or choose another payment method.",
  robots: "noindex, nofollow",
});
</script>

<template>
  <main class="py-4">
    <div class="w-full bg-white text-center px-4 py-6 rounded-xl">
      <div
        class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full bg-red-500"
        >
          <UIcon name="i-lucide-circle-x" class="size-12 text-white" />
        </div>
      </div>

      <h1 class="mt-5 text-2xl font-semibold text-title">Payment Failed</h1>

      <p class="mt-2 text-sm leading-6 text-body">
        Your payment could not be completed. Please try again or choose another
        payment method.
      </p>

      <NuxtLink
        to="/"
        class="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Try Again
      </NuxtLink>
    </div>
  </main>
</template>
