<script setup>
definePageMeta({
  layout: "admin",
});

const appStore = useAppStore();

const selectedDate = ref(new Date().toISOString().slice(0, 10));

const { data, pending, error, refresh } = await useAsyncData(
  "dashboard",
  async () => {
    return await appStore.dashboard(selectedDate.value);
  },
);

const dateInput = ref(null);

const openDatePicker = () => {
  dateInput.value?.showPicker?.();
};

const changeDate = async (event) => {
  selectedDate.value = event.target.value;

  await refresh();
};
</script>

<template>
  <main>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-if="data">
      <div class="space-y-6">
        <!-- Header -->
        <header
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1
              class="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
            >
              ড্যাশবোর্ড
            </h1>

            <p class="mt-1 text-sm text-slate-500">
              আপনার ব্যবসার সার্বিক পরিস্থিতি দেখুন · মোট আয়
              <span class="ml-1 font-semibold text-emerald-600">
                ৳{{ data?.total_income ?? 0 }}
              </span>
            </p>
          </div>

          <button
            type="button"
            @click="openDatePicker"
            class="relative inline-flex w-fit items-center gap-2 rounded border border-slate-200 bg-white px-3.5 py-2 text-sm transition hover:bg-slate-50"
          >
            <UIcon
              name="i-lucide-calendar-days"
              class="size-4.5 text-slate-500"
            />

            <span>{{ $date(data?.date) }}</span>

            <UIcon name="i-lucide-chevron-down" class="size-4 text-slate-400" />

            <input
              ref="dateInput"
              type="date"
              :value="selectedDate"
              @change="changeDate"
              class="pointer-events-none absolute inset-0 opacity-0"
            />
          </button>
        </header>

        <section class="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div
            class="group overflow-hidden rounded-2xl border border-border bg-white p-4 transition duration-200 hover:-translate-y-0.5"
          >
            <div class="flex items-center gap-3.5">
              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50"
              >
                <UIcon name="i-lucide-file-text" class="size-6 text-blue-600" />
              </div>

              <div>
                <p class="text-sm font-medium text-slate-500">মোট অর্ডার</p>

                <h3
                  class="mt-0.5 text-2xl font-bold tracking-tight text-slate-950"
                >
                  {{ data?.orders?.all ?? 0 }}
                </h3>
              </div>
            </div>

            <p class="mt-3 text-xs text-slate-400">নির্বাচিত দিনে মোট অর্ডার</p>
          </div>

          <div
            class="group overflow-hidden rounded-2xl border border-border bg-white p-4 transition duration-200 hover:-translate-y-0.5"
          >
            <div class="flex items-center gap-3.5">
              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-50"
              >
                <UIcon name="i-lucide-clock-3" class="size-6 text-amber-600" />
              </div>

              <div>
                <p class="text-sm font-medium text-slate-500">পেন্ডিং অর্ডার</p>

                <h3
                  class="mt-0.5 text-2xl font-bold tracking-tight text-slate-950"
                >
                  {{ data?.orders?.pending ?? 0 }}
                </h3>
              </div>
            </div>

            <p class="mt-3 text-xs text-slate-400">
              নির্বাচিত দিনে পেন্ডিং অর্ডার
            </p>
          </div>

          <div
            class="group overflow-hidden rounded-2xl border border-border bg-white p-4 transition duration-200 hover:-translate-y-0.5"
          >
            <div class="flex items-center gap-3.5">
              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-50"
              >
                <UIcon
                  name="i-lucide-circle-check"
                  class="size-6 text-violet-600"
                />
              </div>

              <div>
                <p class="text-sm font-medium text-slate-500">
                  কনফার্মড অর্ডার
                </p>

                <h3
                  class="mt-0.5 text-2xl font-bold tracking-tight text-slate-950"
                >
                  {{ data?.orders?.confirmed ?? 0 }}
                </h3>
              </div>
            </div>

            <p class="mt-3 text-xs text-slate-400">
              নির্বাচিত দিনে কনফার্মড অর্ডার
            </p>
          </div>

          <div
            class="group overflow-hidden rounded-2xl border border-border bg-white p-4 transition duration-200 hover:-translate-y-0.5"
          >
            <div class="flex items-center gap-3.5">
              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50"
              >
                <UIcon
                  name="i-lucide-package-check"
                  class="size-6 text-emerald-600"
                />
              </div>

              <div>
                <p class="text-sm font-medium text-slate-500">
                  ডেলিভার্ড অর্ডার
                </p>

                <h3
                  class="mt-0.5 text-2xl font-bold tracking-tight text-slate-950"
                >
                  {{ data?.orders?.delivered ?? 0 }}
                </h3>
              </div>
            </div>

            <p class="mt-3 text-xs text-slate-400">
              নির্বাচিত দিনে ডেলিভার্ড অর্ডার
            </p>
          </div>
        </section>

        <section>
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-900">
                সার্ভিস ও মূল্য তালিকা
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                সকল সার্ভিসের বর্তমান মূল্য
              </p>
            </div>

            <button
              class="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 sm:flex"
            >
              <UIcon name="i-lucide-settings-2" class="size-4" />
              সেটিংস
            </button>
          </div>

          <UCarousel
            v-slot="{ item }"
            loop
            :autoplay="{ delay: 2000 }"
            wheel-gestures
            :items="data.services"
            :ui="{
              item: 'basis-1/4',
            }"
          >
            <article
              class="overflow-hidden rounded border border-border bg-white transition duration-200 hover:-translate-y-0.5"
            >
              <div class="border-b px-4 py-3.5">
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-50"
                  >
                    <UIcon
                      name="i-lucide-layers-3"
                      class="size-5 text-slate-600"
                    />
                  </div>

                  <div class="min-w-0">
                    <h3 class="truncate text-sm font-bold text-slate-900">
                      {{ item.name }}
                    </h3>

                    <p class="mt-0.5 truncate text-xs text-slate-500">
                      {{ item.variants?.length ?? 0 }}টি ভ্যারিয়েন্ট
                    </p>
                  </div>
                </div>
              </div>

              <div class="p-4">
                <div v-if="item.variants?.length" class="space-y-3.5">
                  <div
                    v-for="variant in item.variants"
                    :key="variant.id"
                    class="flex items-center gap-2 text-xs"
                  >
                    <span class="shrink-0 text-slate-600">
                      {{ variant.name }}
                    </span>

                    <span
                      class="min-w-4 flex-1 border-b border-dashed border-slate-200"
                    />

                    <span class="shrink-0 font-semibold text-slate-800">
                      ৳{{ variant.price }}
                    </span>
                  </div>
                </div>

                <div v-else class="py-4 text-center text-xs text-slate-400">
                  কোনো ভ্যারিয়েন্ট নেই
                </div>

                <button
                  class="mt-5 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  <UIcon name="i-lucide-pencil" class="size-3.5" />
                  সম্পাদনা করুন
                </button>
              </div>
            </article>
          </UCarousel>
        </section>

        <section>
          <div class="rounded-2xl border border-border bg-white">
            <div
              class="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 class="text-lg font-bold text-slate-900">
                  সাম্প্রতিক অর্ডার সমূহ
                </h2>
                <p class="mt-1 text-xs text-slate-400">
                  সর্বশেষ অর্ডারগুলোর তালিকা
                </p>
              </div>

              <NuxtLink
                to="/admin/orders"
                class="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                সকল অর্ডার
                <UIcon name="i-lucide-arrow-up-right" class="size-4" />
              </NuxtLink>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-slate-100 bg-slate-50/60">
                    <th
                      class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                    >
                      অর্ডার
                    </th>

                    <th
                      class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                    >
                      কাস্টমার
                    </th>

                    <th
                      class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                    >
                      সার্ভিস
                    </th>

                    <th
                      class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                    >
                      মূল্য
                    </th>

                    <th
                      class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                    >
                      স্ট্যাটাস
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-slate-100">
                  <tr
                    v-for="order in data.latest_orders"
                    :key="order.id"
                    class="group transition hover:bg-slate-50/70"
                  >
                    <!-- Order -->
                    <td class="px-5 py-3.5">
                      <NuxtLink
                        :to="`/admin/orders/${order.id}`"
                        class="font-semibold text-blue-600 transition hover:text-blue-700"
                      >
                        #{{ order.order_no }}
                      </NuxtLink>

                      <p class="mt-0.5 text-xs text-slate-400">
                        {{ order.created_at }}
                      </p>
                    </td>

                    <!-- Customer -->
                    <td class="px-3 py-3.5">
                      <div>
                        <p class="font-medium text-slate-900">
                          {{ order.name }}
                        </p>

                        <p class="mt-0.5 text-xs text-slate-500">
                          {{ order.phone }}
                        </p>
                      </div>
                    </td>

                    <!-- Items -->
                    <td class="px-3 py-3.5 text-slate-600">
                      <span
                        class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                      >
                        {{ order.items?.length ?? 0 }}
                        {{
                          (order.items?.length ?? 0) === 1 ? "item" : "items"
                        }}
                      </span>
                    </td>

                    <!-- Amount -->
                    <td class="px-3 py-3.5">
                      <p class="font-semibold text-slate-900">
                        ৳{{ order.total }}
                      </p>

                      <p class="mt-0.5 text-xs text-slate-400">
                        {{ order.payment_status }}
                      </p>
                    </td>

                    <!-- Status -->
                    <td class="px-5 py-3.5">
                      <span
                        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                        :class="{
                          'bg-amber-50 text-amber-700':
                            order.status === 'pending',
                          'bg-blue-50 text-blue-700':
                            order.status === 'confirmed',
                          'bg-indigo-50 text-indigo-700':
                            order.status === 'processing',
                          'bg-green-50 text-green-700':
                            order.status === 'delivered',
                          'bg-red-50 text-red-700':
                            order.status === 'cancelled',
                        }"
                      >
                        <span class="size-1.5 rounded-full bg-current" />
                        {{ order.status }}
                      </span>
                    </td>
                  </tr>

                  <!-- Empty -->
                  <tr v-if="!data.latest_orders?.length">
                    <td
                      colspan="5"
                      class="px-5 py-10 text-center text-sm text-slate-500"
                    >
                      No orders found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </template>

    <EmptyState v-else />
  </main>
</template>
