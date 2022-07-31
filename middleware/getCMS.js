export default async ({ store }) => {
    // console.log('getCMS')
    if (!store.state.posts.length) await store.dispatch('getPosts')
    if (!store.state.categories.length) await store.dispatch('getCategories')
}