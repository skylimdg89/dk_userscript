// ==UserScript==
// @name         TextAreaTesting
// @namespace    http://tampermonkey.net/
// @version      0.2.3
// @description  try to take over the world!
// @author       DK
// @match        https://www.google.com/*
// @match        https://www.google.com
// @updateURL    https://raw.githubusercontent.com/skylimdg89/dk_userscript/master/testing.js
// @downloadURL  https://raw.githubusercontent.com/skylimdg89/dk_userscript/master/testing.js
// @grant        GM_addStyle
// ==/UserScript==


// get elem from Google.com searchform
// Testing...
console.log("starting...");
var search_div = document.getElementById("searchform");

var text_div = document.createElement("div");
text_div.setAttribute("id", "text_div");
var text_divheader = document.createElement("div");
text_divheader.setAttribute("id", "text_divheader");
text_div.append(text_divheader);
var text_li = document.createElement("li");
text_li.setAttribute("id", "text_li");
var text_area =document.createElement("textarea");
text_area.setAttribute("id", "text_area");

//var button_li = document.createElement("li");
//button_li.setAttribute("id", "button_li");

var my_button = document.createElement("input");
my_button.setAttribute("id", "my_button");
my_button.type = "button";
my_button.value = "Save";
my_button.onclick = mybutton_clicked;

var toggle_button = document.createElement("input");
toggle_button.setAttribute("id", "toggle_button");
toggle_button.type = "button";
toggle_button.value = "toggle";
toggle_button.onclick = toggle_button_clicked;

//text_li.appendChild(button_li);
//button_li.appendChild(my_button);
text_divheader.appendChild(my_button);
text_divheader.appendChild(toggle_button);


var input_div = document.createElement("div");
input_div.setAttribute("id", "input_div");


search_div.append(text_div);
text_div.appendChild(input_div);
input_div.append(text_area);

var submit_button = document.createElement("input");
submit_button.setAttribute("id", "submit_button");
submit_button.type = "button";
submit_button.value = "submit";
//submit_button.onclick = submit_button_clicked;
input_div.append(submit_button);


//text_li.textContent = "";

dragElement(document.getElementById("text_div"));

// button click displays the value in console log
function mybutton_clicked(){
    console.log("button clicked");
    console.log("text area value = " + text_area.value);
    //localStorage.setItem('saved_data', text_area.value);///
    sessionStorage.setItem('saved_data', text_area.value);///

    //hide div
    //text_div.style.display = 'none';
    //text_div.style.display = 'block';
}



/*
*/
var slideOpen = true;
var heightChecked = false;
var initHeight = 0;
var intval = null;

function toggle_button_clicked() {
    window.clearInterval(intval);
    var h;
    var mdiv = document.getElementById('input_div');
    var tdiv = document.getElementById('text_div');
    var twidth = tdiv.style.width;
    console.log("twidth = " + twidth);
    if(!heightChecked) {
        initHeight = mdiv.offsetHeight;
        heightChecked = true;
    }
    if(slideOpen) {
        h = initHeight;
        slideOpen = false;
        intval = setInterval(function(){
            h--;
            mdiv.style.height = h + 'px';
            tdiv.style.width = '100px';
            if(h <= 0)
                window.clearInterval(intval);
            }, 1
        );
    }
    else {
        h = 0;
        slideOpen = true;
        intval = setInterval(function(){
            h++;
            mdiv.style.height = h + 'px';
            tdiv.style.width = '500px';
            if(h >= initHeight)
                window.clearInterval(intval);
            }, 1
        );
    }
}

/*
*/



//cookie
//console.log("cookie at === " + document.cookie);


///////////////////////////////////////////////////////////////

//var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

///////////////////////////////////////////////////////////////


//check if the page is reloaded
if (window.performance) {
  console.info("window.performance works fine on this browser");
}
if (performance.navigation.type == 1) {
    console.info( "This page is reloaded" );

    //console.log(localStorage.getItem('saved_data'));///
    console.log(sessionStorage.getItem('saved_data'));///
    //text_area.value = localStorage.getItem('saved_data');
    text_area.value = sessionStorage.getItem('saved_data');


    //keep the div at the same position after reloading
    document.getElementById("text_div").style.top = sessionStorage.getItem('top');//
    console.log("top = " + document.getElementById("text_div").style.top);
    document.getElementById("text_div").style.left = sessionStorage.getItem('left');//
    console.log("left = " + document.getElementById("text_div").style.left);

} else {
    console.info( "This page is not reloaded");
}

// make the div movable and draggable
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;

    //remembers top and left position of div before reloading
    sessionStorage.setItem('top', elmnt.style.top);///
    sessionStorage.setItem('left', elmnt.style.left);///
  }
}

GM_addStyle(`
#text_divheader {
  cursor: move;
  z-index: 10;
  background-color: grey;
  color: #fff;
}
#text_div {
  position: fixed;
  z-index: 9;
  background-color: white;
  border: 1px solid #d3d3d3;
  text-align: center;
  overflow-y: hidden;
}
#text_area{
  color: black;
  left: 0%;
  background: white;
  padding: 0.75ex 1.3ex;
  border: 1px double gray;
  border-radius: 1ex;
  margin: 0px;
  width: 400px;
  height: 400px;

}
`)


/*
//GM style
GM_addStyle(`
#text_divheader {
  padding: 0px;
  cursor: move;
  z-index: 10;
  background-color: grey;
  color: #fff;
}
#text_div {
  position: absolute;
  z-index: 9;
  background-color: red;
  border: 1px solid #d3d3d3;
  text-align: center;
}
#text_li{
  color: black;
  background: yellow;
  padding: 0.75ex 1.3ex;
  border: 1px double gray;
  border-radius: 1ex;
}
#text_area{
  color: black;
  background: white;
  padding: 0.75ex 1.3ex;
  border: 1px double gray;
  border-radius: 1ex;
}
`)
*/
