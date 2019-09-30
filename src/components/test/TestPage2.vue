<template id="">
    <div class="container">
        <h2 class="msg">
            页面2
            <!--注册成功{{id}}-->
        </h2>
        <span>{{userToken}}</span>
        {{pageForm}}
        <div v-for="row in pageForm">
            <el-form :model="row">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="row.name"></el-input>
                </el-form-item>
                <el-form-item label="单选城市" prop="cityRadio">
                    <el-radio-group v-model="row.cityRadio">
                        <el-radio label="1">上海</el-radio>
                        <el-radio label="2">北京</el-radio>
                        <el-radio label="3">香港</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="复选城市" prop="cityCheckedList">
                    <el-checkbox-group v-model="row.cityCheckedList">
                        <el-checkbox :label="1">上海</el-checkbox>
                        <el-checkbox :label="2">北京</el-checkbox>
                        <el-checkbox :label="3">香港</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </div>
        <el-button @click="addForm">默认按钮</el-button>
        <el-table
                fit
                border
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/javascript">
    import vuex from '../../vuex/store.js';
    import { mapGetters, mapActions } from  'vuex';

    export default {
        data() {
            return {
                // props:['id']
                // userToken: '1'
                pageForm: [{
                    name: '表单名称',
                    cityRadio: '3',
                    cityCheckedList: [1, 2]
                }],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        mounted() {
            // let aa = {...mapGetters({userToken: 'getUserToken'})}
            // let bar = { a: 1, b: 2 };
            // let baz = { ...bar }; // { a: 1, b: 2 }
            // console.log(aa)
            // console.log(this.$store.getters.getUserToken)
            // const a = {mapGetters({
            //     userToken: 'getUserToken'
            // })};
            // console.log(a)
            this.setUserToken()
        },
        created() {
            document.title = ""
        },
        computed: {
            ...mapGetters({
                userToken: 'getUserToken'
            })
        },
        methods: {
            ...mapActions({
                setUserToken: 'setUserToken'
            }),
            addForm: function(){
                this.pageForm.push({
                    name: '表单名称',
                    cityRadio: '1',
                    cityCheckedList: [1]
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .container {
        position: relative;
        overflow: hidden;
    }
    .wrap {
        position: relative;
        overflow: visible;
    }
    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .wrap-bg {
        display: block;
        width: 100%;
        height: auto;
        border: none;
    }
    .btn-box{
        position: absolute;
        width: 72%;
        left: 14%;
        top: 48%;
    }
    .btn-down{
        display: block;
        background: #feb84b;
        border-radius: 25px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        box-shadow: 0 6px 10px rgba(254,184,75,0.44);
        &:before{
            content: '';
            display: inline-block;
            position: relative;
            top:1px;
            margin-right: 5px;
            width: 15px;
            height: 15px;
            background: url('../../assets/images/act/download/icon1.png') no-repeat;
            background-size: cover;
        }
    }
    .btn-down2{
        margin-top: 20px;
        &:before{
            content: '';
            background: url('../../assets/images/act/download/icon2.png') no-repeat;
            background-size: cover;
        }
    }
    .msg{
        /*position: absolute;*/
        /*left: 0;*/
        /*top:30%;*/
        /*width: 100%;*/
        /*font-weight: normal;*/
        /*text-align: center;*/
        /*font-size: 18px;*/
        /*color: #fff;*/
    }
</style>
