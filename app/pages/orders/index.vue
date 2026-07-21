<script setup>
const orderStore = useOrderStore();

const {
  data: orders,
  pending,
  error,
  refresh,
} = await useAsyncData("cart", async () => {
  return await orderStore.getOrders();
});

const badgeColor = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "Processing":
      return "warning";
    case "Pending":
      return "neutral";
    default:
      return "neutral";
  }
};
</script>

<template>
  <main class="px-4 py-6">
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else-if="orders.data">
      <div class="mb-6">
        <h1 class="text-xl font-bold text-gray-900">My Orders</h1>
        <p class="mt-1 text-sm text-gray-500">
          Track and manage your printing orders.
        </p>
      </div>

      <div class="flex gap-2 overflow-x-auto pb-2 mb-6">
        <button
          class="px-2 py-0.5 rounded bg-primary text-white text-sm font-medium whitespace-nowrap"
        >
          All
        </button>
        <button
          class="px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-600 text-sm whitespace-nowrap"
        >
          Pending
        </button>

        <button
          class="px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-600 text-sm whitespace-nowrap"
        >
          Processing
        </button>

        <button
          class="px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-600 text-sm whitespace-nowrap"
        >
          Completed
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="order in orders.data"
          :key="order.id"
          class="rounded-2xl border border-border bg-white overflow-hidden"
        >
          <div
            class="flex items-start justify-between p-4 border-b border-gray-100"
          >
            <div>
              <h2 class="font-semibold text-title">#{{ order.order_no }}</h2>
              <p class="mt-1 text-xs text-body">
                {{ order.created_at }}
              </p>
              <p class="mt-2 text-sm text-gray-700">
                {{ order.items.length }}
                {{ order.items.length > 1 ? "Items" : "Item" }}
              </p>
              <p v-if="order.items.length" class="mt-1 text-sm text-body">
                {{ order.items[0].service.name }}
                <span v-if="order.items.length > 1">
                  +{{ order.items.length - 1 }} more
                </span>
              </p>
            </div>

            <span
              :class="{
                'bg-yellow-100 text-yellow-700': order.status === 'pending',
                'bg-blue-100 text-blue-700': order.status === 'processing',
                'bg-green-100 text-green-700': order.status === 'completed',
                'bg-red-100 text-red-700': order.status === 'cancelled',
              }"
              class="rounded-full px-3 py-1 text-xs font-semibold capitalize"
            >
              {{ order.status }}
            </span>
          </div>

          <div class="flex items-center justify-between p-4">
            <div>
              <p class="text-xs text-gray-500">Total Amount</p>

              <p class="text-lg font-bold text-primary">৳{{ order.total }}</p>
            </div>
            <button
              class="flex items-center gap-1 rounded border border-gray-200 px-2 py-1.5 text-sm font-medium hover:bg-gray-50 transition"
            >
              Details
              <UIcon name="i-heroicons-chevron-right-20-solid" class="size-4" />
            </button>
          </div>
        </div>
      </div>
    </template>
    <EmptyState v-else />
  </main>
</template>
