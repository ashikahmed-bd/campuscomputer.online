<script setup>
useSeoMeta({
  title: "Payment Successful",
  description:
    "Your payment has been completed successfully. Thank you for your purchase.",
  robots: "noindex, nofollow",
});
</script>

<template>
  <main class="py-4">
    <div class="w-full bg-white text-center px-4 py-6 rounded-xl">
      <div
        class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full bg-green-500"
        >
          <UIcon
            name="i-lucide-circle-check-big"
            class="size-12 text-success"
          />
        </div>
      </div>

      <h1 class="mt-5 text-2xl font-semibold text-title">Payment Successful</h1>

      <p class="mt-2 text-sm leading-6 text-body">
        Your payment has been completed successfully. Thank you for your
        purchase.
      </p>

      <NuxtLink
        to="/"
        class="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Continue Shopping
      </NuxtLink>
    </div>
  </main>
</template>
