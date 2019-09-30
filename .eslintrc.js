// http://eslint.org/docs/user-guide/configuring

module.exports = {
    "root": true,
    "parserOptions": {
        sourceType: 'module',
        "parser": "babel-eslint"
    },
    // "plugins": ["flowtype", "html", "vue"],
    // "plugins": ["html", "vue"],
    // "settings": {
    //     "html/html-extensions": [".html"]
    // },
    // "globals": {
    //     "axios": true,
    //     "elastic": true
    // },
    // extends: 'standard',
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    // 'vetur.validation.template': false,
    "rules": {
        'arrow-parens': 0,  //箭头函数用小括号括起来
        'generator-star-spacing': 0,  //生成器函数*的前后空格
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,  //禁止使用debugger
        'space-before-function-paren': 0,  //函数定义时括号前面要不要有空格
        'no-var': 'error',  //禁用var，用let和const代替
        'prefer-const': 'error',  //首选const
        'camelcase': 1, //驼峰命名
        "indent": [2, 4] // 强制缩进4 spaces
    },
    "env": {
        "browser": true,
        // "node": true,
        // "commonjs": true,
        // "es6": true
    }
}