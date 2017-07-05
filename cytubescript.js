<<<<<<< HEAD

/* TODO:
 * 'next skips next video after previous video would have ended normally
 * 'remove is also broken
 * when video moves it loses title
 * Add sort bot
 * bump
 * bot responses
 * Image previews (imgur only - optional??? some symbol for preview???)
 */

/*
 * Globals
 */
var admin = "geoffkeighley";
var mods = ["Fitzthistlewits"];
var sortMode = false;

var isMod = function(usr) {
  return mods.indexOf(usr) > -1;
};

var colourMap = {"sadweeaboo2" : "red", "RyanGoslingTwerk" : "#ff66cc"};

var addVideoTitleToTarget = function(targ) {
  var videoTitle = targ.firstChild.innerText;
  if (videoTitle.indexOf(targ.title) < 0) {
      targ.firstChild.innerText += " " + targ.title;
  }
};

var addNameToTarget = function(targ) {
  var username = targ.className.substring(("chat-msg-").length, targ.className.length);
  if (targ.childNodes.length < 3 && targ.className.indexOf("server-msg") < 0 && targ.className.indexOf("\\$server\\$") < 0) {
    var span = document.createElement("SPAN");
    span.innerHTML = "<strong class=\"username\">" + username + ": </strong>";

    if (username === admin) {
      span.className += "userlist_owner";
    } else if (isMod(username)) {
      span.className += "userlist_op";
    }

    targ.insertBefore(span, targ.childNodes[1]);
  }

  if (colourMap[username] !== undefined) {
    targ.childNodes[1].style.color = colourMap[username];
  }

  if (username === admin || isMod(username)) {
    if (targ.childNodes[2].innerText === "'next") {
      targ.innerHTML = "";
      targ.className = "server-msg-reconnect video-skip";
      targ.innerText = "Video skipped.";
      var msgBuff = document.getElementById("messagebuffer");
      msgBuff.scrollTop = msgBuff.scrollHeight;
    } else if (targ.childNodes[2].innerText === "'remove") {
      targ.innerHTML = "";

      targ.className = "server-msg-reconnect video-remove";
      targ.style.color = "red";
      targ.style.borderColor = "red";
      targ.innerText = "Video removed.";

      var msgBuff = document.getElementById("messagebuffer");
      msgBuff.scrollTop = msgBuff.scrollHeight;
    }
  }
};

var checkForOptions = function(targ) {
  if (targ.className.indexOf("video-skip") > -1) {
    var videoQueue = document.getElementById('queue');
    var videoTitleList = videoQueue.getElementsByTagName("li");

    var nextVideo = undefined;
    for (var i = 0; i < videoTitleList.length; i++) {
      if (videoTitleList[i].className.indexOf("queue_active") > -1) {
        if (i+1 < videoTitleList.length) {
          nextVideo = videoTitleList[i+1];
          break;
        } else {
          nextVideo = videoTitleList[0];
          break;
        }
      }
    }

    if (nextVideo !== undefined) {
      var nextVideoButtons = nextVideo.getElementsByTagName("button");
      // First button is play
      nextVideoButtons[0].click();
    }
  } else if (targ.className.indexOf("video-remove") > -1) {
    var videoQueue = document.getElementById('queue');
    var currentVideo = videoQueue.getElementsByClassName("queue_active")[0];

    currentVideo.getElementsByTagName("button")[3].click();
  }

  // Check vanilla message
  if (targ.childNodes[2] !== undefined) {
    var msg = targ.childNodes[2].innerText;
    var username = targ.className.substring(("chat-msg-").length, targ.className.length);

    if (username === admin) {
      if (msg === "'sortmode") {
        sortMode = !sortMode;
        console.log("Sort mode: ", sortMode);
      }
    }

    if (msg.includes("'img")) {
      console.log("'img detected.");
      var url = targ.childNodes[2].innerText.substr("'img".length);
      console.log("URL: "+url);

      var buffer = document.querySelector('#messagebuffer');

      var image = new Image();
      image.onload = function() { buffer.scrollTop = buffer.scrollHeight; }
      image.src = url;
      targ.childNodes[2].innerHTML = ("'img", "<img style=\"max-width:450px;max-height:300px\" src="+url+"></img>");
    }
  }
};

var setUserColour = function(targ) {
  if (colourMap[targ.childNodes[1].innerText] !== undefined) {
    targ.childNodes[1].style.color = colourMap[targ.childNodes[1].innerText];
    targ.childNodes[1].className = "";
  }
};

