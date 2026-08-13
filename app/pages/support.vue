<script setup></script>

<template>
  <main class="px-4 py-6 space-y-6">
    <div>
      <h1 class="text-xl font-bold">Help & Information</h1>

      <p class="mt-1 text-sm text-gray-500">
        Find contact details, payment information, and answers to common
        questions.
      </p>
    </div>

    <section class="rounded-2xl border border-gray-200 bg-white p-5">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-phone" class="size-5 text-primary" />
        <h2 class="font-semibold">Contact Us</h2>
      </div>

      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-500">Phone:</span>
          <a href="tel:+8801712345678" class="font-medium text-primary">
            +880 1712-250957
          </a>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500">Email:</span>
          <a href="mailto:info@example.com" class="font-medium text-primary">
            info@example.com
          </a>
        </div>

        <div class="flex justify-between">
          <p class="text-gray-500 mb-1">Address:</p>
          <p class="font-normal text-gray-700 text-sm">
            আমবাগান, সেনওয়ালিয়া, <br />
            আশুলিয়া, সাভার, ঢাকা -১৩৪৪
          </p>
        </div>
      </div>
    </section>

    <!-- Payment -->
    <section class="rounded-2xl border border-gray-200 bg-white p-5">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-wallet" class="size-5 text-primary" />
        <h2 class="font-semibold">Payment Method</h2>
      </div>

      <ul class="space-y-2 text-sm text-body">
        <li>• Cash on Pickup</li>
        <li>• Cash on Delivery</li>
        <li>• bKash</li>
        <li>• Nagad</li>
      </ul>
    </section>

    <!-- Working Hours -->
    <section class="rounded-2xl border border-gray-200 bg-white p-5">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-clock-3" class="size-5 text-primary" />
        <h2 class="font-semibold">Working Hours</h2>
      </div>

      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span>Saturday - Thursday</span>
          <span>9:00 AM - 8:00 PM</span>
        </div>

        <div class="flex justify-between">
          <span>Friday</span>
          <span>Closed</span>
        </div>
      </div>
    </section>

    <!-- Quick Help -->
    <section class="rounded-2xl border border-gray-200 bg-white p-5">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-lucide-circle-help" class="size-5 text-primary" />
        <h2 class="font-semibold">Quick Help</h2>
      </div>

      <div class="space-y-3 text-sm text-gray-700">
        <p>• Place your order from the Services page.</p>
        <p>• Track your order from the Orders page.</p>
        <p>• Contact us if you need any changes before printing starts.</p>
        <p>• Keep your order number for support.</p>
      </div>
    </section>
  </main>
</template>
