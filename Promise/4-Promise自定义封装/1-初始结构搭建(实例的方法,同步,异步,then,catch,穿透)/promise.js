//声明构造函数
function Promise(executor) {
    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.callbacks = [];
    //保存实例对象的this的值
    const self = this;  //self _this that
    //resolve函数
    function resolve(data) {
        // 判断状态
        if (self.PromiseState !== 'pending') return;
        //1.修改对象的状态(promiseState)
        self.PromiseState = 'fulfilled';  //resolved
        //2.设置对象结果值(promiseResult)
        self.PromiseResult = data;
        //调用成功的回调函数
        self.callbacks.forEach((item) => {
            item.onResolved(data);
        });
    }
    //reject函数
    function reject(data) {
        // 判断状态
        if (self.PromiseState !== 'pending') return;
        //1.修改对象的状态(promiseState)
        self.PromiseState = 'rejected';
        //2.设置对象结果值(promiseResult)
        self.PromiseResult = data;
        //调用失败的回调函数
        self.callbacks.forEach((item) => {
            item.onRejected(data);
        });
    }
    try {
        //同步调用"执行器函数"
        executor(resolve, reject);
    } catch (e) {
        // 修改Promise对象状态为失败
        reject(e);
    }
}

//添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
    const self = this
    // 判断回调函数参数
    if(typeof onRejected !== 'function'){
        onRejected = reason =>{
            throw reason
        }
    }
    if(typeof onResolved !== 'function'){
        onResolved = value => value
    }
    return new Promise((resolve, reject) => {
        function callback(type){
            try {
                let result = type(self.PromiseResult);
                //判断
                if (result instanceof Promise) {
                    //如果是Promise的对象
                    result.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    });
                } else {
                    // 结果的对象状态为【成功】
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }
        // 调用回调函数  PromiseState
        if (this.PromiseState === 'fulfilled') {
            callback(onResolved)
        }
        if (this.PromiseState === 'rejected') {
            callback(onRejected)
        }
        if (this.PromiseState === 'pending') {
            // 保存回调函数
            this.callbacks.push({
                onResolved: function () {
                    callback(onResolved)
                },
                onRejected() {
                    callback(onRejected)
                }
            });
        }
    });
};

//添加catch方法
Promise.prototype.catch = function(onRejected){
    return this.then(undefined,onRejected)
}