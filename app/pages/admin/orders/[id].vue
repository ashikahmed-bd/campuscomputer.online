<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);

onMounted(() => {
  orderStore.show(route.params.id);
});
</script>

<template>
  <main v-if="order" class="space-y-3">
    <div
      class="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2"
    >
      <div class="flex items-center gap-2 text-xs">
        <span class="text-slate-400">অর্ডার সমূহ</span>
        <UIcon name="i-lucide-chevron-right" class="size-3 text-slate-300" />

        <span class="font-medium text-slate-600"> অর্ডার ডিটেইলস </span>
      </div>

      <button
        type="button"
        class="flex items-center gap-1.5 rounded bg-primary px-3 py-2.5 text-xs font-medium text-white transition hover:bg-primary/80"
      >
        <UIcon name="i-lucide-circle-check-big" class="size-3.5" />
        সম্পন্ন করুন
      </button>
    </div>

    <!-- Order Info -->
    <section class="rounded-xl border border-slate-200 bg-white">
      <div class="grid grid-cols-2 divide-x divide-slate-100 md:grid-cols-5">
        <!-- Order -->
        <div class="p-4">
          <p class="text-[10px] text-slate-400">অর্ডার নং</p>

          <p class="mt-1 text-sm font-bold text-blue-600">
            {{ order.order_no }}
          </p>

          <span
            class="mt-2 inline-flex rounded-md bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-600"
          >
            {{ order.status }}
          </span>
        </div>

        <!-- Date -->
        <div class="p-4">
          <p class="text-[10px] text-slate-400">অর্ডারের তারিখ</p>

          <p class="mt-1 text-xs font-semibold text-slate-700">
            {{ order.created_at }}
          </p>
        </div>

        <!-- Payment -->
        <div class="p-4">
          <p class="text-[10px] text-slate-400">পেমেন্ট</p>

          <p class="mt-1 text-xs font-semibold text-slate-700">
            {{ order.payment?.method || "—" }}
          </p>
        </div>

        <!-- Payment Status -->
        <div class="p-4">
          <p class="text-[10px] text-slate-400">পেমেন্ট স্ট্যাটাস</p>

          <span
            class="mt-2 inline-flex rounded-md bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-600"
          >
            {{ order.payment_status }}
          </span>
        </div>

        <!-- Total -->
        <div class="p-4">
          <p class="text-[10px] text-slate-400">মোট</p>

          <p class="mt-1 text-sm font-bold text-blue-600">
            ৳ {{ order.total }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main -->
    <div class="grid grid-cols-1 gap-3 lg:grid-cols-[1.6fr_1fr]">
      <!-- LEFT -->
      <div class="space-y-3">
        <!-- Items -->
        <section
          class="overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          <div class="border-b border-slate-100 px-4 py-3">
            <h2 class="text-xs font-bold text-slate-800">অর্ডার আইটেমসমূহ</h2>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-slate-100 bg-slate-50">
                  <th
                    class="px-4 py-2 text-left text-[10px] font-semibold text-slate-500"
                  >
                    আইটেম
                  </th>

                  <th
                    class="px-4 py-2 text-center text-[10px] font-semibold text-slate-500"
                  >
                    পরিমাণ
                  </th>

                  <th
                    class="px-4 py-2 text-right text-[10px] font-semibold text-slate-500"
                  >
                    মূল্য
                  </th>

                  <th
                    class="px-4 py-2 text-right text-[10px] font-semibold text-slate-500"
                  >
                    মোট
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-slate-100">
                <tr v-for="item in order.items" :key="item.id">
                  <td class="px-4 py-3 text-xs text-slate-700">
                    Item #{{ item.id }}
                  </td>

                  <td class="px-4 py-3 text-center text-xs text-slate-600">
                    {{ item.quantity }}
                  </td>

                  <td class="px-4 py-3 text-right text-xs text-slate-600">
                    ৳ {{ item.price }}
                  </td>

                  <td
                    class="px-4 py-3 text-right text-xs font-semibold text-slate-700"
                  >
                    ৳ {{ item.subtotal }}
                  </td>
                </tr>
              </tbody>

              <tfoot class="border-t border-slate-100">
                <tr>
                  <td
                    colspan="3"
                    class="px-4 pt-3 text-right text-xs text-slate-500"
                  >
                    সাবটোটাল
                  </td>

                  <td class="px-4 pt-3 text-right text-xs font-semibold">
                    ৳ {{ order.subtotal }}
                  </td>
                </tr>

                <tr>
                  <td
                    colspan="3"
                    class="px-4 py-1 text-right text-xs text-slate-500"
                  >
                    ডিসকাউন্ট
                  </td>

                  <td class="px-4 py-1 text-right text-xs">
                    - ৳ {{ order.discount }}
                  </td>
                </tr>

                <tr>
                  <td
                    colspan="3"
                    class="px-4 py-1 text-right text-xs text-slate-500"
                  >
                    ডেলিভারি
                  </td>

                  <td class="px-4 py-1 text-right text-xs">
                    ৳ {{ order.delivery_charge }}
                  </td>
                </tr>

                <tr>
                  <td
                    colspan="3"
                    class="px-4 pb-3 text-right text-xs font-bold text-blue-600"
                  >
                    মোট
                  </td>

                  <td
                    class="px-4 pb-3 text-right text-sm font-bold text-blue-600"
                  >
                    ৳ {{ order.total }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <!-- Files -->
        <section
          class="overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          <div
            class="flex items-center justify-between border-b border-slate-100 px-4 py-3"
          >
            <h2 class="text-xs font-bold text-slate-800">অ্যাটাচমেন্ট</h2>

            <span class="text-[10px] text-slate-400">
              {{ order.files?.length || 0 }} টি
            </span>
          </div>

          <div class="divide-y divide-slate-100">
            <div
              v-for="file in order.files"
              :key="file.id"
              class="flex items-center justify-between gap-3 px-4 py-3"
            >
              <div class="flex min-w-0 items-center gap-2">
                <UIcon
                  name="i-lucide-image"
                  class="size-4 shrink-0 text-blue-500"
                />

                <span class="truncate text-xs text-slate-700">
                  {{ file.name }}
                </span>
              </div>

              <a
                :href="file.url"
                target="_blank"
                class="shrink-0 rounded bg-blue-50 px-2.5 py-1.5 text-[10px] font-medium text-blue-600 hover:bg-blue-100"
              >
                দেখুন
              </a>
            </div>
          </div>
        </section>
      </div>

      <!-- RIGHT -->
      <div class="space-y-3">
        <!-- Customer -->
        <section class="rounded-xl border border-slate-200 bg-white">
          <div class="border-b border-slate-100 px-4 py-3">
            <h2 class="text-xs font-bold text-slate-800">কাস্টমার তথ্য</h2>
          </div>

          <div class="space-y-3 p-4">
            <div class="flex gap-3">
              <UIcon name="i-lucide-user" class="size-4 text-slate-400" />

              <div>
                <p class="text-[10px] text-slate-400">নাম</p>

                <p class="text-xs font-medium text-slate-700">
                  {{ order.name }}
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <UIcon name="i-lucide-phone" class="size-4 text-slate-400" />

              <div>
                <p class="text-[10px] text-slate-400">মোবাইল</p>

                <p class="text-xs text-slate-700">
                  {{ order.phone }}
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <UIcon name="i-lucide-map-pin" class="size-4 text-slate-400" />

              <div>
                <p class="text-[10px] text-slate-400">ঠিকানা</p>

                <p class="text-xs leading-5 text-slate-700">
                  {{ order.address }}
                </p>
              </div>
            </div>

            <div v-if="order.note" class="flex gap-3">
              <UIcon
                name="i-lucide-message-square"
                class="size-4 text-slate-400"
              />

              <div>
                <p class="text-[10px] text-slate-400">নোট</p>

                <p class="text-xs leading-5 text-slate-700">
                  {{ order.note }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Payment -->
        <section class="rounded-xl border border-slate-200 bg-white">
          <div class="border-b border-slate-100 px-4 py-3">
            <h2 class="text-xs font-bold text-slate-800">পেমেন্ট তথ্য</h2>
          </div>

          <div class="space-y-3 p-4">
            <div class="flex justify-between">
              <span class="text-xs text-slate-400"> স্ট্যাটাস </span>

              <span class="text-xs font-semibold text-amber-600">
                {{ order.payment_status }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-xs text-slate-400"> পরিমাণ </span>

              <span class="text-xs font-bold text-slate-700">
                ৳ {{ order.total }}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>

  <!-- Loading -->
  <div v-else class="flex min-h-[300px] items-center justify-center">
    <UIcon
      name="i-lucide-loader-circle"
      class="size-6 animate-spin text-blue-600"
    />
  </div>
</template>