var sortBot = function() {
  // Go through videos and find all users (don't trust userlist!!)
  // Sort these users alphabettically
  // Sort videos using users (explained below)
  // --- user1, user2, user3, userx, user1, user2, userx, etc
};

var main = function() {
  // select the target node
  var videoTitleTarget = document.getElementById('queue');
  var msgTarget = document.getElementById("messagebuffer");
  var usrTarget = document.getElementById("userlist");

  // Probably never going to do anything due to DOM loading but here just in case
  var videoList = videoTitleTarget.getElementsByTagName("li");
  for (var i = 0; i < videoList.length; i++) {
    addVideoTitleToTarget(videoList[i]);
  }

  var msgList = msgTarget.getElementsByTagName("div");
  for (var i = 0; i < msgList.length; i++) {
    addNameToTarget(msgList[i]);
  }

  var userList = usrTarget.getElementsByClassName("userlist_item");
  for (var i = 0; i < userList.length; i++) {
    setUserColour(userList[i]);
  }

  // create an observer instance
  var videoTitleObserver = new MutationObserver(function(mutations) {
    // Which mutation is used is not important
    var videoItem = mutations[0].target.getElementsByTagName("li");
    for (var i = 0; i < mutations.length; i++) {
      // Modifies the last x (mutations.length) video titles
      console.log("Video observer.");
      addVideoTitleToTarget(videoItem[videoItem.length-1-i]);
    }
    sortBot();
  });

  var nameMsgObserver = new MutationObserver(function(mutations) {
    var msgItem = mutations[0].target.getElementsByTagName("div");
    for (var i = 0; i < mutations.length; i++) {
      // Modifies the last x (mutations.length)
      console.log("Message observer.");
      // Visual / DOM changes
      addNameToTarget(msgItem[msgItem.length-1-i]);
      // Functionality changes
      checkForOptions(msgItem[msgItem.length-1-i]);
    }
  });

  var usrListObserver = new MutationObserver(function(mutations) {
    var usrItem = mutations[0].target.getElementsByClassName("userlist_item");
    usrItem = usrItem[usrItem.length-1];
    console.log("User observer.");
    setUserColour(usrItem);
  });

  // configuration of the observer:
  var videoTitleConfig = {childList: true};
  var nameMsgConfig = {childList : true};
  var usrListConfig = {childList : true};

  // pass in the target node, as well as the observer options
  videoTitleObserver.observe(videoTitleTarget, videoTitleConfig);
  nameMsgObserver.observe(msgTarget, nameMsgConfig);
  usrListObserver.observe(usrTarget, usrListConfig);
}();
=======

/* TODO:
 * 'next skips next video after previous video would have ended normally
 * 'remove is also broken
 * when video moves it loses title
 * Add sort bot
 * bump
 * bot responses
 * Image previews (imgur only - optional??? some symbol for preview???)
 */

/*
 * Globals
 */
var admin = "geoffkeighley";
var mods = ["Fitzthistlewits"];
var sortMode = false;

var isMod = function(usr) {
  return mods.indexOf(usr) > -1;
};

var colourMap = {"sadweeaboo" : "red", "RyanGoslingTwerk" : "#ff66cc"};

var addVideoTitleToTarget = function(targ) {
  var videoTitle = targ.firstChild.innerText;
  if (videoTitle.indexOf(targ.title) < 0) {
      targ.firstChild.innerText += " " + targ.title;
  }
};

var addNameToTarget = function(targ) {
  var username = targ.className.substring(("chat-msg-").length, targ.className.length);
  if (targ.childNodes.length < 3 && targ.className.indexOf("server-msg") < 0 && targ.className.indexOf("\\$server\\$") < 0) {
    var span = document.createElement("SPAN");
    span.innerHTML = "<strong class=\"username\">" + username + ": </strong>";

    if (username === admin) {
      span.className += "userlist_owner";
    } else if (isMod(username)) {
      span.className += "userlist_op";
    }

    targ.insertBefore(span, targ.childNodes[1]);
  }

  if (colourMap[username] !== undefined) {
    targ.childNodes[1].style.color = colourMap[username];
  }

  if (username === admin || isMod(username)) {
    if (targ.childNodes[2].innerText === "'next") {
      targ.innerHTML = "";
      targ.className = "server-msg-reconnect video-skip";
      targ.innerText = "Video skipped.";
      var msgBuff = document.getElementById("messagebuffer");
      msgBuff.scrollTop = msgBuff.scrollHeight;
    } else if (targ.childNodes[2].innerText === "'remove") {
      targ.innerHTML = "";

      targ.className = "server-msg-reconnect video-remove";
      targ.style.color = "red";
      targ.style.borderColor = "red";
      targ.innerText = "Video removed.";

      var msgBuff = document.getElementById("messagebuffer");
      msgBuff.scrollTop = msgBuff.scrollHeight;
    }
  }
};

