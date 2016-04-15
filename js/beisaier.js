var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");       
canvas.width=400;
canvas.height=400;

var canvas1=document.getElementById("canvas1");
var ctx1=canvas1.getContext("2d");
canvas1.width=50;
canvas1.height=50;
canvas1.style.border="1px solid black";

var canvas2=document.getElementById("canvas2");
var ctx2=canvas2.getContext("2d");
canvas2.width=50;
canvas2.height=50;
canvas2.style.border="1px solid black";

var c1=document.getElementById('c1');
var c2=document.getElementById('c2');
var c3=document.getElementById('c3');
var c4=document.getElementById('c4');
var c5=document.getElementById('c5');
var ax=0,ay=50,bx=50,by=0;
       
var second=document.getElementById("second");
var btn1=document.getElementById("btn1");
var btn2=document.getElementById("btn2");
var csstext=document.getElementById("csstext");
//贝塞尔支点
var Point=function(x,y){
    this.x=x;
    this.y=y;
}       
var p1=new Point(250,250);
var p2=new Point(150,150);
var lineStyle="#00BBFF";//canvas中轴颜色
var fontStyle="black";//字体颜色
var font="微软雅黑";//字体
var bezierLineStyle="#404040";//贝塞尔曲线颜色
//定时刷新重绘画布
setInterval(draw,16);
//封装方法
function bezier(strokeStyle) {
    var time=second.value;
    var p1x=p1.x/400;
    var p1y=1-p1.y/400;
    var p2x=p2.x/400;
    var p2y=1-p2.y/400;
    this.setLineStyle = function(strokeStyle) {    
        lineStyle = strokeStyle;
    }
    this.setTextStyle = function(strokeStyle) {
        fontStyle = strokeStyle;
    }
    this.setTextFont = function(fontName) {       
        font = fontName;
    }
    this.setbezierLineStyle = function(strokeStyle) {       
        bezierLineStyle = strokeStyle;
    }
    this.setBezierOther=function(name,canvasid,btnid,value,newvalue,newvalue1){
        btnid.onclick=function(){
        var time=second.value;
        var p1x=p1.x/400;
        var p1y=1-p1.y/400;
        var p2x=p2.x/400;
        var p2y=1-p2.y/400;
        canvasid.style.transition="all " + time + "s cubic-bezier" + "(" + p1x + ", " + p1y + ", " + p2x + ", " + p2y + ")";
        if(canvasid.style.name<"value"){                
            canvasid.style.name="newvalue";
        }
        else{
            canvasid.style.name="newvalue1";
        }
        printCss(); 
    }
    }
    }
//画图
function draw(){
    //清楚画布
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //canvas中间斜线
    ctx.strokeStyle=lineStyle;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth=7;
    ctx.moveTo(0,400);
    ctx.lineTo(400,0);
    ctx.stroke();
    ctx.restore();
    //支点1 贝塞尔曲线canvas
    ctx.lineWidth=4;
    ctx.strokeStyle = "#DC143C";          
    ctx.beginPath();
    ctx.arc(p1.x,p1.y,10,0,2*Math.PI);
    ctx.fillStyle="#DC143C";
    ctx.fill();
    ctx.moveTo(0,400); 
    ctx.lineTo(p1.x,p1.y); 
    ctx.stroke();
    //支点2
    ctx.beginPath();
    ctx.arc(p2.x,p2.y,10,0,2*Math.PI);
    ctx.fillStyle="#DC143C";
    ctx.fill();
    ctx.moveTo(400,0);
    ctx.lineTo(p2.x,p2.y);
    ctx.stroke();
    //绘制贝塞尔曲线
    ctx.save();
    ctx.lineWidth=8;
    ctx.strokeStyle=bezierLineStyle;
    ctx.beginPath();
    ctx.moveTo(0,400);
    ctx.bezierCurveTo(p1.x,p1.y,p2.x,p2.y,400,0);
    ctx.stroke();
    ctx.restore();

    //canvas1
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    //支点1
    ctx1.strokeStyle="black";
    ctx1.beginPath();
    ctx1.arc(p1.x/8,p1.y/8,1.5,0,2*Math.PI);
    ctx1.moveTo(0,50); 
    ctx1.lineTo(p1.x/8,p1.y/8);         
    ctx1.stroke();
    //支点2
    ctx1.beginPath();
    ctx1.arc(p2.x/8,p2.y/8,1.5,0,2*Math.PI);
    ctx1.moveTo(50,0);
    ctx1.lineTo(p2.x/8,p2.y/8);
    ctx1.stroke();
    //绘制贝塞尔曲线
    ctx1.strokeStyle="red";
    ctx1.beginPath();
    ctx1.moveTo(0,50);
    ctx1.bezierCurveTo(p1.x/8,p1.y/8,p2.x/8,p2.y/8,50,0);
    ctx1.stroke();
    //canvas2
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    //支点1
    ctx2.strokeStyle="black";
    ctx2.beginPath();
    ctx2.arc(ax,ay,1.5,0,2*Math.PI);
    ctx2.moveTo(0,50); 
    ctx2.lineTo(ax,ay);         
    ctx2.stroke();
    //支点2
    ctx2.beginPath();
    ctx2.arc(bx,by,1.5,0,2*Math.PI);
    ctx2.moveTo(50,0);
    ctx2.lineTo(bx,by);
    ctx2.stroke();
    //绘制贝塞尔曲线
    ctx2.strokeStyle="red";
    ctx2.beginPath();
    ctx2.moveTo(0,50);
    ctx2.bezierCurveTo(ax,ay,bx,by,50,0);
    ctx2.stroke();
    csstext.style.font="微软雅黑";
}

