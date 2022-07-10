<template>
  <div>
    {{ title }}
    <v-img
      :src="eyecatch.url"
      :aspect-ratio="16/9"
      width="700"
      height="400"
      class="mx-auto"
    />
    {{ new Date(publishedAt).toLocaleDateString() }}
    <div class="post" v-html="body"></div>
    <div>
      <v-btn
        outlined
        color="primary"
        to="/"
      >
        <v-icon size="16"> 
          <!-- fas fa-angle-double-left -->
          mdi-home
        </v-icon>
        <span class="ml-1">ホームへ戻る</span>
      </v-btn>
    </div>
  </div>
  <!-- <main class="main">
    <h1 class="title">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <div class="post" v-html="body"></div>
  </main> -->
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://diarydaylate.microcms.io/api/v1/blogs/${params.slug}`,
      {
        headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
      }
    )
    return data
  }
}
</script>