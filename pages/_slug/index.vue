<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    {{ currentPost.title }}
    <v-img
      :src="$eyecatch(currentPost)"
      :aspect-ratio="16/9"
      width="700"
      height="400"
      class="mx-auto"
    />
    {{ new Date(currentPost.publishedAt).toLocaleDateString() }}
    <div class="post" v-html="currentPost.body"></div>
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
// import axios from 'axios'
// import defaultEyeCatch from '~/assets/images/defaultEyeCatch.png'


export default {
  computed: {
    breadcrumbs() {
      const category = this.currentPost.category
      return [
        { text: 'ホーム', to: '/'},
        { text: category.name, to: '#'}
      ]
    },
    // 次をPlugin化してコメント最終ラインのreturnのみ生かす方法はエラーになる
    // しかし、タグに直接「$eyecatch(post)」を書いたらうまくいった。
    // setEyeCatch: () => (post) => {
    //   // return { url: `https:${post.eyecatch.url}` }
    //   // console.log(post.eyecatch.url)
    //   if (post.eyecatch)
    //     return post.eyecatch.url
    //   return defaultEyeCatch
    //   // return this.$eyecatch(post)
    // }
  },
  // async asyncData({ params }) {
  //   const { data } = await axios.get(
  //     `https://diarydaylate.microcms.io/api/v1/blogs/${params.slug}`,
  //     {
  //       headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
  //     }
  //   )
  //   console.log("_slug : ", data)
  //   return data
  // }
  async asyncData({ payload, store, params, error }) {
    // console.log((payload)? 'payload=OK': 'payload=NG' )
    // console.log(`${params.slug}`)
    const currentPost = payload || await store.state.posts.find(post => post.id === `${params.slug}`)

    if (currentPost) {
      // console.log('currentPost= ', currentPost)
      // body: (...)
      // category: Object
      //   createdAt: (...)
      //   id: (...)
      //   name: "2022-07"
      //   publishedAt: (...)
      //   revisedAt: (...)
      //   updatedAt: (...)
      //   ...
      // createdAt: (...)
      // eyecatch: (...)
      // id: (...)
      // publishedAt: (...)
      // revisedAt: (...)
      // title: (...)
      // updatedAt: (...)
      return { currentPost }
    } else {
      return error({ statusCode: 400 })
    }
  }
}
</script>

<style>
pre {
word-wrap: break-word;
background-color: #e8e8e8;
padding: 10px;
border-radius: 4px;
font-size: 16px;
}

/* 次で、Codeの背景色が同じにならない
pre code {
  background-color: #e8e8e8;
} */
</style>