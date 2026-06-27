<script setup>
const route = useRoute();

const order = {
    id: route.params.id,
    total: 100
}

const pay = async () => {
    await navigateTo(`/orders/${route.params.id}/success`)
}
</script>

<template>
    <main>
        <div class="bg-white border-b sticky top-0">
            <div class="max-w-lg mx-auto px-4 h-14 flex items-center">
                <h1 class="font-bold text-lg">
                    Payment
                </h1>
            </div>
        </div>

        <div class="max-w-lg mx-auto p-4 space-y-4">

            <div class="bg-white rounded-2xl p-5">

                <div class="text-sm text-gray-500">
                    Order ID
                </div>

                <div class="font-bold text-xl mt-1">
                    #{{ order.id }}
                </div>

                <div class="border-t my-5"></div>

                <div class="flex justify-between">
                    <span>Total Amount</span>

                    <span class="text-2xl font-bold text-primary">
                        ৳{{ order.total }}
                    </span>
                </div>

            </div>

            <div class="bg-white rounded-2xl p-5">

                <h2 class="font-semibold mb-4">
                    Select Payment Method
                </h2>

                <URadioGroup v-model="paymentMethod" :items="[
                    { label: 'Cash on Delivery', value: 'cash' },
                    { label: 'bKash', value: 'bkash' },
                    { label: 'Nagad', value: 'nagad' }
                ]" />

            </div>

            <UButton block size="xl" @click="pay">
                Continue Payment
            </UButton>

        </div>
    </main>

</template>
