/* TODO:
 * onerror is broken
 * alt text for gifs should be search term
 * lower limit on gifs (make more relevant)
 * fast
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

var w = document.querySelector('#welcome');
var scriptUser = (w === null) ? undefined : w.innerText.substring(w.innerText.indexOf(',')+2);

var isMod = function(usr) {
  return mods.indexOf(usr) > -1 || usr === admin;
};

var colourMap = {
  "sadweeaboo2" : "red",
  "RyanGoslingTwerk" : "#ff66cc",
};

var msgColours = {
  "success": "#0f8c1f",
  "error": "red",
  "general": "yellow",
};

var isPlaying = true; // this is an assumption, and should be overriden on load anyway
var onPlayerStateChange = function(status) {
  // other states available, https://developers.google.com/youtube/iframe_api_reference#Examples
  if (status === 1) { // Playing
    isPlaying = true;
  } else if (status === 2) { // Paused
    isPlaying = false;
  }
};

var addVideoTitleToTarget = function(targ) {
  if (targ.querySelector('.qe_title') !== null && targ.title !== undefined && targ.querySelector('.qe_title').innerText.length > 0 && !targ.className.includes('ui-')) {
    var videoTitle = targ.querySelector('.qe_title').innerText;
    if (!videoTitle.includes(targ.title)) {
      var username = targ.title.substring('Added by: '.length);
      if (colourMap[username] || isMod(username)) {
        var s = document.createElement('span');
        s.innerText = username;

        if (admin === username) {
          s.classList.add('userlist_owner');
        } else if (isMod(username)) {
          s.classList.add('userlist_op');
        } else {
          s.style.color = colourMap[username];
        }

        targ.querySelector('.qe_title').innerText += " · Added by: ";
        targ.querySelector('.qe_title').appendChild(s);
      } else {
        targ.querySelector('.qe_title').innerText += " " + targ.title;
      }
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

// Toggles lead on user
var toggleLead = function(user) {
  var userList = document.querySelector('#userlist');
  for (let i = 0; i < userList.childNodes.length; i++) {
    if (userList.childNodes[i].innerText === user) {
      var btnClicked = userList.childNodes[i].querySelectorAll('button')[1].innerText;
      userList.childNodes[i].querySelectorAll('button')[1].click();
    }
  }
};

var hasLead = function() {
  if (document.querySelector('.glyphicon-star-empty') === null) {
    return false;
  } else if (document.querySelector('.glyphicon-star-empty').parentNode.nextSibling.innerText === scriptUser) {
    return true;
  }

  return false;
};

var addImage = function(targ, url) {
  var buffer = document.querySelector('#messagebuffer');

  var image = new Image();
  image.onload = function() { buffer.scrollTop = buffer.scrollHeight; };
  image.onerror = function() { image.onerror = ""; image.src = "https:\/\/i.imgur.com\/VWzRomm.png"; };
  image.src = url;

  var imgElement = document.createElement('img');
  imgElement.src = image.src;
  imgElement.style["max-width"] = "300px";
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
};

var addGif = function(tag, callback) {
  var api_key = "fo4xOJtcZuXE1t6JSoof674hHercv45G";

  fetch(`https:\/\/api.giphy.com\/v1\/gifs\/random?api_key=${api_key}&tag=${tag}`)
  .then(function(response) {
    if (response.status === 200) {
      response.json().then(function(json) {
        if (json.data.length === 0) {
          addBotMsg('No results found.', msgColours.general);
          targ.remove();
        } else {
          console.log(json.data.images.original.url);
          // Switches servers from media3 to media
          callback(json.data.images.original.url.replace('media3', 'media'));
        }
      });
    }
  });
};

// isInit (optional) -> defaults to false
//                   -> true: will ignore certain checks (such as 'roll)
var checkForOptions = function(targ, isInit) {
  if (isInit === undefined) isInit = false;

  // Check vanilla message
  if (targ.childNodes[2] !== undefined) {
    var msg = targ.childNodes[2].innerText;
    var username = targ.className.substring(("chat-msg-").length, targ.className.length);

    // Cannot be init as this will create a feedback loop
    if (msg.indexOf("'roll") === 0) {
      if (username === scriptUser && !isInit) {
        var maxRoll = msg.substr("'roll ".length);
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
      if (!isInit && scriptUser === username) {
        // hasLead won't get updated info in time otherwise
        var m = (!hasLead()) ? "has taken lead" : "has given up lead";
        toggleLead(username);
        sendMsg(JSON.stringify({msg: username + " " + m, colour: msgColours.general}));
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
          sendMsg(JSON.stringify({msg: username + " failed to skip - are buttons hidden?", colour: msgColours.error}));
        }
      }

      targ.remove();
    } else if (msg.indexOf("'video") === 0 && isMod(username)) {
      if (!isInit && scriptUser === username) {
        if (!hasLead()) toggleLead(username);
        var action = (isPlaying) ? 'pauseVideo' : 'playVideo';
        document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"'+action+'","args":""}', '*');

        sendMsg(JSON.stringify({msg: username + ' ' + ((!isPlaying) ? 'resumed the video' : 'paused the video'), colour: msgColours.general}));

        if (action === 'playVideo' && hasLead()) toggleLead(username);
      }

      targ.remove();
    } else if (msg.indexOf("'spin") === 0) {
      if (msg.substring("'spin".length).length > 0) {
        var content = msg.substring("'spin".length+1);
        if (content.indexOf("'gif") === 0) {
          if (scriptUser === username) {
            addGif(content.substring("'gif ".length), function(url) {
              addImage(targ, url);
              var imgs = targ.querySelectorAll('img');
              for (let i = 0; i < imgs.length; i++) {
                imgs[i].style.display = 'inline-block';
                imgs[i].style.animation = 'spin 2s linear 0s infinite';
              }
              sendMsg(JSON.stringify({gif_url: url, 'username': username, options: 'spin'}));
            });
          } else {
            targ.remove();
          }
        } else if (content.indexOf("'img") === 0 || targ.querySelector('img') !== null) {
          if (content.indexOf("'img") === 0) {
            addImage(targ, content.substring("'img".length));
          } else if (targ.querySelector('img') !== null) {
            targ.lastChild.innerHTML = targ.lastChild.innerHTML.replace("'spin ", '');
          }

          var imgs = targ.querySelectorAll('img');
          for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.display = 'inline-block';
            imgs[i].style.animation = 'spin 2s linear 0s infinite';
          }
        } else if (content.length < 40) {
          // Prevents very long messages
          // There will always be messages that mess up someone's UI
          // Could check for this by window resize, but probably not worth it

          var p = document.createElement('p');
          p.innerText = content;
          p.style.display = 'inline-block';
          p.style.animation = 'spin 2s linear 0s infinite';

          targ.replaceChild(p, targ.lastChild);
        }
      }
    } else if (msg.indexOf("'gif") === 0) {
      if (!isInit) {
        if (scriptUser === username) {
          addGif(msg.substring("'gif ".length), function(url) {
            addImage(targ, url);
            sendMsg(JSON.stringify({gif_url: url, 'username': username}));
          });
        }
      } else {
        // On init, just remove
        targ.remove();
      }
    } else if (msg.indexOf("'img") === 0) {
      addImage(targ, msg.substring("'img".length));
    }

    // Returns an object with the JSON and the process type
    // or undefined if not valid JSON
    var validateJSON = function(j) {
      try {
        var json = JSON.parse(j);
      } catch (error) {
        return undefined;
      }

      if (json.roll !== undefined && json.maxRoll !== undefined) {
        json.type = 'roll';
      } else if (json.msg !== undefined && json.colour !== undefined) {
        json.type = 'msg';
      } else if (json.gif_url !== undefined && json.username !== undefined) {
        json.type = 'gif';
      }

      return json;
    };

    var json = validateJSON(msg);
    if (json !== undefined && json.type !== null) {
      // Should work even in init
      if (json.type === 'gif') {
        if (username !== scriptUser || isInit) {
          var messages = document.querySelector('#messagebuffer').childNodes;
          for (let i = messages.length-1; i >= 0; i--) {
            if (messages[i].querySelector('.username') !== null) {
              var u         = messages[i].querySelector('.username').innerText;
              u = u.substring(0, u.length-2); // removes ': '
              if (u === json.username && (messages[i].lastChild.innerText.indexOf("'gif") === 0 || messages[i].lastChild.innerText.indexOf("'spin 'gif") === 0)) {
                addImage(messages[i], json.gif_url);
                if (json.options === 'spin') {
                  var imgs = targ.querySelectorAll('img');
                  for (let i = 0; i < imgs.length; i++) {
                    imgs[i].style.display = 'inline-block';
                    imgs[i].style.animation = 'spin 2s linear 0s infinite';
                  }
                }
                break;
              }
            }
          }
        }

        targ.remove();
      } else if (!isInit) {
        if (json.type === "roll") {
          if (username !== scriptUser) {
            addBotMsg(username + " rolled a " + json.roll + " on a d" + json.maxRoll, msgColours.success);
          }

          targ.remove();
        } else if (json.type === 'msg') {
          addBotMsg(json.msg, json.colour);
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
  addBotMsg('Script has loaded a new copy: refresh if necessary', msgColours.error);

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

  var videoTitleObserver = new MutationObserver(function(mutations) {
    for (let i = 0; i < mutations.length; i++) {
      var newNodes = mutations[i].addedNodes;
      for (let k = 0; k < newNodes.length; k++) {
        addVideoTitleToTarget(newNodes[k]);
      }
    }
  });

  // Inits variables for tab visibility and message notifications
  var newMsgInterval;
  var hidden, visibilityEvent;
  if (document.hidden !== undefined) {
    hidden = 'hidden';
    visibilityEvent = 'visibilitychange';
  } else if (document.msHidden !== undefined) {
    hidden = 'msHidden';
    visibilityEvent = 'msvisibilitychange';
  } else if (document.webkitHidden !== undefined) {
    hidden = 'webkitHidden';
    visibilityEvent = 'webkitvisibilitychange';
  }

  var msgObserver = new MutationObserver(function(mutations) {
    for (let i = 0; i < mutations.length; i++) {
      var newNodes = mutations[i].addedNodes;
      for (let k = 0; k < newNodes.length; k++) {
        addNameToTarget(newNodes[k]);
        checkForOptions(newNodes[k]);
      }
    }

    if (document[hidden] && newMsgInterval === undefined) {
      newMsgInterval = setInterval(function() {
        if (document.title === "geoffkeighleysroom") {
          document.title = "New Message!";
        } else {
          document.title = "geoffkeighleysroom";
        }
      }, 500);
    }
  });

  if (hidden !== undefined) {
    document.addEventListener(visibilityEvent, function() {
      if (!document[hidden] && newMsgInterval) {
        clearInterval(newMsgInterval);
        newMsgInterval = undefined;
        document.title = "geoffkeighleysroom";
      }
    });
  }

  var usrListObserver = new MutationObserver(function(mutations) {
    for (let i = 0; i < mutations.length; i++) {
      var newNodes = mutations[i].addedNodes;
      for (let k = 0; k < newNodes.length; k++) {
        if (newNodes[k].classList.contains('userlist_item')) {
          setUserColour(newNodes[k]);
        }
      }
    }
  });

  // configuration of the observer:
  var videoTitleConfig = {childList: true};
  var msgConfig = {childList : true};
  var usrListConfig = {childList : true};

  // Check all messages in history
  // May delete some children, check for this (not needed with last to first)
  // Start from bottom child for 'gif to work, also simplifies loop
  for (let i = msgTarget.childNodes.length-1; i >= 0; i--) {
    checkForOptions(msgTarget.childNodes[i], true);
  }

  // pass in the target node, as well as the observer options
  videoTitleObserver.observe(videoTitleTarget, videoTitleConfig);
  msgObserver.observe(msgTarget, msgConfig);
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

  // Remove "advertisement" if it exists - allows adding of potentially updated one if code changes
  if (document.querySelector('a[href="https://github.com/BranchofLight/CyTube-Room-Script"]') !== null) {
    document.querySelector('a[href="https://github.com/BranchofLight/CyTube-Room-Script"]').remove();
  }

  if (document.querySelector('.credit').querySelector('span') !== null) {
    document.querySelector('.credit').querySelector('span').remove();
  }

  // Add "advertisement" for script
  var adArea = document.querySelector('.credit');
  var adLink = document.createElement('a');
  adLink.innerText = "Get This Room Script";
  adLink.href = "https://github.com/BranchofLight/CyTube-Room-Script";
  adLink.target = "_blank";
  adLink.style.color = "#2aabf4";
  adLink.style['font-size'] = '16px';
  adLink.style['font-weight'] = 'bold';

  adArea.insertBefore(adLink, adArea.childNodes[adArea.childNodes.length-1]);

  var space  = document.createElement('span');
  space.innerText = " · ";
  adArea.insertBefore(space, adLink);

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
  }
  @-moz-keyframes spin {
      from { -moz-transform: rotate(0deg); }
      to { -moz-transform: rotate(359deg); }
  }
  @-webkit-keyframes spin {
      from { -webkit-transform: rotate(0deg); }
      to { -webkit-transform: rotate(359deg); }
  }
  @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(359deg);}
  }`;

  var cssTag = document.createElement('style');
  if (cssTag.styleSheet) {
    cssTag.styleSheet.cssText = css;
  } else {
    cssTag.appendChild(document.createTextNode(css));
  }

  document.querySelector('head').appendChild(cssTag);

  window.addEventListener('message', function(e) {
    var data = JSON.parse(e.data);
    if (data.event === 'onStateChange') {
      onPlayerStateChange(data.info);
    }
  });
}();
