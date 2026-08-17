<script setup>
const cartStore = useCartStore();

const {
  data: cart,
  pending,
  error,
  refresh,
} = await useAsyncData("cart", () => {
  return cartStore.getCart();
});

const form = reactive({
  name: "",
  phone: "",
  address: "",
  note: "",
});

const coupon = ref("");

const applyCoupon = async () => {
  if (!coupon.value) return;

  await cartStore.applyCoupon({
    code: coupon.value,
  });

  await refresh();
};

const checkout = async () => {
  await cartStore.checkout(form);
};

const remove = async (item) => {
  await cartStore.remove(item);
  await refresh();
};

const increase = async (item) => {
  await cartStore.update(item.id, item.quantity + 1);
  await refresh();
};

const decrease = async (item) => {
  if (item.quantity <= 1) {
    await remove(item);
    return;
  }

  await cartStore.update(item.id, item.quantity - 1);
  await refresh();
};

const clear = async () => {
  await cartStore.clear();
  await refresh();
};
</script>

<template>
  <main>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" @retry="refresh" />

    <template v-else-if="cart">
      <div class="sticky top-0 z-20">
        <div class="flex items-center justify-between py-2">
          <h1 class="text-lg font-bold">My Cart</h1>
          <button @click="clear" class="text-danger text-sm">Clear</button>
        </div>
      </div>

      <div class="space-y-4">
        <template v-if="cart?.items.length">
          <div
            v-for="item in cart?.items"
            :key="item.id"
            class="bg-white rounded-2xl p-2.5"
          >
            <div class="flex gap-3">
              <img
                :src="item.service.image_url"
                class="w-20 h-20 rounded-xl object-cover"
              />
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <div>
                    <h2 class="font-semibold text-base">
                      {{ item.service.name }}
                    </h2>

                    <p class="text-sm text-gray-500">
                      {{ item.variant.name }}
                    </p>
                  </div>

                  <button
                    @click="remove(item.id)"
                    class="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition"
                  >
                    <UIcon name="i-heroicons-trash" class="w-5 h-5" />
                  </button>
                </div>
                <div class="mt-2 flex items-center justify-between">
                  <span class="font-bold text-indigo-600">
                    ৳{{ item.price }}
                  </span>
                  <div class="flex items-center bg-gray-100 rounded-full">
                    <button
                      @click="decrease(item)"
                      :disabled="item.quantity <= 1"
                      class="w-9 h-9 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <UIcon
                        name="i-heroicons-minus-20-solid"
                        class="w-5 h-5"
                      />
                    </button>

                    <span class="w-8 text-center font-medium">
                      {{ item.quantity }}
                    </span>

                    <button
                      @click="increase(item)"
                      class="w-9 h-9 flex items-center justify-center text-indigo-600"
                    >
                      <UIcon name="i-heroicons-plus-20-solid" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-2xl bg-white space-y-4 px-4 py-4">
            <h2 class="text-lg font-semibold text-gray-900">
              Delivery Information
            </h2>

            <div class="block">
              <label
                class="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <UIcon name="i-lucide-user" class="size-4 text-primary" />
                Full Name
              </label>

              <input
                v-model="form.name"
                type="text"
                placeholder="Enter your full name"
                class="w-full rounded border border-border bg-gray-50 px-4 py-2 transition focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>

            <div class="block">
              <label
                class="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <UIcon name="i-lucide-phone" class="size-4 text-primary" />
                Phone Number
              </label>

              <input
                v-model="form.phone"
                type="tel"
                placeholder="01XXXXXXXXX"
                class="w-full rounded border border-border bg-gray-50 px-4 py-2 transition focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>

            <div class="block">
              <label
                class="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <UIcon name="i-lucide-map-pin" class="size-4 text-primary" />
                Address
              </label>

              <textarea
                v-model="form.address"
                placeholder="Enter your delivery address"
                class="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-primary focus:bg-white focus:outline-none"
              ></textarea>
            </div>

            <div class="block">
              <label
                class="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <UIcon
                  name="i-lucide-notebook-pen"
                  class="size-4 text-primary"
                />
                Order Note <span class="text-gray-400">(Optional)</span>
              </label>

              <textarea
                v-model="form.note"
                placeholder="Special instructions..."
                class="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-primary focus:bg-white focus:outline-none"
              ></textarea>
            </div>
          </div>

          <div class="bg-white rounded-xl p-4">
            <div class="space-y-4">
              <div class="">
                <label class="text-sm font-medium text-gray-700">
                  Coupon Code
                </label>
                <div class="relative">
                  <input
                    v-model="coupon"
                    type="text"
                    placeholder="Enter coupon code"
                    class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-24 py-2.5 focus:border-primary focus:bg-white focus:outline-none"
                  />

                  <button
                    @click="applyCoupon"
                    :disabled="!coupon"
                    class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>৳{{ cart?.subtotal }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Discount</span>
                  <span>৳{{ cart?.discount }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Delivery</span>
                  <span>৳{{ cart?.delivery_charge }}</span>
                </div>
                <div
                  class="flex justify-between text-sm font-bold border-t border-dashed py-2"
                >
                  <span>Total</span>
                  <span> ৳{{ cart?.total }} </span>
                </div>
              </div>

              <button
                @click="checkout"
                class="w-full py-2.5 rounded-xl bg-primary text-white font-semibold active:scale-95 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </template>

        <EmptyCart v-else />
      </div>
    </template>

    <EmptyState v-else />
  </main>
</template>
