export default {
    // mutations中的方法最好只完成一件事情，将初次添加到购物车和给已在购物车商品数量加1两个操作分离
    addCount(state, payload) {
        payload.count++
    },
    addToCart(state, payload) {
        state.cartList.push(payload)
    }
}