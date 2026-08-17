<script setup></script>

<template>
  <div class="min-h-screen font-body text-base">
    <aside
      class="fixed inset-y-0 left-0 h-screen z-50 w-60 bg-dark text-white -translate-x-full lg:translate-x-0 transition-transform duration-300"
    >
      <div class="border-b border-white/10 px-6 py-2.5">
        <div class="flex items-center gap-3">
          <div class="text-white">
            <UIcon name="i-lucide-printer" class="size-8" />
          </div>
          <div>
            <h1 class="text-xl font-extrabold leading-none">প্রিন্ট সাইড</h1>

            <p class="mt-1 text-xs text-slate-400">এডমিন প্যানেল</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto scrollbar px-4 py-4 space-y-1.5">
        <NuxtLink
          to="/admin"
          class="flex items-center gap-4 rounded px-4 py-2.5 text-sm text-white hover:bg-white/10 hover:text-white"
        >
          <UIcon name="i-lucide-house" class="size-5" />
          <span>ড্যাশবোর্ড</span>
        </NuxtLink>

        <NuxtLink
          to="/admin/orders"
          class="flex items-center gap-4 rounded px-4 py-2.5 text-sm text-white hover:bg-white/10 hover:text-white"
        >
          <UIcon name="i-lucide-clipboard-list" class="size-5" />
          <span>অর্ডার সমূহ</span>
        </NuxtLink>

        <NuxtLink
          to="/admin/services"
          class="flex items-center gap-4 rounded px-4 py-2.5 text-sm text-white hover:bg-white/10 hover:text-white"
        >
          <UIcon name="i-lucide-scissors" class="size-5" />
          <span>সার্ভিসসমূহ</span>
        </NuxtLink>

        <NuxtLink
          to="/admin/users"
          class="flex items-center gap-4 rounded px-4 py-2.5 text-sm text-white hover:bg-white/10 hover:text-white"
        >
          <UIcon name="i-lucide-user-round" class="size-5" />
          <span>কর্মচারী</span>
        </NuxtLink>

        <NuxtLink
          to="#"
          class="flex items-center gap-4 rounded px-4 py-2.5 text-sm text-white hover:bg-white/10 hover:text-white"
        >
          <UIcon name="i-lucide-chart-no-axes-combined" class="size-5" />
          <span>রিপোর্ট</span>
        </NuxtLink>

        <NuxtLink
          to="#"
          class="flex items-center gap-4 rounded px-4 py-2.5 text-sm text-white hover:bg-white/10 hover:text-white"
        >
          <UIcon name="i-lucide-settings" class="size-5" />
          <span>সেটিংস</span>
        </NuxtLink>
      </nav>
    </aside>

    <div class="min-h-screen lg:pl-60">
      <header
        class="bg-white sticky top-0 z-30 py-2 flex items-center border-b border-slate-200 px-4 backdrop-blur"
      >
        <div class="flex items-center gap-5">
          <button
            class="lg:hidden *:flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <UIcon name="i-lucide-menu" class="size-5" />
          </button>
          <div class="hidden w-xs md:block">
            <div class="relative">
              <input
                type="text"
                placeholder="সার্চ করুন..."
                class="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 pr-11 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />

              <UIcon
                name="i-lucide-search"
                class="absolute right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>
        </div>

        <div class="ml-auto flex items-center gap-4">
          <button
            class="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
          >
            <UIcon name="i-lucide-bell" class="size-5" />

            <span
              class="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 text-xs text-white"
            >
              0
            </span>
          </button>
          <button
            class="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500"
          >
            <UIcon name="i-lucide-user-round" class="size-5" />
          </button>
        </div>
      </header>

      <div class="min-h-svh bg-slate-50 p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
