// ==UserScript==
// @name         TWIC Balance Checker
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  try to take over the world!
// @author       dk.lim@unity3d.com
// @match        https://client.joinforma.com/claims*
// @updateURL    https://raw.githubusercontent.com/skylimdg89/dk_userscript/master/balance_checker.js
// @downloadURL  https://raw.githubusercontent.com/skylimdg89/dk_userscript/master/balance_checker.js
// @grant        GM.xmlHttpRequest
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

var mydiv = document.createElement("div");
var li1 = document.createElement("li");
li1.setAttribute("id", "li1");
document.body.parentNode.appendChild(mydiv);
mydiv.appendChild(li1);

var submit = document.createElement("input");
submit.type = "button";
submit.setAttribute("id", "submit");
submit.value = "Check Remaining";
submit.onclick = display_balance;
li1.appendChild(submit);

function display_balance(){
    var mytable = document.querySelector("#root > div > div > main > div > ul")
    var mytable_length =mytable.children.length;
    console.log(mytable_length);
    var sum = 0;
    var total_balance = 12 * 300000;
    let regex_date = /\d{1,2}\/\d{1,2}\/2022/g;
    let regex_amount = /^₩.*/
    let data_array = []

    for(var i = 1; i <= mytable_length; i++){
        let date = document.querySelector(`#root > div > div > main > div > ul > li:nth-child(${i}) > a > div.sc-lbhYTY.gJgRan > div > span.sc-papXJ.sc-feINqK.eMmNuO.jKoOBu`).innerText
        if(date.match(regex_date)){
            let amt = document.querySelector(`li:nth-child(${i}) > a > div.sc-lbhYTY.gJgRan > span`).innerText.replace(/[^0-9.-]+/g,"")

            console.log('amt = ', amt)
            console.log('date = ', date)
            sum += parseInt(amt);
        }

    }
    console.log('###Balance Summary for 2022###')
    console.log('data_array = ', data_array)
    console.log("Total Used = " + sum);
    var remaining = total_balance - sum;
    console.log("Total Remaining = " + new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(remaining));
    window.alert("Make sure to hit Load More on the bottom\nTotal Remaining = " + new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(remaining));
}

//GM style
GM_addStyle(`
#li1 {
  min-width: 16%;
}
#submit {
  background-color: skyblue;
  position: absolute;
  top:150px
}
`)
