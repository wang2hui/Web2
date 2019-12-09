var frame = document.getElementById("frame");
var boxForPicture = document.getElementById("boxForPicture");
var left = document.getElementById("left");
var right = document.getElementById("right");
var pot = document.getElementById("pot");
var charcter = document.getElementById("charcter");
var flag = true;
var index = 1;

function rollCharcter(){
    setInterval(function(){
        if(parseInt(getStyle(charcter,"left")) == -350){
            charcter.style["left"] = "978px";
        }
        else{
            charcter.style["left"] = parseInt(getStyle(charcter,"left")) - 1 + "px";
        }
    },20)
}
rollCharcter()

function rollPicture(){
    if(flag == false){
        return;
    }
    flag = false;
    index += 1;
    rollPot();
    animate(boxForPicture,{left:-1200 * index},
        function(){
            if(index == 6){
                boxForPicture.style.left = "-1200px";
                index = 1;
            }
            flag = true;
        }
    )
}

var period = setInterval(rollPicture, 3000);

frame.onmouseover = function(){
    animate(left,{opacity:70});
    animate(right,{opacity:70});
    clearInterval(period);
}

frame.onmouseout = function(){
    animate(left,{opacity:0});
    animate(right,{opacity:0});
    period = setInterval(rollPicture,3000)
}

right.onclick = rollPicture;

left.onclick = function(){
    if(flag == false){
        return;
    }
    flag = false;
    index -= 1;
    rollPot();
    animate(boxForPicture,{left:-1200 * index},
        function(){
            if(index == 0){
                boxForPicture.style.left = "-6000px";
                index = 5;
            }
            flag = true;
        }
    )
}

var potChildren = pot.children;
for(var i = 0;i < potChildren.length;i++){
    potChildren[i].serialNumber = i;
    potChildren[i].onclick = function(){
        index = this.serialNumber + 1;
        rollPot()
        animate(boxForPicture,{left:-1200 * index})
    }
}

function rollPot(){
    for(var i = 0;i < potChildren.length;i++){
        potChildren[i].setAttribute("class","");
    }
    if(index == 0){
        potChildren[4].setAttribute("class","active");
    }
    else if(index == 6){
        potChildren[0].setAttribute("class","active");
    }
    else{
        potChildren[index - 1].setAttribute("class","active");
    }
}