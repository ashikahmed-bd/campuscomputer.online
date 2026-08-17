<script setup></script>

<template>
  <div class="min-h-dvh">
    <Header />

    <main
      class="bg-light max-w-sm mx-auto min-h-[calc(100dvh-64px)] w-full px-2.5 pb-20"
    >
      <slot />
    </main>

    <Footer />
  </div>
</template>
