<script setup>
defineProps({
    message: {
        type: String,
        default: 'Something went wrong.'
    }
})

const emit = defineEmits(['retry'])
</script>

<template>
    <div class="py-20 text-center">

        <UIcon name="i-heroicons-exclamation-triangle" class="size-14 text-red-500 mx-auto" />

        <h2 class="mt-4 text-lg font-semibold">
            {{ message }}
        </h2>

        <UButton class="mt-6" @click="emit('retry')">
            Try Again
        </UButton>

    </div>
</template>