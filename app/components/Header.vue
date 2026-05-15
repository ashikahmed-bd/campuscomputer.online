<script setup>
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

</script>

<template>
    <header class="bg-white max-w-sm mx-auto px-4 py-4 border-b border-border sticky top-0 z-40">
        <div class="flex justify-between items-center">
            <div class="block text-start">
                <NuxtLink to="/">
                    Campus Computer
                </NuxtLink>
            </div>

            <div class="block text-end">
                <button type="button" class="bg-gray-200 flex justify-center items-center text-xl p-2 rounded-full">
                    <UIcon name="i-lucide-bell" class="size-5" />
                </button>
            </div>
        </div>
    </header>
</template>