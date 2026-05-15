<script setup>
import { ref, computed } from 'vue'

const cartItems = ref([
    {
        id: 3,
        name: "Photocopy",
        description: "Photocopy service available",
        base_price: 1,
        quantity: 5,
        selectedVariant: 4,
        variants: [
            { id: 4, name: "Single Side Copy", price: 1 },
            { id: 5, name: "Double Side Copy", price: 2 }
        ]
    }
])

const getVariantPrice = (item) =>
    item.variants.find(v => v.id === item.selectedVariant)?.price || item.base_price

const itemTotal = (item) => getVariantPrice(item) * item.quantity

const total = computed(() =>
    cartItems.value.reduce((sum, item) => sum + itemTotal(item), 0)
)

const increaseQty = (item) => item.quantity++
const decreaseQty = (item) => {
    if (item.quantity > 1) item.quantity--
}
</script>

<template>
    <main>
        <div class="space-y-4 px-4 py-6">
            <div v-for="item in cartItems" :key="item.id" class="bg-white rounded-2xl p-4 border border-gray-100">
                <div class="flex gap-2.5">
                    <div class="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                        <UIcon name="i-heroicons-document-duplicate" class="w-8 h-8 text-primary" />
                    </div>

                    <div class="w-full">
                        <h2 class="font-semibold">
                            {{ item.name }}
                        </h2>
                        <p class="text-xs text-gray-500">
                            {{ item.description }}
                        </p>
                        <label class="py-2">
                            <select v-model="item.selectedVariant" class="w-full px-2.5 py-1.5 rounded border text-sm">
                                <option v-for="variant in item.variants" :key="variant.id" :value="variant.id">
                                    {{ variant.name }} - ৳{{ variant.price }}
                                </option>
                            </select>
                        </label>
                    </div>
                </div>

                <div class="flex justify-between items-center mt-4">

                    <div class="flex items-center bg-gray-100 rounded">
                        <button @click="decreaseQty(item)" class="px-4 py-2">
                            -
                        </button>

                        <span class="px-4 font-medium">
                            {{ item.quantity }}
                        </span>

                        <button @click="increaseQty(item)" class="px-4 py-2">
                            +
                        </button>
                    </div>

                    <div class="text-right">
                        <p class="text-xs text-gray-500">
                            BDT {{ getVariantPrice(item) }} each
                        </p>
                        <p class="font-bold text-primary text-lg">
                            BDT {{ itemTotal(item) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 py-6">
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-xs text-gray-500">Total</p>
                    <h2 class="text-2xl font-bold text-primary">
                        BDT {{ total }}
                    </h2>
                </div>

                <button class="bg-primary text-white px-4 py-2 rounded font-semibold">
                    Checkout
                </button>
            </div>
        </div>
    </main>
</template>