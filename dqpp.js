// ==UserScript==
// @name         党旗飘飘 学习平台 自动刷课
// @namespace    http://tampermonkey.net/
// @version      1.301
// @description  一开始选择课程既会自动点击开始播放。视频学习播放每5分钟左右会遇上弹窗。原理：每3秒左右（随机）尝试点击“继续”的弹窗，没有则会跳过。支持同一课程下多个视频的自动播放。课程结束后会自动点击“学习完成”。没有需要学习的视频后悔停止。页面可能会跳转，请留意。
// @author       ShiZitou
// @include      http://wsdx.ncu.edu.cn/zsdy/*/play?*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function() {
    'use strict';
    console.log('It\'s runing Now');
    var i=0;var j=0;
    var colors="red";
    var time=getTimes();
    var pa = document.createElement('p');
    if(document.getElementsByClassName("video_cont")[0]===undefined){
        console.log("视频出错，即将刷新");
        location.reload();
    }else{
       document.getElementsByClassName("video_cont")[0].appendChild(pa);  
    }
    showInfo('开始工作');
    var tm=setInterval(function(){
        if(document.getElementsByClassName("video_head").length==0&&document.getElementsByClassName("video_cont").length==0){
            console.log("视频出错，即将刷新");
            location.reload();
        }else{
            if(document.getElementsByClassName("video_red1")[0].children[0].style.color==colors){//如果当前已经看完
                showInfo("当前视频已看完，将点击下一视频");
                if(document.getElementsByClassName("video_red1")[0].nextSibling.nextSibling===null){
                    window.clearInterval(t1); 
                    alert('当前课程没有需要学习的内容了！');
                }else{
                    document.getElementsByClassName("video_red1")[0].nextSibling.nextSibling.children[0].click();//点击下一视频
                }
            }else{
                //进行弹窗点击操作
                //console.log(document.getElementsByClassName("public_submit")[0]);
                if(document.getElementsByClassName("public_cancel")[0]===undefined){
                    if(document.getElementsByClassName("public_submit")[0]===undefined){
                        i=i+1;
                        showInfo('共点击'+j+'次弹窗！'+i+'次没有弹窗。已过'+(i*time/60/1000).toFixed(2)+'分钟');
                        if(i>=120){
                            showInfo('长时间未响应，刷新');
                            location.reload();
                        }
                    }else{
                        document.getElementsByClassName("public_submit")[0].click();
                        i=0;
                        j=j+1;
                        showInfo('第'+j+'次点击弹窗！开始学习');
                    }
                }else{
                    document.getElementsByClassName("public_cancel")[0].click();
                    i=0;
                    j=j+1;
                    showInfo('第'+j+'次点击弹窗！继续学习');
                }
            }
        }
       //alert(document.getElementsByClassName("public_submit")[1]);
    },time);
    
})();

function getTimes(){
    var times=Math.random()*8 + 1;//1-9
    times=times*10+3*1000*1;
    return times
}

function showInfo(str){
    console.log(str);
    document.getElementsByClassName("video_cont")[0].children[2].innerText=str;
}