<script setup>
definePageMeta({
  layout: "admin",
});

const serviceStore = useServiceStore();
const { services } = storeToRefs(serviceStore);

const loadServices = async () => {
  await serviceStore.getAll();
};

onMounted(() => {
  loadServices();
});
</script>

<template>
  <main>
    <div class="flex items-center justify-between gap-3 py-4">
      <div>
        <h1 class="text-sm font-bold text-slate-800 sm:text-base">
          সার্ভিস ম্যানেজমেন্ট
        </h1>

        <p class="mt-0.5 text-[9px] text-slate-400 sm:text-[10px]">
          আপনার সকল সার্ভিস এবং মূল্য পরিচালনা করুন
        </p>
      </div>

      <button
        type="button"
        class="flex h-9 items-center gap-1.5 rounded bg-blue-600 px-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <UIcon name="i-lucide-plus" class="h-3.5 w-3.5" />

        <span class="text-sm"> যোগ করুন </span>
      </button>
    </div>

    <div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="service in services"
          :key="service.title"
          class="overflow-hidden rounded-2xl border border-border bg-white transition duration-200 hover:-translate-y-0.5"
        >
          <div class="border-b px-4 py-3.5">
            <div class="flex items-center gap-3">
              <div class="flex size-10 items-center justify-center rounded-xl">
                <img :src="service.image_url" class="size-5" />
              </div>

              <h3 class="text-sm font-bold truncate">
                {{ service.name }}
              </h3>
            </div>
          </div>

          <div class="space-y-4 p-4">
            <div class="space-y-3.5">
              <div
                v-for="variant in service.variants"
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
                  {{ variant.price }} টাকা
                </span>
              </div>
            </div>

            <button
              class="bg-primary text-white w-full items-center justify-center gap-2 rounded text-xs font-semibold transition py-2.5"
            >
              <UIcon name="i-lucide-pencil" class="size-3.5" />
              সম্পাদনা করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
