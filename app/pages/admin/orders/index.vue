<script setup>
definePageMeta({
  layout: "admin",
});

const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);

const loadOrders = async () => {
  await orderStore.getAll();
};

onMounted(() => {
  loadOrders();
});
</script>

<template>
  <main>
    <div class="rounded-xl border border-border bg-white p-4">
      <div class="flex items-center gap-2.5">
        <div class="form__group flex-1">
          <label class="form__label">তারিখ</label>
          <input type="date" class="form__control" />
        </div>

        <div class="form__group flex-1">
          <label class="form__label">স্ট্যাটাস</label>
          <select class="form__control">
            <option>সব স্ট্যাটাস</option>
            <option>সম্পন্ন</option>
            <option>প্রসেসিং</option>
            <option>বাতিল</option>
          </select>
        </div>

        <div class="form__group flex-1">
          <label class="form__label">পেমেন্ট স্ট্যাটাস</label>
          <select class="form__control">
            <option>সব</option>
            <option>পরিশোধিত</option>
            <option>আংশিক</option>
            <option>বাকি</option>
          </select>
        </div>

        <div class="form__group flex-1">
          <label class="form__label">ফোন / অর্ডার নং</label>
          <input type="search" class="form__control" placeholder="খুঁজুন..." />
        </div>

        <button type="button" class="base__button shrink-0">
          <UIcon name="i-lucide-list-filter" class="h-4 w-4" />
          ফিল্টার
        </button>
      </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-border bg-white">
      <div class="border-b border-slate-100 px-4 py-4">
        <h2 class="text-sm font-bold text-slate-800">অর্ডার তালিকা</h2>
      </div>

      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              <th
                class="px-3 py-3 text-left text-xs font-semibold text-slate-600"
              >
                অর্ডার
              </th>

              <th
                class="px-3 py-3 text-left text-xs font-semibold text-slate-600"
              >
                কাস্টমার
              </th>

              <th
                class="px-3 py-3 text-left text-xs font-semibold text-slate-600"
              >
                ঠিকানা
              </th>

              <th
                class="px-3 py-3 text-center text-xs font-semibold text-slate-600"
              >
                আইটেম
              </th>

              <th
                class="px-3 py-3 text-right text-xs font-semibold text-slate-600"
              >
                মোট
              </th>

              <th
                class="px-3 py-3 text-left text-xs font-semibold text-slate-600"
              >
                স্ট্যাটাস
              </th>

              <th
                class="px-3 py-3 text-left text-xs font-semibold text-slate-600"
              >
                পেমেন্ট
              </th>

              <th
                class="px-3 py-3 text-center text-xs font-semibold text-slate-600"
              >
                অ্যাকশন
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="order in orders.data"
              :key="order.id"
              class="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
            >
              <td class="px-3 py-3">
                <div>
                  <p class="font-medium text-slate-900">
                    #{{ order.order_no }}
                  </p>

                  <p class="mt-0.5 text-xs text-slate-500">
                    {{ order.created_at }}
                  </p>
                </div>
              </td>

              <td class="px-3 py-3">
                <div>
                  <p class="font-medium text-slate-800">
                    {{ order.name }}
                  </p>

                  <p class="mt-0.5 text-xs text-slate-500">
                    {{ order.phone }}
                  </p>
                </div>
              </td>

              <td class="px-3 py-3">
                <p class="max-w-[180px] truncate text-sm text-slate-600">
                  {{ order.address }}
                </p>
              </td>

              <td class="px-3 py-3 text-center">
                <span
                  class="inline-flex min-w-7 items-center justify-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
                >
                  {{ order.items?.length ?? 0 }}
                </span>
              </td>

              <!-- Total -->
              <td class="px-3 py-3 text-right">
                <span class="font-semibold text-slate-900">
                  ৳{{ Number(order.total).toFixed(2) }}
                </span>
              </td>

              <td class="px-3 py-3">
                <span
                  class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
                  :class="{
                    'bg-amber-50 text-amber-700': order.status === 'pending',

                    'bg-blue-50 text-blue-700': order.status === 'processing',

                    'bg-green-50 text-green-700': order.status === 'completed',

                    'bg-red-50 text-red-700': order.status === 'cancelled',
                  }"
                >
                  {{ order.status }}
                </span>
              </td>

              <td class="px-3 py-3">
                <span
                  class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
                  :class="{
                    'bg-amber-50 text-amber-700':
                      order.payment_status === 'pending',

                    'bg-green-50 text-green-700':
                      order.payment_status === 'paid',

                    'bg-red-50 text-red-700': order.payment_status === 'failed',
                  }"
                >
                  {{ order.payment_status }}
                </span>
              </td>

              <td class="px-3 py-3">
                <div class="flex items-center justify-center gap-1.5">
                  <NuxtLink
                    :to="`/admin/orders/${order.id}`"
                    title="দেখুন"
                    class="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <UIcon name="i-lucide-eye" class="h-3.5 w-3.5" />
                  </NuxtLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-[10px] text-slate-400">
          মোট 256 টি অর্ডার এর মধ্যে 1-10 টি দেখানো হচ্ছে
        </p>

        <div class="flex items-center gap-1">
          <button
            class="flex h-8 items-center rounded-md border border-slate-200 bg-white px-2.5 text-[10px] text-slate-500 hover:bg-slate-50"
          >
            পূর্ববর্তী
          </button>

          <button
            class="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-[10px] font-semibold text-white"
          >
            1
          </button>

          <button
            class="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-[10px] text-slate-600 hover:bg-slate-50"
          >
            2
          </button>

          <button
            class="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-[10px] text-slate-600 hover:bg-slate-50"
          >
            3
          </button>

          <span class="px-1 text-xs text-slate-400"> ... </span>

          <button
            class="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-[10px] text-slate-600 hover:bg-slate-50"
          >
            26
          </button>

          <button
            class="flex h-8 items-center rounded-md border border-slate-200 bg-white px-2.5 text-[10px] text-slate-500 hover:bg-slate-50"
          >
            পরবর্তী
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
