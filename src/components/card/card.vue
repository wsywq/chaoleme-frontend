<template>
    <Waterfall :lazyload="false" :breakpoints="breakpoints" :gutter="8" :list="list">
        <template #item="{ item, url, index }">
            <div class="card_content">
                <div class="card_img" :class="{ active: !item.goodsPicture && !item.storePicture }">
                    <LazyImg class="cover" :url="item.goodsPicture || item.storePicture || item.storeLogo" />
                </div>
                <div class="content">
                    <div class="store" v-if="item.type === 2">{{ item.storeName }}</div>
                    <div class="title" v-if="item.type === 1">{{ item.storeName }}</div>
                    <div class="title" v-if="item.type === 2">{{ item.goodsName }}</div>
                    <div class="tags">
                        <div class="tags-item" v-for="(ele, index) in item.tags" :key="index">
                            {{ ele }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Waterfall>
</template>

<script>
import { computed, ref } from 'vue'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
export default {
    props: {
        productList: Array,
    },
    components: {
        LazyImg,
        Waterfall,
    },
    setup(props) {
        const list = computed(() => {
            return props.productList
        })
        const breakpoints = ref({
            1200: {
                //当屏幕宽度小于等于1200
                rowPerView: 4,
            },
            800: {
                //当屏幕宽度小于等于800
                rowPerView: 3,
            },
            500: {
                //当屏幕宽度小于等于500
                rowPerView: 2,
            },
        })

        return {
            breakpoints,
            list,
        }
    },
}
</script>

<style lang="less" scoped>
.card_content {  
    border-radius: 4px;  
    background: #fff;  
    box-sizing: border-box;  

    .card_img {  
        margin-bottom: 7px;  
  
        &.active {  
            border: 1px solid #e7e7e7;  
        }  
  
        // 注意：Less中没有直接的:deep()选择器，这里假设你要选择的是.card_img内部的.lazy__img  
        // 你可以直接嵌套，如果.lazy__img是.card_img的直接子元素  
        .lazy__img {  
            width: 100%;  
            border-radius: 4px;  
            font-size: 0;  
            height: 100%;  
        }  
    }  
  
    .content {  
        padding: 0 8px;  
  
        .store {  
            color: rgba(0, 0, 0, 0.4);  
            font-size: 12px;  
            font-weight: 400;  
            margin-bottom: 4px;  
        }  
  
        .title {  
            font-size: 16px;  
            font-weight: 500;  
            margin-bottom: 14px;  
        }  
  
        .tags {  
            display: flex;  
            flex-wrap: wrap;  
  
            .tags-item {  
                background: rgba(153, 151, 255, 0.05);  
                border-radius: 2px;  
                padding: 3px 4px;  
                margin: 0 5px 5px 0;  
                color: rgba(0, 0, 0, 0.4);  
                font-size: 12px;  
                border: 1px solid rgb(244, 244, 249);  
  
                &:last-child {  
                    margin-right: 0;  
                }  
            }  
        }  
    }  
}
</style>