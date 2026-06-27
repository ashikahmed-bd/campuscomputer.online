<script setup>
const goToCart = () => {
    navigateTo('/cart')
}
</script>

<template>
    <header class="bg-white max-w-sm mx-auto px-4 py-4 border-b sticky top-0 z-40">
        <div class="flex items-center justify-between">
            <NuxtLink to="/" class="font-semibold">
                Campus Computer
            </NuxtLink>

            <button @click="goToCart" type="button"
                class="relative bg-gray-200 flex justify-center items-center text-xl p-2 rounded-full">
                <UIcon name="i-lucide-shopping-cart" class="size-5" />
            </button>
        </div>
    </header>
</template>