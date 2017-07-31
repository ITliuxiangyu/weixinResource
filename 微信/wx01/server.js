var http = require('http');
var url = require('url');
var https = require('https');
var fs = require('fs');
var sign = require('./sign');

// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd74b67a87425f135&secret=96b7fc85b747bad4b4da2a8a8c74bfc9
http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    // 查询串
    var query = url.parse(req.url, true).query;
    // console.log(query);

    // 缓存的文件有没有过期
    var readRet = fs.readFileSync('token.txt', 'utf-8');
    // if (readRet) {
    //     var retObj = JSON.parse(readRet);
    //
    //     // 当前时间
    //     var time = new Date();
    //     time = parseInt(time.getTime() / 1000);
    //     if (time - retObj.timestamp <= 5400) {
    //         console.log(5555555);
    //         res.end(readRet);
    //         return;
    //     }
    // };


    // 获取access_token 接口
    var access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + query.appid + "&secret=" + query.appsecret;
    // 向微信服务器发起请求, 索要access_token
    https.get(access_token_url, function (access_token_client) {

        var access_token_data = "";

        access_token_client.on('data', function (data) {
            access_token_data += data;
        });
        access_token_client.on('end', function () {

            var token = JSON.parse(access_token_data).access_token;
            console.log(token);

            // https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi

            var ticket_url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + token + "&type=jsapi";

            https.get(ticket_url, function (ticket_client) {

                var ticket_data = "";
                
                ticket_client.on('data', function (data) {
                   ticket_data += data;
                });
                ticket_client.on('end', function () {
                    var ticket = JSON.parse(ticket_data).ticket;
                    console.log(ticket);

                    // 获得jsapi_ticket之后，就可以生成JS-SDK权限验证的签名了。
                    var ret = sign(ticket, query.url);
                    // 缓存token
                    console.log(6666);
                    console.log(token);
                    ret.token = token;
                    console.log(66666);
                    var string = JSON.stringify(ret);
                    fs.writeFileSync('token.txt', string, 'utf-8');
                    res.end(string);

                });


            });

        });


    });
    

}).listen(3000, function (err) {
    if (!err) {
        console.log("服务器已经开启, 端口号3000!!!")
    }
});