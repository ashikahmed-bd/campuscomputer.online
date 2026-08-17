<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  keywords: {
    type: String,
    default: "",
  },

  image: {
    type: String,
    default: "/og-image.jpg",
  },

  url: {
    type: String,
    default: "",
  },

  robots: {
    type: String,
    default: "index, follow",
  },

  author: {
    type: String,
    default: "Campus Computer",
  },
});

const requestUrl = useRequestURL();
</script>

<template>
  <Head>
    <Title>{{ props.title }}</Title>

    <Meta name="description" :content="props.description" />
    <Meta name="keywords" :content="props.keywords" />
    <Meta name="robots" :content="props.robots" />
    <Meta name="author" :content="props.author" />

    <Link rel="canonical" :href="props.url ?? requestUrl.href" />

    <Meta property="og:title" :content="props.title" />
    <Meta property="og:description" :content="props.description" />
    <Meta property="og:image" :content="image" />
    <Meta property="og:image:width" content="1200" />
    <Meta property="og:image:height" content="630" />
    <Meta property="og:image:alt" :content="props.title" />
    <Meta property="og:url" :content="url" />
    <Meta property="og:type" content="website" />
    <Meta property="og:site_name" content="Campus Computer" />
    <Meta property="og:locale" content="en_US" />

    <Meta property="fb:app_id" content="" />

    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" :content="props.title" />
    <Meta name="twitter:description" :content="props.description" />
    <Meta name="twitter:image" :content="image" />
  </Head>
</template>
