import Mock from 'mockjs';

Mock.setup({
    timeout: 800, // 设置延迟响应，模拟向后端请求数据
});

let defaultApi = {code: "10000", data: {}, msg: ""};

// // 用户登录
Mock.mock('/api/login', 'post', {...defaultApi, ...{
        data: {
            token: '235-5487-8745'
        }
    }}
);


// 获取用户详细信息
Mock.mock("/api/getUserInfo", 'post', {...defaultApi, ...{
        data: {
            name: '小宝',
            role: 'guest',
            id: '19875422'
        }
    }}
);

// 获取用户动态菜单
Mock.mock("/api/getMenuList", 'post', {...defaultApi, ...{
        data: {
            menuList: [
                {
                    path: '/spa/product',
                    // component: Home,
                    meta: {
                        name: '产品菜单',
                        role: ['admin']
                    },
                    children: [
                        {
                            path: '/spa/product/manage',
                            meta: {
                                name: '产品管理',
                                role: ['admin']
                            }
                        },
                        {
                            path: '/spa/product/class',
                            meta: {
                                name: '产品分类',
                                role: ['guest']
                            }
                        }
                    ]
                }
            ]
        }
    }}
);
// Mock.mock('/login', { //输出数据
//     code: "10000",
//     data: {
//             token: '235-5487-8745'
//         },
//     'name': '@name', //随机生成姓名
//     //还可以自定义其他数据
// });
// Mock.mock('/list', { //输出数据
//     'age|10-20': 10
//     //还可以自定义其他数据
// });


export default Mock;