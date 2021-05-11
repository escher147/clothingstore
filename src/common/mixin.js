import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
    data() {
        return {
            // 是否显示回到顶部按钮判断标志
            isShowBackTop: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        }
    },
}