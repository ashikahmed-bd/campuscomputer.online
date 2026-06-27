<script setup>
const route = useRoute();
const serviceStore = useServiceStore();
const cartStore = useCartStore();

const { data: service, pending, error, refresh } = await useAsyncData(
    `service-${route.params.slug}`,
    () => serviceStore.getService(route.params.slug)
)

const quantity = ref(1);

const addToCart = async (variant) => {
    const payload = {
        service_id: service.value.data.id,
        variant_id: variant.id,
        quantity: quantity.value
    }
    await cartStore.addItem(payload);

    navigateTo('/cart')
};
</script>

<template>
    <main class="bg-gray-100">

        <div class="bg-white p-4 border-b border-border">
            <h1 class="text-2xl font-bold">
                {{ service?.data?.name }}
            </h1>

            <p v-if="service?.data?.description" class="text-body text-sm">
                {{ service.data.description }}
            </p>
        </div>

        <div v-if="pending" class="p-4">
            Loading...
        </div>

        <div v-else-if="error" class="p-4 text-red-500">
            Failed to load service.
        </div>

        <div v-else class="p-4">

            <div v-for="variant in service.data.variants" :key="variant.id" class="bg-white rounded-xl border p-4 mb-4">

                <div class="flex justify-between items-center">

                    <div>
                        <h2 class="font-semibold">
                            {{ variant.name }}
                        </h2>

                        <p class="text-sm text-gray-500">
                            {{ variant.unit }}
                        </p>
                    </div>

                    <div class="text-right">

                        <div class="text-xl font-bold text-indigo-600">
                            ৳{{ variant.price }}
                        </div>

                        <small class="text-gray-500">
                            /{{ variant.unit }}
                        </small>

                    </div>

                </div>

                <div class="mt-4">

                    <label class="text-sm">
                        Quantity
                    </label>

                    <input v-model.number="quantity" type="number" min="1" class="w-full mt-2 border rounded-lg p-3">

                </div>

                <button class="w-full mt-4 bg-indigo-600 text-white rounded-lg py-3" @click="addToCart(variant)">
                    Add to Cart
                </button>

            </div>

        </div>

    </main>
</template>