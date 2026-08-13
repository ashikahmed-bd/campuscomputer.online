<script setup>
const props = defineProps({
  label: String,
  modelValue: [String, Number, Boolean],
  items: {
    type: Array,
    default: () => [],
  },
  error: String,
});

const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div class="relative block mb-3">
    <label v-if="label" class="block mb-2 capitalize">
      {{ label }}
    </label>
    <select
      v-model="modelValue"
      :class="[
        'w-full border rounded px-3 py-2 focus:outline-primary ',
        error ? 'border-red-500' : 'border-gray-300',
      ]"
    >
      <option value="" disabled>Select option</option>
      <option v-for="item in items" :key="item.id" :value="item.id">
        {{ item.label }}
      </option>
    </select>
    <small v-if="error" class="text-red-500">{{ error[0] }}</small>
  </div>
</template>

<style scoped>
/* categories.map((category) => ({
                label: category.name,
                id: category.id,
              })) */
</style>
