<script setup>
const cartStore = useCartStore()

const { data: cart, pending, error, refresh } = await useAsyncData("cart", () => cartStore.getCart())

const checkout = async () => {
    await cartStore.checkout();
}

const remove = async (item) => {
    await cartStore.remove(item)
    await refresh()
}

const increase = async (item) => {
    await cartStore.update(item.id, item.quantity + 1)
    await refresh()
}

const decrease = async (item) => {
    if (item.quantity <= 1) {
        await remove(item)
        return
    }

    await cartStore.update(item.id, item.quantity - 1)
    await refresh()
}

const clear = async () => {
    await cartStore.clear()
    await refresh()
}
</script>

<template>
    <main class="bg-gray-100">
        <template v-if="pending">
            <PendingState />
        </template>
        <template v-else-if="error">
            <ErrorState @retry="refresh" />
        </template>

        <template v-else-if="cart.data?.items">
            <div class="sticky top-0 z-20 bg-white border-b">
                <div class="px-4 h-14 flex items-center justify-between">
                    <h1 class="text-lg font-bold">
                        My Cart
                    </h1>
                    <button @click="clear" class="text-danger text-sm">
                        Clear
                    </button>
                </div>
            </div>

            <div class="p-4 space-y-4">
                <div v-for="item in cart.data?.items" :key="item.id" class="bg-white rounded-2xl p-2.5">
                    <div class="flex gap-3">
                        <img :src="item.service.image_url" class="w-20 h-20 rounded-xl object-cover">
                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h2 class="font-semibold text-base">
                                        {{ item.service.name }}
                                    </h2>

                                    <p class="text-sm text-gray-500 mt-1">
                                        {{ item.variant.name }}
                                    </p>
                                </div>

                                <button @click="remove(item.id)"
                                    class="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition">
                                    <UIcon name="i-heroicons-trash" class="w-5 h-5" />
                                </button>
                            </div>
                            <div class="mt-2 flex items-center justify-between">
                                <span class="font-bold text-indigo-600">
                                    ৳{{ item.price }}
                                </span>
                                <div class="flex items-center bg-gray-100 rounded-full">
                                    <button @click="decrease(item)" :disabled="item.quantity <= 1"
                                        class="w-9 h-9 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed">
                                        <UIcon name="i-heroicons-minus-20-solid" class="w-5 h-5" />
                                    </button>

                                    <span class="w-8 text-center font-medium">
                                        {{ item.quantity }}
                                    </span>

                                    <button @click="increase(item)"
                                        class="w-9 h-9 flex items-center justify-center text-indigo-600">
                                        <UIcon name="i-heroicons-plus-20-solid" class="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white border-t rounded-t-3xl">
                <div class="space-y-4 p-5">
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Subtotal</span>
                            <span>৳{{ cart.data?.subtotal }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Discount</span>
                            <span>৳{{ cart.data?.discount }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Delivery</span>
                            <span>৳{{ cart.data?.delivery_charge }}</span>
                        </div>
                        <div class="flex justify-between text-lg font-bold border-t pt-3 mt-3">
                            <span>Total</span>
                            <span>
                                ৳{{ cart.data?.total }}
                            </span>
                        </div>
                    </div>

                    <button @click="checkout"
                        class="w-full py-2.5 rounded-xl bg-primary text-white font-semibold active:scale-95 transition">
                        Confirm
                    </button>
                </div>
            </div>
        </template>
        <template v-else>
            <EmptyState title="Your cart is empty" description="Add some services to continue."
                icon="i-lucide-shopping-cart" />
        </template>
    </main>
</template>