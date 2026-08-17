<script setup>
const route = useRoute();
const toast = useToast();
const paymentStore = usePaymentStore();

const files = ref([]);

const upload = async () => {
  if (!files.value.length) {
    return;
  }

  const form = new FormData();

  files.value.forEach((file) => {
    form.append("files[]", file);
  });

  const response = await paymentStore.pay(route.params.id, form);

  if (!response.success) {
    toast.add({
      title: response.message,
    });
  }
};
</script>

<template>
  <main class="py-4">
    <div class="bg-white rounded-2xl p-4">
      <h1 class="text-2xl font-bold">Upload Documents</h1>
      <p class="text-gray-500 mt-2 mb-6">
        Upload PDF, DOC, DOCX, JPG or PNG files.
      </p>

      <UFileUpload
        v-model="files"
        multiple
        label="Drop files here or click to browse"
        description="Maximum 20 MB per file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        class="w-full min-h-40"
      />

      <UButton
        block
        size="xl"
        class="mt-6"
        :loading="paymentStore.loading"
        :disabled="!files.length"
        @click="upload"
      >
        Pay Now
      </UButton>
    </div>
  </main>
</template>
