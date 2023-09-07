//获取包裹两个switch切换界面的容器
let switchCtn = document.querySelector('#switch-cnt');

let switchC1 = document.querySelector('#switch-c1');
let switchC2 = document.querySelector('#switch-c2');
//获取所有圆形
let switchCircle = document.querySelectorAll('.switch_circle');
//获取所有switch切换容器内的按钮
let switchBtn = document.querySelectorAll('.switch-btn');
//获取a容器(登录容器)
let aContainer = document.querySelector('#a-container');
//获取b容器(注册容器)
let bContainer = document.querySelector('#b-container');
//获取所有按钮
let allButtons = document.querySelectorAll('.submit');
//阻止所有按钮的默认功能
let getButtons = (e) => e.preventDefault();
//表单切换功能
let changeForm = (e) => {
    //修改类名
    switchCtn.classList.add('is-gx');
    setTimeout(function () {
        switchCtn.classList.remove('is-gx');
    }, 1500);

    switchCtn.classList.toggle('is-txr');
    switchCircle[0].classList.toggle('is-txr');
    switchCircle[1].classList.toggle('is-txr');

    switchC1.classList.toggle('is-hidden');
    switchC2.classList.toggle('is-hidden');
    aContainer.classList.toggle('is-txl');
    bContainer.classList.toggle('is-txl');
    bContainer.classList.toggle('is-z'); //z:200>100
};
//点击切换
let shell = (e) => {
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('click', getButtons);
    }
    for (var i = 0; i < switchBtn.length; i++) {
        switchBtn[i].addEventListener('click', changeForm);
    }
};
window.addEventListener('load', shell);