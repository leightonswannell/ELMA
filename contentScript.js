// Get color preference from storage
var color;
chrome.storage.sync.get('maskColor', function(data) {
    color = data.maskColor;
  });

var body = document.body;
window.onload = function addMask() {
    // Create a hidden div over entire page that can be shown when a message arrives
    var mask = document.createElement("div");
    mask.setAttribute("id", "mask");
    mask.style = "position:absolute;width:100%;height:100%;z-index:100;background:" + color + ";pointer-events: none;";
    mask.style.opacity = 0;
    body.insertBefore(mask, body.childNodes[0]);
    // var chatList = document.querySelector("body > section > div.chat > div.content > ol");
    // chatList.setAttribute("id", "chatList");
    // Remove timestamps from messages to avoid flashing screen every minute
    var timestamps = document.getElementsByClassName("timeago");
    while(timestamps.length > 0){
        timestamps[0].parentNode.removeChild(timestamps[0]);
    }
}

// Detect changes to chat section
var myElement = document.querySelector("body > section > div.chat > div.content");
if(window.addEventListener) {
   // Normal browsers
   myElement.addEventListener('DOMSubtreeModified', contentChanged, false);
} else
   if(window.attachEvent) {
      // IE
      myElement.attachEvent('DOMSubtreeModified', contentChanged);
   }

// Show the coloured screen
function contentChanged() {
    // Remove timestamps from messages to avoid flashing screen every minute
    var timestamps = document.getElementsByClassName("timeago");
    while(timestamps.length > 0){
        timestamps[0].parentNode.removeChild(timestamps[0]);
    }
    // Get the mask and show it, then hide it
    var fadeTarget = document.getElementById("mask");
    fadeTarget.style.opacity = 1;
    var fadeEffect = setInterval(function () {
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity = 0;
        } else {
            clearInterval(fadeEffect);
        }
    }, 500);
}