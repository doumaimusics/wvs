// 倒计时
function _sendCode(el,num) {
    let timer = setInterval(function(){
        num --;
        el.innerHTML = num + '秒后重新获取';
        el.style.color = '#ccc';
        el.disabled = 'disabled';
        if(num === 0) {
            el.disabled = ''
            el.style.color = '#285BDE'
            el.innerHTML = '获取验证码'
            clearInterval(timer)
        }
    },1000)
}

export default{
    sendCode: _sendCode   // 倒计时
}