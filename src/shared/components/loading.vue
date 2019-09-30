<template>
    <div v-show="show" class="loading-box">
        <div class="tran-mask"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false
            }
        },
        methods: {
            showLoader: function () {
                this.show = true
            },
            hideLoader: function () {
                this.show = false
            }
        },
        mounted() {
            // loader.subscribe(show => { this.show = show })
        }
    }
</script>

<style lang="less">
    .loading-box {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background: url('../../assets/images/loading.gif') center center no-repeat transparent;
    }
</style>


