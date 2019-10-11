<template>
    <div>
        <el-form>
            <el-form-item label="用户名">
                <el-input v-model="loginForm.userName"></el-input>
            </el-form-item>
        </el-form>
        <el-form>
            <el-form-item label="密码">
                <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
        </el-form>
        <el-form>
            <el-form-item label="">
                <el-button @click="submitLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import services from '../../services/index.js'
    import vuex from '../../vuex/store.js';
    import { mapGetters, mapActions } from  'vuex';

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    userName: '',
                    password: ''
                }
            }
        },
        mounted() {

        },
        methods: {
            ...mapActions({
                login: 'login',
                getUserInfo: 'getUserInfo'
            }),
            submitLogin: function () {
                this.login({
                    userName: this.loginForm.userName,
                    password: this.loginForm.password
                }).then(response => {
                    this.getUserInfo({token: this.userToken}).then(r=>{
                        console.log(this.userInfo);
                    });
                })
                // return new Promise((resolve, reject) => {
                //     const loginForm = this.loginForm;
                //     services.post('/api/login', {
                //         userName: loginForm.userName,
                //         password: loginForm.password
                //     }).then(
                //         response => {
                //             this.$toast('登录成功', {location: 'center'});
                //             console.log(response);
                //             this.getUserInfo();
                //             resolve(response)
                //         }
                //     ).catch(
                //         reason => {
                //             reject(reason);
                //         }
                //     );
                // });
            }
            // getUserInfo: function () {
            //     return new Promise((resolve, reject) => {
            //         services.post('/api/getUserInfo', {
            //         }).then(
            //             response => {
            //                 this.$toast('获取用户信息成功', {location: 'center'});
            //                 console.log(response);
            //                 resolve(response)
            //             }
            //         ).catch(
            //             reason => {
            //                 reject(reason);
            //             }
            //         );
            //     });
            // }
        },
        computed: {
            ...mapGetters({
                userToken: 'getUserToken',
                userInfo: 'getUserInfo'
            })
        }
    }
</script>

<style scoped>

</style>