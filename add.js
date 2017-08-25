if(t.type == 0){
    var c = '{"code":0,"msg":"刷新完成"}';
    app.BTNVPullRefresh2DownCallBack(c);
} else {
    var c = '{"code":0,"msg":"刷新完成"}';
    app.BTNVPullRefresh2UPCallBack(c);
}

function BTJSPullRefresh2UP(){
//  alert(index);
    if(getDeviceinfo().type == "android"){
        if(index > 0){
            demo.up();
            
        }
    } else {
        demo.up();
    }
}
function BTJSPullRefresh2Down(){
//  alert(index);
    if(getDeviceinfo().type == "android"){
        if(index > 0){
            demo.down();
        }
    } else {
        demo.down();
    }
    
    index ++;
}
