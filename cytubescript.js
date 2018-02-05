/* TODO:
 * when video moves it loses title
 * pause / play
 * spin
 * fast
 * free photo API that auto embeded first search result??
 * Add sort bot
 * bump
 * bot responses
 */

/*
 * Globals
 */
var admin = "geoffkeighley";
// Note: must add mod to channel first
var mods = ["Fitzthistlewits"];

var isMod = function(usr) {
  return mods.indexOf(usr) > -1 || usr === admin;
};

var colourMap = {
  "sadweeaboo2" : "red",
  "RyanGoslingTwerk" : "#ff66cc"
};

var msgColours = {
  "success": "#0f8c1f",
  "error": "red",
  "general": "yellow",
};

var addVideoTitleToTarget = function(targ) {
  if (targ.querySelector('.qe_title') !== null && targ.title !== undefined && targ.querySelector('.qe_title').innerText.length > 0 && !targ.className.includes('ui-')) {
    var videoTitle = targ.querySelector('.qe_title').innerText;
    if (!videoTitle.includes(targ.title)) {
      targ.querySelector('.qe_title').innerText += " " + targ.title;
    }
  }
};

var addBotMsg = function(msg, colour) {
  var element = document.createElement('div');
  element.classList.add('server-msg-reconnect'); // Spoofs a server message
  element.style.color = colour;
  element.style.border = "1px solid " + colour;
  element.innerText = msg;
  document.querySelector('#messagebuffer').appendChild(element);
  document.querySelector('#messagebuffer').scrollTop = document.querySelector('#messagebuffer').scrollHeight;
};

var addNameToTarget = function(targ) {
  var username = targ.className.substring("chat-msg-".length, targ.className.length);
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
};

var sendMsg = function(msg) {
  document.querySelector('#chatline').value = msg;
  // Due to a bug outside of my control, this is how a enter press must be dispatched
  var enterEvent = new Event('keydown');
  enterEvent.keyCode = 13;
  document.querySelector('#chatline').dispatchEvent(enterEvent);
};

