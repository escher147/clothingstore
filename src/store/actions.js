export default {
    addCart(context, payload) {
        // 查找是否已存在当前payload
        let existProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (existProduct) {
            // existProduct.count += 1
            context.commit('addCount', existProduct)
        } else {
            payload.count = 1
            context.commit('addToCart', payload)

        }
    }
}