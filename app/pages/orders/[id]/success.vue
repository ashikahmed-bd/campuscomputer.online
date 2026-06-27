<script setup>
const route = useRoute()
</script>

<template>
    <main>
        <div class="max-w-md mx-auto w-full p-4">
            <div class="bg-white rounded-3xl p-8 text-center">
                <div class="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                    <UIcon name="i-heroicons-check" class="size-14 text-green-600" />
                </div>
                <h1 class="text-3xl font-bold mt-6">
                    Order Successful
                </h1>

                <p class="text-gray-500 mt-3">
                    Your files have been uploaded successfully and your order has been placed.
                </p>

                <div class="mt-6 bg-gray-50 rounded-xl p-4">
                    <div class="text-sm text-gray-500">
                        Order Number
                    </div>
                    <div class="font-bold text-xl">
                        #{{ route.params.id }}
                    </div>
                </div>

                <div class="space-y-3 mt-8">
                    <UButton block to="/orders">
                        My Orders
                    </UButton>
                    <UButton block color="neutral" variant="soft" to="/">
                        Back to Home
                    </UButton>
                </div>
            </div>
        </div>
    </main>
</template>