// isInit (optional) -> defaults to false
//                   -> true: will ignore certain checks (such as 'roll)
var checkForOptions = function(targ, isInit) {
  if (isInit === undefined) isInit = false;

  // Check vanilla message
  if (targ.childNodes[2] !== undefined) {
    var msg = targ.childNodes[2].innerText;
    var username = targ.className.substring(("chat-msg-").length, targ.className.length);

    var w = document.querySelector('#welcome');
    var scriptUser = (w === null) ? undefined : w.innerText.substring(w.innerText.indexOf(',')+2);

    // Cannot be init as this will create a feedback loop
    if (msg.indexOf("'roll") === 0) {
      if (username === scriptUser && !isInit) {
        var maxRoll = msg.substr("'roll ".length);
        console.log("Roll: " + parseInt(maxRoll));
        if (!isNaN(maxRoll) && maxRoll >= 1 && maxRoll <= 10000) {
          maxRoll = Math.trunc(maxRoll);
          var roll = Math.random() * (maxRoll - 1) + 1;
          roll = Math.round(roll);
          targ.remove();
          addBotMsg(username + " rolled a " + roll + " on a d" + maxRoll, msgColours.success);
          sendMsg(JSON.stringify({'roll': roll, 'maxRoll': maxRoll}));
        }
      } else {
        targ.remove();
      }
    } else if (msg.indexOf("'lead") === 0 && isMod(username)) {
      var userList = document.querySelector('#userlist');
      if (!isInit && scriptUser === username) {
        for (let i = 0; i < userList.childNodes.length; i++) {
          if (userList.childNodes[i].innerText === username) {
            var btnClicked = userList.childNodes[i].querySelectorAll('button')[1].innerText;
            userList.childNodes[i].querySelectorAll('button')[1].click();
            var m = (btnClicked.includes("Give")) ? "has taken lead" : "has given up lead";
            sendMsg(JSON.stringify({msg: username + " " + m, colour: msgColours.general}));
            break;
          }
        }
      }

      targ.remove();
    } else if (msg.indexOf("'skip") === 0 && isMod(username)) {
      var videoList = document.querySelector('#queue');
      if (!isInit && scriptUser === username && videoList.childNodes.length > 1) {
        var nextVideo = document.querySelector('.queue_active').nextSibling;
        if (nextVideo === null) {
          nextVideo = document.querySelector('#queue').childNodes[0];
        }

        var btnClicked = nextVideo.querySelector('.qbtn-play');
        // Possible buttons are hidden
        if (btnClicked !== null) {
          btnClicked.click();
          sendMsg(JSON.stringify({msg: username + " skipped video", colour: msgColours.general}));
        } else {
          sendMsg(JSON.stringify({msg: username + " failed to skip - are buttons hidden?", colour: msgColours.failed}));
        }
      }

      targ.remove();
    } else if (msg.indexOf("'img") === 0) {
      var url = msg.substr("'img".length);

      var buffer = document.querySelector('#messagebuffer');

      var image = new Image();
      image.onload = function() { buffer.scrollTop = buffer.scrollHeight; }
      image.src = url;

      var imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.style["max-width"] = "350px";
      imgElement.style["max-height"] = "200px";
      imgElement.style.cursor = "zoom-in";
      imgElement.classList.add('user-img');
      targ.appendChild(imgElement);
      targ.childNodes[2].remove();

      var imgDiv = document.createElement('div');
      imgDiv.style.position = "fixed";
      imgDiv.style.top = 0;
      imgDiv.style.left = 0;
      imgDiv.style.width = document.body.offsetWidth + "px";
      imgDiv.style.height = document.body.offsetHeight + "px";
      imgDiv.style["background-color"] = "rgba(23, 23, 23, 0.75)";
      imgDiv.style["z-index"] = 2000; // Has to be above the fixed header
      imgDiv.style.visibility = "hidden";
      imgDiv.style.cursor = "zoom-out";
      var imgPreview = document.createElement('img');
      imgPreview.src = image.src;
      imgPreview.style.visibility = "hidden";
      imgPreview.style.position = "fixed";
      imgPreview.style.top = "0px";
      imgPreview.style.left = "0px";
      imgPreview.style["z-index"] = 25;
      imgPreview.style.cursor = "zoom-out";

      imgDiv.appendChild(imgPreview);
      targ.appendChild(imgDiv);

      var clickShow = function(e) {
        // Must be called here as offsetWidth/Height may change
        imgDiv.style.width = window.innerWidth + "px";
        imgDiv.style.height = window.innerHeight + "px";
        imgDiv.style.visibility = "visible";

        imgPreview.style["max-width"] = window.innerWidth*0.8 + "px";
        imgPreview.style["max-height"] = window.innerHeight*0.98 + "px";
        imgPreview.style.top = ((window.innerHeight - imgPreview.height) / 2) + "px";
        imgPreview.style.left = ((window.innerWidth - imgPreview.width) / 2) + "px";
        imgPreview.style.visibility = "visible";
      };

      var clickHide = function(e) {
        imgPreview.style.visibility = "hidden";
        imgDiv.style.visibility = "hidden";
      };

      imgElement.addEventListener('click', clickShow);

      imgDiv.addEventListener('click',  clickHide);
      imgPreview.addEventListener('click',  clickHide);

      window.onresize = function() {
        imgDiv.style.width = window.innerWidth + "px";
        imgDiv.style.height = window.innerHeight + "px";

        imgPreview.style["max-width"] = window.innerWidth*0.8 + "px";
        imgPreview.style["max-height"] = window.innerHeight*0.98 + "px";
        imgPreview.style.top = ((window.innerHeight - imgPreview.height) / 2) + "px";
        imgPreview.style.left = ((window.innerWidth - imgPreview.width) / 2) + "px";
      };
    }

    // Returns an object with the JSON and the process type
    // or undefined if not valid JSON
    var validateJSON = function(j) {
      try {
        var json = JSON.parse(j);
      } catch (error) {
        return undefined;
      }

      json = {'json': json, 'type': null};

      if (json.json.roll !== undefined && json.json.maxRoll !== undefined) {
        json.type = 'roll';
      } else if (json.json.msg !== undefined && json.json.colour !== undefined) {
        json.type = 'msg';
      }

      return json;
    };

    var json = validateJSON(msg);
    if (json !== undefined && json.type !== null) {
      if (!isInit) {
        if (json.type === "roll") {
          if (username !== scriptUser) {
            addBotMsg(username + " rolled a " + json.json.roll + " on a d" + json.json.maxRoll, msgColours.success);
          }

          targ.remove();
        } else if (json.type === 'msg') {
          addBotMsg(json.json.msg, json.json.colour);
          targ.remove();
        }
      } else {
        targ.remove();
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

var main = function() {
  var videoTitleTarget = document.getElementById('queue');
  var msgTarget = document.getElementById("messagebuffer");
  var usrTarget = document.getElementById("userlist");

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
    // var videoItem = mutations[0].target.getElementsByTagName("li");

    // for (var i = 0; i < mutations.length; i++) {
      // Modifies the last x (mutations.length) video titles
      // addVideoTitleToTarget(videoItem[videoItem.length-1-i]);
    // }

    var videos = document.querySelectorAll('.queue_entry');
    for (let i = 0; i < videos.length; i++) {
      addVideoTitleToTarget(videos[i]);
    }
  });

  var nameMsgObserver = new MutationObserver(function(mutations) {
    var msgItem = mutations[0].target.getElementsByTagName("div");
    for (var i = 0; i < mutations.length; i++) {
      // Modifies the last x (mutations.length)
      // Visual / DOM changes
      addNameToTarget(msgItem[msgItem.length-1-i]);
      // Functionality changes
      checkForOptions(msgItem[msgItem.length-1-i]);
    }
  });

  var usrListObserver = new MutationObserver(function(mutations) {
    var usrItem = mutations[0].target.getElementsByClassName("userlist_item");
    usrItem = usrItem[usrItem.length-1];
    setUserColour(usrItem);
  });

  // configuration of the observer:
  var videoTitleConfig = {childList: true};
  var nameMsgConfig = {childList : true};
  var usrListConfig = {childList : true};

  // Check all messages in history
  // May delete some children, check for this
  for (let i = 0; i < msgTarget.childNodes.length;) {
    var len = msgTarget.childNodes.length;
    checkForOptions(msgTarget.childNodes[i], true);
    if (msgTarget.childNodes.length === len) {
      i += 1;
    }
  }

  // pass in the target node, as well as the observer options
  videoTitleObserver.observe(videoTitleTarget, videoTitleConfig);
  nameMsgObserver.observe(msgTarget, nameMsgConfig);
  usrListObserver.observe(usrTarget, usrListConfig);

  // Remove old test area
  if (document.querySelector('.test-area') !== null) {
    document.querySelector('.test-area').remove();
  }

  var testArea = document.createElement('div');
  testArea.classList.add('test-area');
  testArea.innerText = "Test Area. DO NOT MOUSE OVER.";
  var testImg = document.createElement('img');
  testImg.src = "https://cdn.instructables.com/FB2/DLT8/I86UGV9U/FB2DLT8I86UGV9U.MEDIUM.gif";
  testImg.style.visibility = "hidden";
  testImg.style["z-index"] = 100;

  testArea.addEventListener('mouseenter', function(e) {
    testImg.style.visibility = "visible";
    testArea.innerText = "";
    testArea.appendChild(testImg);
    testImg.style.width = testArea.offsetWidth + "px";
    testImg.style.height = testArea.offsetHeight + "px";
    testArea.style.border = "none";
  });

  testImg.addEventListener('mouseout', function(e) {
    testImg.style.visibility = "hidden";
    testArea.innerText = "Test Area. DO NOT MOUSE OVER.";
    testArea.style.border = "2px dotted white";
  });

  document.querySelector('#leftpane').appendChild(testArea);

  // Removed for now
  // var bannerDiv = document.createElement('div');
  // bannerDiv.classList.add('banner');
  // var bannerImg = document.createElement('img');
  // bannerImg.src = "http://i.imgur.com/b2O7hQq.png";
  // bannerDiv.appendChild(bannerImg);
  // document.querySelector('.container-fluid').insertBefore(bannerDiv, document.querySelector('#announcements'));

  // Add any custom CSS
  // Used over cytube CSS editor so you only have to update one file
  var css = `.user-img:hover {
    filter: grayscale(40%);
  }
  .test-area {
    width: 100%;
    height: 115px;
    border: 2px dotted white;
    text-align: center;
    font-size: 24px;
  }
  .banner {
    width: 100%;
    text-align: center;
    margin-bottom: 5px;
  }
  .banner img {
    width: 100%;
    height: 180px;
  }`;

  var cssTag = document.createElement('style');
  if (cssTag.styleSheet) {
    cssTag.styleSheet.cssText = css;
  } else {
    cssTag.appendChild(document.createTextNode(css));
  }

  document.querySelector('head').appendChild(cssTag);
}();
