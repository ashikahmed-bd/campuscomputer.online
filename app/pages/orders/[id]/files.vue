<script setup>
const route = useRoute()
const { $api } = useNuxtApp()

const files = ref([])
const loading = ref(false)
const error = ref(null)

const upload = async () => {
    error.value = null

    if (!files.value.length) {
        error.value = 'Please select at least one file.'
        return
    }

    loading.value = true

    try {
        const form = new FormData()

        files.value.forEach(file => {
            form.append('files[]', file)
        })

        await $api(`/api/orders/${route.params.id}/files`, {
            method: 'POST',
            body: form
        })
        await navigateTo(`/orders/${route.params.id}/payment`)
    } catch (e) {
        error.value = e?.data?.message || 'Upload failed.'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <main class="min-h-screen bg-gray-50">
        <div class="max-w-xl mx-auto p-4">

            <div class="bg-white rounded-2xl p-4">

                <h1 class="text-2xl font-bold">
                    Upload Documents
                </h1>

                <p class="text-gray-500 mt-2 mb-6">
                    Upload PDF, DOC, DOCX, JPG or PNG files.
                </p>

                <UFileUpload v-model="files" multiple label="Drop files here or click to browse"
                    description="Maximum 20 MB per file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    class="w-full min-h-56" />

                <UAlert v-if="error" color="error" variant="soft" class="mt-4" :title="error" />

                <UButton block size="xl" class="mt-6" :loading="loading" :disabled="!files.length" @click="upload">
                    Upload Files
                </UButton>

            </div>
        </div>
    </main>
</template>