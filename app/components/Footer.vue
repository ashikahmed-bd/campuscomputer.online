<script setup></script>

<template>
    <footer class="bg-white fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm py-3 z-50">
        <nav class="flex justify-around items-center">
            <NuxtLink to="/" active-class="text-primary" exact-active-class="text-primary"
                class="flex flex-col items-center gap-1">
                <UIcon name="i-lucide-house" class="size-5 " />
                <h4 class="text-xs font-semibold">Home</h4>
            </NuxtLink>

            <NuxtLink to="/categories" active-class="text-primary" exact-active-class="text-primary"
                class="flex flex-col items-center gap-1">
                <UIcon name="i-lucide-layout-list" class="size-5 " />
                <h4 class="text-xs font-semibold">categories</h4>
            </NuxtLink>

            <NuxtLink to="/services" active-class="text-primary" exact-active-class="text-primary"
                class="flex flex-col items-center gap-1">
                <UIcon name="i-lucide-component" class="size-5 " />
                <h4 class="text-xs font-semibold">Services</h4>
            </NuxtLink>

            <NuxtLink to="/account" active-class="text-primary" exact-active-class="text-primary"
                class="flex flex-col items-center gap-1">
                <UIcon name="i-lucide-user-round" class="size-5 " />
                <h4 class="text-xs font-semibold">Account</h4>
            </NuxtLink>
        </nav>
    </footer>
</template>

<style scoped></style>