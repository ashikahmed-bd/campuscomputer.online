<script setup>
const route = useRoute();
const serviceStore = useServiceStore();
const cartStore = useCartStore();

const {
  data: service,
  pending,
  error,
  refresh,
} = await useAsyncData(`service-${route.params.slug}`, () =>
  serviceStore.getService(route.params.slug),
);

const quantity = ref(1);

const addToCart = async (variant) => {
  const payload = {
    service_id: service.value.data.id,
    variant_id: variant.id,
    quantity: quantity.value,
  };
  await cartStore.addItem(payload);

  navigateTo("/cart");
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

    <div v-if="pending" class="p-4">Loading...</div>

    <div v-else-if="error" class="p-4 text-red-500">
      Failed to load service.
    </div>

    <div v-else class="p-4">
      <div
        v-for="variant in service.data.variants"
        :key="variant.id"
        class="bg-white rounded-xl border p-4 mb-4"
      >
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

            <small class="text-gray-500"> /{{ variant.unit }} </small>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700"> Quantity </label>

          <div class="flex items-center rounded-lg border border-gray-200">
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center hover:bg-gray-100"
              @click="quantity = Math.max(1, quantity - 1)"
            >
              <UIcon name="i-lucide-minus" class="size-4" />
            </button>

            <input
              v-model.number="quantity"
              type="number"
              min="1"
              class="h-9 w-12 border-x text-center text-sm outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center hover:bg-gray-100"
              @click="quantity++"
            >
              <UIcon name="i-lucide-plus" class="size-4" />
            </button>
          </div>
        </div>

        <button
          @click="addToCart(variant)"
          :disabled="cartStore.loading"
          class="mt-4 w-full bg-primary text-white rounded-lg py-2.5 flex items-center justify-center gap-2 font-medium disabled:opacity-60"
        >
          <UIcon
            v-if="!cartStore.loading"
            name="i-lucide-shopping-cart"
            class="size-5"
          />

          <UIcon
            v-else
            name="i-lucide-loader-circle"
            class="size-5 animate-spin"
          />

          <span>{{ cartStore.loading ? "Adding..." : "Add to Cart" }}</span>
        </button>
      </div>
    </div>
  </main>
</template>
