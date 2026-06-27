<script setup>
defineProps({
    title: {
        type: String,
        default: 'No Data Found'
    },

    description: {
        type: String,
        default: 'Nothing to show.'
    },

    icon: {
        type: String,
        default: 'i-heroicons-inbox'
    }
})
</script>

<template>
    <div class="py-20 text-center">
        <UIcon :name="icon" class="size-16 text-gray-400 mx-auto" />
        <h2 class="mt-4 text-xl font-semibold">
            {{ title }}
        </h2>
        <p class="mt-2 text-gray-500">
            {{ description }}
        </p>
    </div>
</template>