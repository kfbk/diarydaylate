import defaultEyeCatch from '~/assets/images/defaultEyeCatch.png'

// 2か所から呼ばれる。タグから直接呼ばれる
export default (context, inject) => {
  const eyecatch = function(post) {
    // console.log(post)
    if (post.eyecatch)
      return post.eyecatch.url
    return defaultEyeCatch
  }
  inject('eyecatch', eyecatch)
}
