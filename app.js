window.onload=function () {
    imgLocation("container","box");
    var imgData={"data":[{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"}]};
    window.onscroll=function () {
        if(checkFlag()){
            var cparent = document.getElementById("container");
            for(var i=0;i<imgData.data.length;i++){
               var ccontent=document.createElement("div");
               ccontent.className="box";
               cparent.appendChild(ccontent);
               var boximg =document.createElement("div");
               boximg.className="box_img";
               ccontent.appendChild(boximg);
               var img =document.createElement("img");
               img.src="img/"+imgData.data[i].src;
               boximg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}

function checkFlag() {
    var cparent = document.getElementById("container");
    var ccontent =getChildElement(cparent,"box");
    var lastContentHeight = ccontent[ccontent.length -1].offsetTop;
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    if(lastContentHeight<scrollTop+pageHeight){
        return true;
    }
}


function imgLocation(parent,content) {
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);//所有元素都承载到content中
    var imgwidth=ccontent[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/imgwidth);//第一排的个数
    cparent.style.cssText="width:"+imgwidth*cols+"px;margin:0 auto";//固定化

    var BoxHeightArr=[];//所有的图片的高度数组
    for(var i=0;i<ccontent.length;i++){
        if(i<cols){
            BoxHeightArr[i]=ccontent[i].offsetHeight;//第一排的高度合集
            console.log(BoxHeightArr[i]);
        }else{
            var minheight=Math.min.apply(null,BoxHeightArr);//最小的高度
            var minindex=getminHeightLocation(BoxHeightArr,minheight);//索引
            ccontent[i].style.position="absolute";
            ccontent[i].style.top=minheight+"px";//找到高度数组中 高度最小的那个图片
            ccontent[i].style.left=ccontent[minindex].offsetLeft+"px";
            BoxHeightArr[minindex]=BoxHeightArr[minindex]+ccontent[i].offsetHeight;
        }
    }
}
function getminHeightLocation(BoxHeightArr,minHeight) {
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i]==minHeight){
            return i;
        }
    }
}

function getChildElement(parent,content) {
    var contentArr=[];
    var allcontent=parent.getElementsByTagName("*");
    for( var i=0;i<allcontent.length;i++){
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}