//判断鼠标点击位置是否在两支点上
function run(){
    var select;//支点选择
    canvas.onmousedown=function(evt){
        var x=evt.offsetX;
        var y=evt.offsetY;
                    
        if(x<p1.x+10 && x>p1.x-10 && y<p1.y+10 && y>p1.y-10){//支点1
            select=1;
        }else if(x<p2.x+10 && x>p2.x-10 && y<p2.y+10 && y>p2.y-10){//支点2
            select=2;
        }else{
            select=0;
        }
    }
    //支点拖动
    canvas.onmousemove=function(evt){
        var x=evt.offsetX;
        var y=evt.offsetY;
                    
        if(select==1){
            p1.x=x;
            p1.y=y;
        }else if(select==2){
            p2.x=x;
            p2.y=y;
        } 
        if(x<p1.x+10&&x>p1.x-10&&y<p1.y+10&&y>p1.y-10){
            canvas.style.cursor = "pointer";
        }else if(x<p2.x+10&&x>p2.x-10&&y<p2.y+10&&y>p2.y-10){
            canvas.style.cursor = "pointer";
        }else{
            canvas.style.cursor = "default";
        }                      
    }
                
    canvas.onmouseup=function(){
        select=0;
    }       
}
run();
//右侧固定样式点击将贝塞尔值复位canvas2
    c1.onclick=function(){
        ax=12.5;
        ay=45;
        bx=12.5;
        by=0;
        return ax,ay,bx,by;
    }
    c2.onclick=function(){
        ax=0;
        ay=50;
        bx=50;
        by=0;
        return ax,ay,bx,by;
    }
    c3.onclick=function(){
        ax=21;
        ay=50;
        bx=50;
        by=0;
        return ax,ay,bx,by;
    }
    c4.onclick=function(){
        ax=0;
        ay=50;
        bx=29;
        by=0;
        return ax,ay,bx,by;
    }
    c5.onclick=function(){
        ax=21;
        ay=50;
        bx=29;
        by=0;
        return ax,ay,bx,by;
    }
                
//运动按钮点击事件          
    btn1.onclick=function(){
        var time=second.value;//range
        var p1x=p1.x/400;//canvas1根据canvas支点位置变化
        var p1y=1-p1.y/400;
        var p2x=p2.x/400;
        var p2y=1-p2.y/400;
        var a1x=ax/50;//canvas2支点位置
        var a1y=1-ay/50;
        var b1x=bx/50;
        var b1y=1-by/50;
        canvas1.style.transition="all " + time + "s cubic-bezier" + "(" + p1x + ", " + p1y + ", " + p2x + ", " + p2y + ")";
        if(canvas1.style.left<"300px"){
            canvas1.style.left="300px";
        }
        else{
            canvas1.style.left="0px";
        }
                
            canvas2.style.transition="all " + time + "s cubic-bezier" + "(" + a1x + ", " + a1y + ", " + b1x + ", " + b1y + ")";
        if(canvas2.style.left<"300px"){
            canvas2.style.left="300px";
        }
        else{
            canvas2.style.left="0px";
        }
        printCss();                   
    }
//颜色变化按钮点击事件
    btn2.onclick=function(){
        var time=second.value;
        var p1x=p1.x/400;
        var p1y=1-p1.y/400;
        var p2x=p2.x/400;
        var p2y=1-p2.y/400;
        canvas1.style.transition="all " + time + "s cubic-bezier" + "(" + p1x + ", " + p1y + ", " + p2x + ", " + p2y + ")";
        if(canvas1.style.background<"blue"){                
            canvas1.style.background="red";
        }
        else{
            canvas1.style.background="SkyBlue";
        }
        printCss(); 
    }

//打印css3代码
function printCss(){
    csstext.style.fontFamily=font;
    csstext.style.color=fontStyle;
    csstext.innerHTML="div{\n\ttransition: " + canvas1.style.transition + "\n\t-webkit-transition:" + canvas1.style.transition + "\n\t-o-transition: " + canvas1.style.transition + "\n\t-moz-transition: " + canvas1.style.transition + "}";
}  

                        
