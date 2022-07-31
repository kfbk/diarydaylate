<template>
    <div>
      <breadcrumbs />	
      <h1>{{ currentCategory.name }}</h1>
      <div
        v-for="(post, i) in relatedPosts"
        :key="i"
      >
        {{ post.category.name}},
        {{ post.title}}
      </div>
    </div>
</template>

<script>
export default {
  computed: {
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.currentCategory)
    }
  },
  async asyncData({ payload, store, params, error }) {
    // console.log((payload)? 'payload=OK': 'payload=NG' )
    // console.log(params.slug)
    const currentCategory = payload || await store.state.categories.find(category => 
      // console.log(category.id, params.slug)
      category.id === params.slug
    )
    if (currentCategory) {
      // console.log(currentCategory)
      return { currentCategory }
    } else {
      return error({ statusCode: 400 })
    }
  }
}
</script>