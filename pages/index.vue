<template>
  <v-row justify="center">
    <!-- <a href="/download/hoge.pdf" download="hoge.pdf">download</a> -->
    <v-col cols="12" sm="11" md="10" xl="8">
      <v-row>
        <v-col
          v-for="content in $store.getters.takePosts" :key="content.id"
          cols="12" sm="6" lg="4" xl="3"
        >
        <!-- v-for="content in posts" :key="content.id" -->
        <!--           v-for="content in contents" :key="content.id" -->
          <v-card max-width="400" class="mx-auto">
            <!-- <img src="~/assets/images/defaultEyeCatch.png" /> OK -->
            <!-- <img :src="content.eyecatch" alt=""> NG -->
            <v-img
              :src="$eyecatch(content)"
              :aspect-ratio="16/9"
              max-height="200"
              class="white--text"
            >
            <!-- :src="setEyeCatch(content)" :src="content.eyecatch.url" -->
              <v-card-text>
                <v-chip
                  small
                  dark
                  :color="categoryColor(content.category.name)"
                  :to="'/categories/' + content.category.id"
                  class="font-weight-bold"
                >
                <!-- :to="linkTo(content.category)" -->
                  {{ content.category.name }}
                </v-chip>
              </v-card-text>
            </v-img>
              <v-card-title
                class="fill-height"
              >
              <!--font-weight-bold align-end fuchidori-->
                {{ content.title }}
              </v-card-title>
            <v-card-text>
              <!-- {{ getsatou(content.publishedAt) }} -->
              {{ new Date(content.publishedAt).toLocaleDateString() }}
              <!-- body: (...)
                category: (...)
                createdAt: (...)
                eyecatch: (...)
                id: (...)
                publishedAt: (...)
                revisedAt: (...)
                title: (...)
                updatedAt: (...)
                -->
            </v-card-text>
            <v-list-item
              three-line
              style="min-height: unset;"
            >
              <v-list-item-subtitle v-html="content.body">
              </v-list-item-subtitle>
            </v-list-item>
            <v-card-actions>
              <v-spacer />
              <v-btn 
                text 
                color="primary"
                :to="'/' + content.id"
              >
                この記事を見る
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <!-- <ul>
    <li v-for="content in contents" :key="content.id">
      <nuxt-link :to="`/${content.id}`">
        {{ content.title }}
      </nuxt-link>
    </li>
  </ul> -->
</template>

<script>
// import axios from 'axios'
// import defaultEyeCatch from '~/assets/images/defaultEyeCatch.png'

export default {
  computed: {
    // 次のように3通りの書き方がある
    // categoryColor() {
    // categoryColor: function () {
    //   return (categoryName) => {
    //     // '2022-06' str.substring(開始位置, 終了位置);
    //     return (Number(categoryName.substring(5)) % 2)?
    //        'primary':
    //        'red darken-3'
    //   }
    // }
    categoryColor: () => (categoryName) => {
      return (Number(categoryName.substring(5)) % 2)?
           'primary':
           'red darken-3'
    },
    // 次をPlugin化してコメント最終ラインのreturnのみ生かす方法はエラーになる
    // しかし、タグに直接「$eyecatch(post)」を書いたらうまくいった。
    // setEyeCatch: () => (post) => {
    //   if (post.eyecatch)
    //     return post.eyecatch.url
    //   return defaultEyeCatch
    //   // return this.$eyecatch(post)
    // }
  },
  // 0から始まる曜日を得る（OK）
  // computed: {
  //   getsatou() {
  //     return (arg) => {
  //       let day = new Date(arg)
  //       return day.getDay()
  //     }
  //   }
  // },
  // async asyncData() {
    // const { data } = await axios.get(
    //   // your-service-id部分は自分のサービスidに置き換えてください
    //   'https://diarydaylate.microcms.io/api/v1/blogs',
    //   {
    //     // your-api-key部分は自分のapi-keyに置き換えてください
    //     headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
    //   }
    // )
    // return data
    // 次のように書ける（本文も変更、contents-->posts）
    // let posts = []
    // await axios.get(
    //   'https://diarydaylate.microcms.io/api/v1/blogs?limit=100',
    //   {
    //     headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
    //   }
    // ).then(
    //   res => {
    //     (posts = res.data.contents)
    //     console.log(res.data)
    //   }
    // )
    // return {posts}
    // console.log(data) で、次のデータが取れた
    // {
    //   contents: [
    //     {
    //       id: '65ukj3a_kbzi',
    //       createdAt: '2022-07-10T23:47:25.127Z',
    //       updatedAt: '2022-07-10T23:47:25.127Z',
    //       publishedAt: '2022-07-10T23:47:25.127Z',
    //       revisedAt: '2022-07-10T23:47:25.127Z',
    //       title: '参院選',
    //       body: '<p>昨日は参院選があり...</p>',
    //       eyecatch: [Object],
    //       category: [Object]
    //     },
    //     ...
    //   ],
    //   totalCount: 11,
    //   offset: 0,
    //   limit: 10
    // }
  // },
  mounted() {
    // console.log("sato ", this.contents.length)
    this.$doSomething("mounted")

  }
}
</script>
<style>
.fuchidori {
      text-shadow:
           1px 1px 0px #000, -1px -1px 0px #000,
          -1px 1px 0px #000,  1px -1px 0px #000,
           1px 0px 0px #000, -1px  0px 0px #000,
           0px 1px 0px #000,  0px -1px 0px #000;
  /* -webkit-text-stroke: 1px #000; */
}
</style>
