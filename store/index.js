import axios from 'axios'

export const state = () => ({
  posts: [],
  categories: []
})

// Storeからデータを得る
export const getters = {
  // 使い方：this.user.xxx = this.$store.getters.takePosts
  takePosts(state) {
    return state.posts;
  },
  takeCategories(state) {
    console.log('satoucategories', state.categories)
    return state.categories
  }
}

// Storeに保存する（commitする）
export const mutations = {
  // 使い方：this.$store.commit('setPosts', res.data.contents);
  setPosts(state, payload) {
    state.posts = payload
  },
  setCategories(state, payload) {
    state.categories = payload
  }
}

// Storeに保存するのは同じだが、
// APIからデータを得てStoreに保存する（dispatchする）
export const actions = {
  async getPosts({ commit }) {
    // await client.getEntries({
    //   content_type: process.env.CTF_BLOG_POST_TYPE_ID,
    //   order: '-fields.publishDate' // desc
    // }).then(res =>
    //   commit('setPosts', res.items)
    // ).catch(console.error)
    await axios.get(
      'https://diarydaylate.microcms.io/api/v1/blogs?limit=1000',
      {
        headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
      }
    ).then(
      res => {
        commit('setPosts', res.data.contents)
      }
    ).catch(console.error)
  },
  async getCategories({ commit }) {
    await axios.get(
      'https://diarydaylate.microcms.io/api/v1/categories?limit=100',
      {
        headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
      }
    ).then(
      res => {
        commit('setCategories', res.data.contents)
      }
    ).catch(console.error)
  }
}