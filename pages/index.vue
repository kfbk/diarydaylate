<template>
  <v-row justify="center">
    <v-col cols="12" sm="11" md="10" xl="8">
      <v-row>
        <v-col
          v-for="content in contents" :key="content.id"
          cols="12" sm="6" lg="4" xl="3"
        >
          <v-card max-width="400" class="mx-auto">
            <!-- <img src="~/assets/images/defaultEyeCatch.png" /> OK -->
            <!-- <img :src="content.eyecatch" alt=""> NG -->
            <v-img
              :src="content.eyecatch.url"
              :aspect-ratio="16/9"
              max-height="200"
              class="white--text"
            >
              <v-card-title
                class="align-end
                fill-height
                font-weight-bold
                fuchidori"
              >
                {{ content.title }}
              </v-card-title>
            </v-img>
            <v-card-text>
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
import axios from 'axios'
export default {
  async asyncData() {
    const { data } = await axios.get(
      // your-service-id部分は自分のサービスidに置き換えてください
      'https://diarydaylate.microcms.io/api/v1/blogs',
      {
        // your-api-key部分は自分のapi-keyに置き換えてください
        headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
      }
    )
    return data
  },
  mounted() {
    console.log("sato ", this.contents.length)
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
<!-- <template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
          <p>
            For more information on Vuetify, check out the <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>.
          </p>
          <p>
            If you have questions, please join the official <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord
            </a>.
          </p>
          <p>
            Find a bug? Report it on the github <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board
            </a>.
          </p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script> -->