var checkForOptions = function(targ) {
  if (targ.className.indexOf("video-skip") > -1) {
    var videoQueue = document.getElementById('queue');
    var videoTitleList = videoQueue.getElementsByTagName("li");

    var nextVideo = undefined;
    for (var i = 0; i < videoTitleList.length; i++) {
      if (videoTitleList[i].className.indexOf("queue_active") > -1) {
        if (i+1 < videoTitleList.length) {
          nextVideo = videoTitleList[i+1];
          break;
        } else {
          nextVideo = videoTitleList[0];
          break;
        }
      }
    }

    if (nextVideo !== undefined) {
      var nextVideoButtons = nextVideo.getElementsByTagName("button");
      // First button is play
      nextVideoButtons[0].click();
    }
  } else if (targ.className.indexOf("video-remove") > -1) {
    var videoQueue = document.getElementById('queue');
    var currentVideo = videoQueue.getElementsByClassName("queue_active")[0];

    currentVideo.getElementsByTagName("button")[3].click();
  }

  // Check vanilla message
  if (targ.childNodes[2] !== undefined) {
    var msg = targ.childNodes[2].innerText;
    var username = targ.className.substring(("chat-msg-").length, targ.className.length);

    if (username === admin) {
      if (msg === "'sortmode") {
        sortMode = !sortMode;
        console.log("Sort mode: ", sortMode);
      }
    }
  }
};

var setUserColour = function(targ) {
  if (colourMap[targ.childNodes[1].innerText] !== undefined) {
    targ.childNodes[1].style.color = colourMap[targ.childNodes[1].innerText];
    targ.childNodes[1].className = "";
  }
};

var sortBot = function() {
  // Go through videos and find all users (don't trust userlist!!)
  // Sort these users alphabettically
  // Sort videos using users (explained below)
  // --- user1, user2, user3, userx, user1, user2, userx, etc
};

var main = function() {
  // select the target node
  var videoTitleTarget = document.getElementById('queue');
  var msgTarget = document.getElementById("messagebuffer");
  var usrTarget = document.getElementById("userlist");

  // Probably never going to do anything due to DOM loading but here just in case
  var videoList = videoTitleTarget.getElementsByTagName("li");
  for (var i = 0; i < videoList.length; i++) {
    addVideoTitleToTarget(videoList[i]);
  }

  var msgList = msgTarget.getElementsByTagName("div");
  for (var i = 0; i < msgList.length; i++) {
    addNameToTarget(msgList[i]);
  }

  var userList = usrTarget.getElementsByClassName("userlist_item");
  for (var i = 0; i < userList.length; i++) {
    setUserColour(userList[i]);
  }

  // create an observer instance
  var videoTitleObserver = new MutationObserver(function(mutations) {
    // Which mutation is used is not important
    var videoItem = mutations[0].target.getElementsByTagName("li");
    for (var i = 0; i < mutations.length; i++) {
      // Modifies the last x (mutations.length) video titles
      console.log("Video observer.");
      addVideoTitleToTarget(videoItem[videoItem.length-1-i]);
    }
    sortBot();
  });

  var nameMsgObserver = new MutationObserver(function(mutations) {
    var msgItem = mutations[0].target.getElementsByTagName("div");
    for (var i = 0; i < mutations.length; i++) {
      // Modifies the last x (mutations.length)
      console.log("Message observer.");
      // Visual / DOM changes
      addNameToTarget(msgItem[msgItem.length-1-i]);
      // Functionality changes
      checkForOptions(msgItem[msgItem.length-1-i]);
    }
  });

  var usrListObserver = new MutationObserver(function(mutations) {
    var usrItem = mutations[0].target.getElementsByClassName("userlist_item");
    usrItem = usrItem[usrItem.length-1];
    console.log("User observer.");
    setUserColour(usrItem);
  });

  // configuration of the observer:
  var videoTitleConfig = {childList: true};
  var nameMsgConfig = {childList : true};
  var usrListConfig = {childList : true};

  // pass in the target node, as well as the observer options
  videoTitleObserver.observe(videoTitleTarget, videoTitleConfig);
  nameMsgObserver.observe(msgTarget, nameMsgConfig);
  usrListObserver.observe(usrTarget, usrListConfig);
}();
>>>>>>> f0d2acb0e9181ff2c62469c380abd26577c1af59
