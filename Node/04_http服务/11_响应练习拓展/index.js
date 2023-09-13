//获取所有td
tds = document.querySelectorAll('td');
//遍历所有td
tds.forEach(item => {
    item.onclick = () => {
        item.style.background = '#222';
    };
})