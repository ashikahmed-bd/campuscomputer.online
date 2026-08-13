<script setup>
const props = defineProps({
  label: { type: String, default: "" },
  modelValue: { type: [File, Object, null], default: null },
  required: { type: Boolean, default: false },
  accept: { type: String, default: "image/*" },
  error: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  preview: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (e) => {
  const file = e.target.files?.[0] || null;
  emit("update:modelValue", file);
};
</script>

<template>
  <div class="relative mb-3">
    <label v-if="label" class="mb-2 block capitalize">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <input
      type="file"
      :accept="accept"
      :disabled="disabled"
      @change="updateValue"
      class="w-full rounded border border-border px-4 py-2 file:mr-4 file:rounded file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:opacity-90 focus:border-primary focus:outline-none disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
    />

    <div v-if="preview" class="mt-3">
      <img
        :src="preview"
        alt="Preview"
        class="h-24 w-24 rounded border border-border object-cover"
      />
    </div>

    <small v-if="error" class="text-red-500">
      {{ error[0] }}
    </small>
  </div>
</template>
