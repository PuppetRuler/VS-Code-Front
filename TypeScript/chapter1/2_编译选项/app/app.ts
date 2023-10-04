console.log('hello');
// let a = 10
// let b = 33
// let c = 'hello'
function fn(a:number,b:number):number{
    return a+b
}

function fn2(this:Window){
    let r = this
    return r
}

const box1 = document.getElementById('box1')

box1?.addEventListener('click',function(){
    alert('hello')
})