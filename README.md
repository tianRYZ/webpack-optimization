# 模块化 & webpack


1. 模块化
2. webpack

## 模块化

1. 全局 function 模式
   function m1() {}

function m2() {}

2. namespace 模式

```
   let myModule = {
   data: 'test',
   foo() {
   console.log('foo');
   }
   }
```

3. IIFE 模式
   匿名函数自调用

4. IIFE 模式增强

5. 模块化规范
   commonjs node

   暴露模块 module.exports ={}
   引入模块 require('xxx')

6. AMD CMD ES6 UMD(通用模块定义规范)

   ES6
   基本使用 export
   import xx from xx

## webpack

- entry

## babel

api
函数
@babel/core babel 核心库
babel-loader
@babel/preset-env 一组预先设定的插件 默认支持所有的最新 js ES6 ES6+
@babel/plugin-transform-runtime async await import()

## loader

编写原则

- 单一原则 每个 loader 只做一件事情
- 链式调用 webpack 会顺序链调用每个 loader
- 统一原则 输入或者输出都是字符串 即插即用

1. input -> @babel/parser -> ast
2. ast -> @babel/traverse -> new ast
3. new ast -> @babel/generator -> output

@babel/types 对 node 节点分析

## 手写 plugin

tapable

tap 以同步方式触发钩子
tapAsync 以异步方式触发钩子
tapPromise 以异步方式触发钩子，返回 promise

compiler 所有配置信息
class Webpack {
constructor(options) {
compiler(options)
new plugin
run(){
compilation
}
}
}

run

compilation 对象
comipler 开始 run--------------emit---done-----end

详情 见https://youcoo.online/