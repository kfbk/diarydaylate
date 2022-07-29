export default (context, inject) => {
    const zipcode = async function(zipcode) {
        return await this.$axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`)
    }
    inject('zipcode', zipcode)
    // コメントにしてみる context.$zipcode = zipcode
}