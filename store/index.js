import axios from 'axios'

export const state = () => ({
  posts: []
})

export const getters = {
  // Storeからデータを得る
  // 使い方：this.user.xxx = this.$store.getters.takePosts
  takePosts(state) {
    return state.posts;
  },
}

export const mutations = {
  // Storeに保存する
  // 使い方：this.$store.commit('setPosts', res.data.contents);
  setPosts(state, payload) {
    state.posts = payload
  }
}

export const actions = {
  // APIからデータを得てStoreに保存する
  async getPosts({ commit }) {
    // await client.getEntries({
    //   content_type: process.env.CTF_BLOG_POST_TYPE_ID,
    //   order: '-fields.publishDate' // desc
    // }).then(res =>
    //   commit('setPosts', res.items)
    // ).catch(console.error)
    await axios.get(
      'https://diarydaylate.microcms.io/api/v1/blogs?limit=100',
      {
        headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
      }
    ).then(
      res => {
        commit('setPosts', res.data.contents)
      }
    ).catch(console.error)
  }
}