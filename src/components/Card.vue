<template>
    <div :productId="productId" :productType="productType" class="card h-100" @click="goToProductPage()">
        <image-component :imagePath="imagePath" :imageAlt="imageAlt" class="card-img-top"/>
    </div>
</template>

<script>
export default{
    name: "CardComponent",
    props: {
        productId: {
            type: Number,
            required: true
        },
        productType: {
            type: String,
        },
        imagePath: {
            type: String
        },
        imageAlt: {
            type: String
        }
    },
    methods: {
        goToProductPage(){
            this.$router.push({name: "products", params: {productType: this.productType, id: this.productId}})
        }
    }
}
</script>

<style>
    .card {
        border-color: inherit !important;
        cursor: pointer
    }
</style>