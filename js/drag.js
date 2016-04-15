var Dragging=function(a){ 
    var draggingObj=null; 
    var diffX=0;
    var diffY=0;
                
    function mouseHandler(e){
        switch(e.type){
            case 'mousedown':
                draggingObj=a(e);//验证是否为可点击移动区域
                if(draggingObj!=null){
                    diffX=e.clientX-draggingObj.offsetLeft;
                    diffY=e.clientY-draggingObj.offsetTop;
                }
                break;
                        
            case 'mousemove'://鼠标点击移动
                if(draggingObj){
                    draggingObj.style.left=(e.clientX-diffX)+'px';
                    draggingObj.style.top=(e.clientY-diffY)+'px';
                }
                break;
                        
            case 'mouseup'://鼠标抬起
                draggingObj=null;
                diffX=0;
                diffY=0;
                break;
        }
    };
                
    return {
        enable:function(){
            document.addEventListener('mousedown',mouseHandler);
            document.addEventListener('mousemove',mouseHandler);
            document.addEventListener('mouseup',mouseHandler);
        }                   
    }
}

function getDrag(e){
    var target=e.target;
    while(target && target.className.indexOf('drag-title')==-1){
        target=target.offsetParent;
    }
    if(target!=null){
        return target.offsetParent;
    }else{
        return null;
    }
}            
Dragging(getDrag).enable();