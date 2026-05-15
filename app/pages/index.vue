<script setup>
const banners = [
    {
        id: 1,
        title: "Professional Printing Service",
        subtitle: "Photo Print, Photocopy, Scan & Custom Print",
        image: "https://placehold.co/600x200",
        button_text: "Order Now",
        button_link: "/services/color-print"
    },
    {
        id: 2,
        title: "Passport Photo Service",
        subtitle: "Instant Passport & Visa Size Photo",
        image: "https://placehold.co/600x200",
        button_text: "Get Started",
        button_link: "/services/passport-photo"
    }
]

const categories = [
    { id: 1, name: "Printing", slug: "printing" },
    { id: 2, name: "Photocopy", slug: "photocopy" },
    { id: 3, name: "Photo Studio", slug: "photo-studio" },
    { id: 4, name: "Binding", slug: "binding" },
    { id: 5, name: "Scanning", slug: "scanning" },
    { id: 6, name: "Lamination", slug: "lamination" },
    { id: 7, name: "Custom Print", slug: "custom-print" }
]

const services = [
    {
        id: 1,
        name: "Color Print",
        slug: "color-print",
        description: "High quality color printing",
        base_price: 5,
        variants: [
            { id: 1, name: "A4 Color Print" },
            { id: 2, name: "A3 Color Print" }
        ]
    },
    {
        id: 2,
        name: "Passport Photo",
        slug: "passport-photo",
        description: "Instant passport size photo",
        base_price: 100,
        variants: [
            { id: 3, name: "8 Copy Photo" }
        ]
    },
    {
        id: 3,
        name: "Mug Print",
        slug: "mug-print",
        description: "Custom mug printing",
        base_price: 300,
        variants: [
            { id: 4, name: "White Mug Print" }
        ]
    },
    {
        id: 4,
        name: "Color Print",
        slug: "color-print",
        description: "High quality color printing",
        base_price: 5,
        variants: [
            { id: 1, name: "A4 Color Print" },
            { id: 2, name: "A3 Color Print" }
        ]
    },
    {
        id: 5,
        name: "Passport Photo",
        slug: "passport-photo",
        description: "Instant passport size photo",
        base_price: 100,
        variants: [
            { id: 3, name: "8 Copy Photo" }
        ]
    },
    {
        id: 6,
        name: "Mug Print",
        slug: "mug-print",
        description: "Custom mug printing",
        base_price: 300,
        variants: [
            { id: 4, name: "White Mug Print" }
        ]
    }
]
</script>

<template>
    <main class="bg-background">
        <section class="max-w-full">
            <UCarousel v-slot="{ item }" :items="banners" class="w-full">
                <div class="max-w-lg px-4 py-6">
                    <h1 class="text-2xl font-bold">
                        {{ item.title }}
                    </h1>
                    <p class="mb-5 text-lg">
                        {{ item.subtitle }}
                    </p>

                    <UButton :to="item.button_link" size="lg">
                        {{ item.button_text }}
                    </UButton>
                </div>
            </UCarousel>
        </section>


        <section class="max-w-full px-4 py-2.5">
            <div class="flex justify-between items-center mb-2.5">
                <h2 class="text-xl font-bold">Categories</h2>
                <NuxtLink to="/categories" class="text-primary">
                    View all
                </NuxtLink>
            </div>

            <UCarousel v-slot="{ item }" :items="categories" loop :autoplay="{ delay: 2000 }" :ui="{
                item: 'basis-1/3'
            }" class="w-full">
                <div class="bg-white p-2.5 rounded">
                    <div class="text-center transition">
                        <img src="https://placehold.co/200x200" class="w-14 h-14 mx-auto" />
                        <p class="text-dark mt-3 font-medium truncate">
                            {{ item.name }}
                        </p>
                    </div>
                </div>
            </UCarousel>
        </section>


        <section class="max-w-full px-4 py-2.5">
            <div class="flex justify-between items-center mb-2.5">
                <h2 class="text-xl font-bold">Services</h2>
                <NuxtLink to="/services" class="text-primary">
                    View all
                </NuxtLink>
            </div>

            <div class="grid grid-cols-3 gap-2.5">
                <div v-for="service in services" :key="service.id" class="group">
                    <div
                        class="bg-white rounded border border-gray-100 p-2.5 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                        <img src="https://placehold.co/200x200" class="w-14 h-14 mx-auto rounded-lg" />
                        <h3 class="text-sm font-semibold text-gray-800 truncate py-2 text-center">
                            {{ service.name }}
                        </h3>
                        <div class="flex items-center justify-between">
                            <p class="text-primary font-bold text-lg">
                                ৳{{ service.base_price }}
                            </p>
                            <UModal title="Service Information">
                                <button
                                    class="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white hover:scale-110 hover:bg-primary/90 active:scale-95 transition-all duration-200">
                                    <UIcon name="i-lucide-plus" class="size-4" />
                                </button>

                                <template #body>
                                    <div class="space-y-6 p-2">
                                        <div class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4">
                                            <div class="flex justify-between items-start mb-5">
                                                <div>
                                                    <h2 class="text-xl font-bold">Photocopy</h2>
                                                    <p class="text-sm text-gray-600 mt-1">
                                                        High quality photocopy service for documents
                                                    </p>
                                                </div>
                                                <UBadge color="warning" variant="soft">
                                                    File Required
                                                </UBadge>
                                            </div>

                                            <label
                                                class="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-primary/30 rounded-2xl cursor-pointer bg-white hover:bg-primary/5 hover:border-primary transition-all duration-300">

                                                <UIcon name="i-lucide-upload-cloud" class="w-12 h-12 text-primary" />

                                                <p class="text-sm font-medium text-gray-700">
                                                    Click to upload file
                                                </p>

                                                <p class="text-xs text-gray-500 mt-1">
                                                    PDF, JPG, PNG (Max 10MB)
                                                </p>

                                                <input type="file" class="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                                            </label>
                                        </div>

                                        <div class="w-full">
                                            <h3 class="font-semibold mb-3">Available Options</h3>
                                            <div class="space-y-3">
                                                <div class="border rounded p-4 hover:border-primary transition">
                                                    <div class="flex justify-between items-center">
                                                        <div>
                                                            <h4 class="font-semibold">Single Side Copy</h4>
                                                            <p class="text-sm text-gray-500">
                                                                Side: Single
                                                            </p>
                                                        </div>

                                                        <div
                                                            class="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold">
                                                            ৳1
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="border rounded p-4 hover:border-primary transition">
                                                    <div class="flex justify-between items-center">
                                                        <div>
                                                            <h4 class="font-semibold">Double Side Copy</h4>
                                                            <p class="text-sm text-gray-500">
                                                                Side: Double
                                                            </p>
                                                        </div>

                                                        <div
                                                            class="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold">
                                                            ৳2
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <UButton block size="lg" color="primary" class="rounded-xl">
                                            Add to Cart
                                        </UButton>
                                    </div>
                                </template>
                            </UModal>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
