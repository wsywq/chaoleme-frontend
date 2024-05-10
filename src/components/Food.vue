<template>
	<div class="container" id="main">
    	<card :productList="productList"></card>
       	 <div class="loading-text" v-if="loading">加载中...</div>
         <div class="loading-text" v-if="finish">没有更多了</div>
   	</div>
</template>
<script>
import productCard from '@/components/card/card.vue'
import { getAllGoods } from '@/api/modules/good.js'
export default {
	components: {
        productCard,
    },
     setup() {
		const page = ref(0)
        const size = ref(8)
        const loading = ref(false)
        const finish = ref(false)
        const productList = ref([])
        
        //获取接口数据
        const getProduct = () => {
            loading.value = true
            const params = {
                page: page.value,
                size: size.value,
                body: {
                    goodsTypeID: className,
                },
            }
            getAllGoods (params)
                .then(res => {
                    if (res.code === 20000) {
                        total.value = Number(res.data.totalPages)
                        if (res.data.list.length > 0) {
                            productList.value = [...productList.value, ...res.data.list]
                        }
                        if (page.value == total.value + 1) {
                            finish.value = true
                            loading.value = false
                        }
                    } else {
                        loading.value = false
                        finish.value = true
                    }
                })
                .catch(err => {
                    loading.value = false
                    finish.value = true
                })
        }
        const handleScroll = () => {
            const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
            //滚动条滚动距离
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            //窗口可视范围高度
            const clientHeight =
                window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)

            if (clientHeight + scrollTop >= scrollHeight  && page.value <= total.value) {
                //快到底时----加载
                page.value++
                getProduct()
            }
        }
        onMounted(() => {
            getProduct(tabModule.activeType.value, tabModule.activeClass.value)
            window.addEventListener('scroll', handleScroll)
        })
        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll)
        })
        return {
            productList,
            loading,
            finish,
        }
	}
}
</script>

<style lang="less" scoped>
	.loading-text {
	    text-align: center;
	    position: absolute;
	    left: 0;
	    right: 0;
	    z-index: 999;
	    margin: auto;
	    padding: 20px 0;
	    font-size: 16px;
	}
	 .container {
        padding: 0 12px;
      }
</style>