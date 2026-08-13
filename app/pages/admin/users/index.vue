<script setup>
definePageMeta({
  layout: "admin",
});

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

onMounted(async () => {
  await userStore.all();
});
</script>

<template>
  <main class="space-y-3">
    <div
      class="flex items-center justify-between border-b border-slate-200 bg-white py-2"
    >
      <div>
        <h1 class="text-sm font-semibold text-slate-700">ইউজার সমূহ</h1>
        <p class="mt-0.5 text-xs text-slate-400">সকল ইউজার এবং তাদের তথ্য</p>
      </div>

      <button
        type="button"
        class="flex items-center gap-1.5 rounded bg-primary px-3 py-2 text-xs font-medium text-white transition hover:bg-primary/80"
      >
        <UIcon name="i-lucide-plus" class="size-3.5" />
        যোগ করুন
      </button>
    </div>

    <div class="rounded-lg border border-slate-200 bg-white p-3">
      <div class="flex items-center justify-between">
        <div class="form__group">
          <label class="form__label">খুঁজুন</label>
          <input
            type="search"
            class="form__control"
            placeholder="নাম, ইমেইল বা ফোন..."
          />
        </div>

        <div class="form__group w-40">
          <label class="form__label">রোল</label>
          <select class="form__control">
            <option value="">সব রোল</option>
            <option value="admin">অ্যাডমিন</option>
            <option value="manager">ম্যানেজার</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-slate-200 bg-slate-50">
            <tr>
              <th class="px-4 py-3 font-medium text-slate-500">ইউজার</th>

              <th class="px-4 py-3 font-medium text-slate-500">ইমেইল</th>

              <th class="px-4 py-3 font-medium text-slate-500">ফোন</th>

              <th class="px-4 py-3 font-medium text-slate-500">রোল</th>

              <th class="px-4 py-3 font-medium text-slate-500">ভেরিফিকেশন</th>

              <th class="px-4 py-3 text-right font-medium text-slate-500">
                অ্যাকশন
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="user in users"
              :key="user.id"
              class="transition hover:bg-slate-50/70"
            >
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                  >
                    {{ user.name.charAt(0).toUpperCase() }}
                  </div>

                  <div>
                    <p class="font-medium text-slate-700">
                      {{ user.name }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="px-4 py-3 text-slate-600">
                {{ user.email }}
              </td>

              <td class="px-4 py-3 text-slate-600">
                {{ user.phone }}
              </td>

              <td class="px-4 py-3">
                <span
                  :class="
                    user.role === 'admin'
                      ? 'bg-purple-50 text-purple-600'
                      : 'bg-blue-50 text-blue-600'
                  "
                  class="inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium"
                >
                  {{ user.role === "admin" ? "অ্যাডমিন" : "ম্যানেজার" }}
                </span>
              </td>

              <td class="px-4 py-3">
                <span
                  v-if="user.email_verified_at"
                  class="inline-flex items-center gap-1 text-emerald-600"
                >
                  <UIcon name="i-lucide-circle-check" class="size-3.5" />
                  ভেরিফাইড
                </span>

                <span
                  v-else
                  class="inline-flex items-center gap-1 text-slate-400"
                >
                  <UIcon name="i-lucide-circle-x" class="size-3.5" />
                  ভেরিফাইড নয়
                </span>
              </td>

              <td class="px-4 py-3">
                <div class="flex justify-end gap-1">
                  <button
                    type="button"
                    class="flex size-8 items-center justify-center rounded text-slate-500 transition hover:bg-slate-100 hover:text-primary"
                    title="দেখুন"
                  >
                    <UIcon name="i-lucide-eye" class="size-4" />
                  </button>

                  <button
                    type="button"
                    class="flex size-8 items-center justify-center rounded text-slate-500 transition hover:bg-slate-100 hover:text-primary"
                    title="এডিট"
                  >
                    <UIcon name="i-lucide-pencil" class="size-4" />
                  </button>

                  <button
                    type="button"
                    class="flex size-8 items-center justify-center rounded text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                    title="ডিলিট"
                  >
                    <UIcon name="i-lucide-trash-2" class="size-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty -->
      <div
        v-if="!users.length"
        class="flex flex-col items-center justify-center py-12"
      >
        <UIcon name="i-lucide-users-round" class="size-8 text-slate-300" />

        <p class="mt-2 text-sm font-medium text-slate-500">
          কোনো ইউজার পাওয়া যায়নি
        </p>

        <p class="mt-1 text-xs text-slate-400">নতুন ইউজার যোগ করুন</p>
      </div>
    </div>
  </main>
</template>
