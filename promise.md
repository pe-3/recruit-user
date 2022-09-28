[toc]
## promise 状态

### promise 的状态

promise 实例对象的一个属性
- pending 悬而未决
- resolved(fullfiled) 成功
- rejected 失败
  
### Promise 对象的值 
实例对象的另一个属性 [PromiseResult]
保存着对象 [成功/失败] 的结果

* resolve
* reject


## promise 的工作流程

pending ->{reject()}->rejected 
pending ->{resolve()}->resolved

##  执行器函数同步调用

```js
const promise  = new Promise(function executor(){
    console.log('1111');
});
console.log('2222');
// 11111
// 22222
```

## then 方法指定失败或成功的callback

## resolve 方法
- 如果传入参数非promise直接返回
- promise对象的话，其的结果决定resolve的结果

```
let p1 = Promise.resolve(523);

console.log(p1); 
// 523
```