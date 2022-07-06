<template>
  <main class="main">
    <h1 class="title">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <div class="post" v-html="body"></div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://diarydaylate.microcms.io/api/v1/blogs/${params.slug}`,
      {
        headers: { 'X-MICROCMS-API-KEY': '2b9d0d8843c649d18d7e7d23ad16cc69323d' }
      }
    )
    return data
  }
}
</script>