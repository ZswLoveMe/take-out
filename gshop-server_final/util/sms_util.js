var md5 = require('blueimp-md5')
var moment = require('moment')
var Base64 = require('js-base64').Base64;
var request = require('request');
var querystring = require('querystring');
/*
 生成指定长度的随机数
 */
function randomCode(length) {
    var chars = ['0','1','2','3','4','5','6','7','8','9'];
    var result = ""; //统一改名: alt + shift + R
    for(var i = 0; i < length ; i ++) {
        var index = Math.ceil(Math.random()*9);
        result += chars[index];
    }
    return result;
}
// console.log(randomCode(6));
exports.randomCode = randomCode;

/*
向指定号码发送指定验证码
 */
function sendCode(phone, code, callback) {
    var queryData = querystring.stringify({
        "mobile": phone,  // 接受短信的用户手机号码
        "tpl_id": 1,  // 您申请的短信模板ID，根据实际情况修改
        "tpl_value": {'#code#':'1234','#company#':'zsw'},  // 您设置的模板变量，根据实际情况修改
        "key": "",  // 应用APPKEY(应用详细页查询)
    });
    var queryUrl = 'http://v.juhe.cn/sms/send?'+queryData;
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 打印接口返回内容
            var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
            console.log(jsonObj)
            callback(true);
        } else {
            console.log('请求异常');
        }
    }) 


}
exports.sendCode = sendCode;

/*
sendCode('13716962779', randomCode(6), function (success) {
    console.log(success);
})*/
