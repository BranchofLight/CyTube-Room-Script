/**
 * TODO
 * /gif -> giphy search (use a different API?)
 * Integrate webpack for bundling and minifying ONLY (use prettier watch, eslint vscode extension)
 * Break out code into other files (processors, utility, or whatever makes sense)
 * /video -> take lead (if don't already have it), pause video (admin / mod only)
 *        => can I do this with the youtube api directly? or simulate click?
 **/

// gif ideas:
// -> embed a block that allows you to ask for new gif before committing (ala Slack)
//    -> use visual notifications of confirmed / not confirmed gifs

// /gif term
// -> search gif api for term
// Create way to send "server" messages (used for everything)
// /video
// -> pauses / play video with lead (admin/mod only)
// /spin
// -> spin whatever shows to the right
// /scroll
// -> scroll whatever shows to the right

Array.prototype.getLastItem = function () {
    return this[this.length - 1];
};

let newMsgInterval = undefined;

const userConfig = [
    {
        username: "geoffkeighley",
        colour: "#71b3ff",
    },
    {
        username: "sadweeaboo2",
        colour: "#e6b423",
    },
    {
        username: "Fitzthistlewits",
        colour: "#a83fff",
    },
];

const currentUsername = document
    .querySelector("#welcome")
    .innerText.split(" ")
    .getLastItem();

const msgBuffer = document.querySelector("#messagebuffer");
const videoBuffer = document.querySelector(".videolist#queue");
const userList = document.querySelector("#userlist");

const getServerMsgNode = (msgText, colour) => {
    const container = document.createElement("div");
    container.classList.add("server-msg-reconnect");
    container.innerText = msgText;
    container.style.color = colour;

    return container;
};

const sendUserMsg = node => {};

const getMediaNode = () => {
    const container = document.createElement("div");
    container.classList.add("media-container");

    return container;
};

const getImgNode = imgSrc => {
    const newNode = document.createElement("img");
    newNode.src = imgSrc;
    newNode.classList.add("image-msg");
    newNode.classList.add("media-msg");

    newNode.onclick = () => {
        document.querySelector(".image-preview img").src = imgSrc;
        document.querySelector(".image-preview").classList.remove("hidden");
    };
    newNode.onload = scrollMsgBufferToBottom;

    return newNode;
};

const getVideoNode = videoSrc => {
    const newNode = document.createElement("video");
    newNode.autoplay = true;
    newNode.controls = true;
    newNode.poster = true;
    newNode.loop = true;
    newNode.muted = true;

    newNode.onloadedmetadata = scrollMsgBufferToBottom;
    newNode.addEventListener("error", scrollMsgBufferToBottom);

    const srcElement = document.createElement("source");
    srcElement.src = videoSrc;
    const fileExt = videoSrc.match(/(?=.)\w*$/i);
    srcElement.type = "video/" + fileExt;

    newNode.appendChild(srcElement);
    newNode.classList.add("video-msg");
    newNode.classList.add("media-msg");

    return newNode;
};

let customStyleTag = document.createElement("style");
customStyleTag.classList.add("custom-css");
const initCustomCSS = () => {
    const customCssInHead = document.head.querySelector(".custom-css");
    if (customCssInHead === null) {
        document.head.appendChild(customStyleTag);
    } else {
        customStyleTag = customCssInHead;
        customStyleTag.innerText = "";
    }
};

const addCSS = cssString => {
    customStyleTag.innerText = customStyleTag.innerText + " " + cssString;
};

const initCustomUserSettings = () => {
    const getCustomUserCss = userConfig => {
        return `
    .chat-msg-${userConfig.username} .username {
      color: ${userConfig.colour};
    }
    .video-added-by-${userConfig.username} strong {
      color: ${userConfig.colour};
    }
    .username-${userConfig.username} {
      color: ${userConfig.colour};
    }
    `;
    };

    for (let i = 0; i < userConfig.length; i++) {
        addCSS(getCustomUserCss(userConfig[i]));
    }

    addCSS(
        `
          .hidden {
            display: none !important;
          }
          .queue_entry > span:first-of-type {
            margin-left: 5px;
          }
          .removed-msg {
            display: none !important;
          }
          .media-container {
            display: inline-block;
            overflow: hidden;
          }
          .media-msg {
            max-width: 200px;
            max-height: 200px;
          }
          .image-msg {
            transition: 0.2s all;
            cursor: zoom-in;
          }
          .image-msg:hover {
            transform: scale(1.25);
          }
          .image-preview {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;

            width: 100vw;
            height: 100vh;

            background-color: rgba(0, 0, 0, 0.4);

            display: flex;
            align-items: center;
            justify-content: center;

            cursor: zoom-out;
          }
          .image-preview img {
            max-width: 80%;
            max-height: 80%;
          }
     `
    );
};

const isNodeServerMsg = node => {
    return node.className.includes("server-msg");
};

const scrollMsgBufferToBottom = () => {
    msgBuffer.scrollTop = msgBuffer.scrollHeight;
};

const createProcessor = listOfProcessors => {
    return mutationsList => {
        for (let mutation of mutationsList) {
            mutation.addedNodes.forEach(n => {
                for (let i = 0; i < listOfProcessors.length; i++) {
                    listOfProcessors[i](n);
                }
            });
        }
    };
};

/**
 * Message Processors + Helpers
 **/

const addUsernameToMsgProcessor = node => {
    if (!isNodeServerMsg(node) && node.querySelector(".username") === null) {
        const username = node.className.split("-").getLastItem();
        const usernameNode = document.createElement("span");
        usernameNode.innerHTML = `<strong class="username">${username}: </strong>`;
        node.insertBefore(usernameNode, node.querySelector("span:last-child"));
    }
};

const whitelistedActions = [
    "/gif",
    "/spin",
    "/scroll",
    "/video",
    "/rave", // maybe? idk
];

const apiConfig = {
    baseURL: "api.giphy.com/v1/gifs/search",
    apiKey: "fo4xOJtcZuXE1t6JSoof674hHercv45G",
    limit: 25,
};

// const doesMsgContainWhitelistedAction = msg => {
//   const msgSplit = msg.split(' ');
//   for (let i = 0; i < msgSplit.length; i++) {
//     if (whitelistedActions.includes(msgSplit[i])) {
//       return true;
//     }
//   }
//
//   return false;
// };

const replaceMsgWithNode = (msgNode, newNode) => {
    msgNode.parentNode.replaceChild(newNode, msgNode);
};

const getGifSelectDialogNode = gifsList => {
    let gifsListIndex = 0;
    const container = document.createElement("span");
    container.classList.add("gif-dialog");

    const nextButton = document.createElement("button");
    nextButton.classList.add("next-button");
    nextButton.innerText = "Next";
    nextButton.addEventListener("click", () => {
        gifsListIndex =
            gifsListIndex >= gifsList.length - 1 ? 0 : gifsListIndex + 1;
        container.querySelector("img").src =
            gifsList[gifsListIndex].images.original.url;
    });

    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm-button");
    confirmButton.innerText = "✓";

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.innerText = "✖";
    cancelButton.addEventListener("click", () => container.remove());

    const imgNode = getImgNode(gifsList[0].images.original.url);

    container.appendChild(imgNode);
    container.appendChild(nextButton);
    container.appendChild(confirmButton);
    container.appendChild(cancelButton);

    return container;
};

const getGifSelectNode = term => {
    if (term.length > 0) {
        fetch(
            `https://${apiConfig.baseURL}?api_key=${
                apiConfig.apiKey
            }&q=${encodeURIComponent(term)}`
        ).then(res => {
            if (res.status !== 200) {
                console.log("Server error: ", res.status);
            } else {
                res.json()
                    .then(({ data }) => {
                        console.log(data);
                        if (data.length > 0) {
                            msgBuffer.appendChild(getGifSelectDialogNode(data));
                            // create node with 3 buttons (next, confirm, cancel)
                            // insert first gif into it (use getimgnode?)
                        }
                    })
                    .catch(err => {
                        console.log("ERROR: ", err);
                    });
            }
        });
        // if has results ->
        // create node with gif inside and 3 buttons ()
        // if has no results ->
        // return server error message to only initiating user
        // everyone else just sees the failed gif search
        // ->> how do we prevent this causing issues on refresh?
    }
};

const addFeatureNotImplementedNode = action => {
    const testNode = document.createElement("div");
    testNode.classList.add("gif");
    testNode.innerText = "HELLO " + action;
    return testNode;
};

const manageInlineEmbedsProcessor = node => {
    const msgNode = node.querySelector(":scope > span:last-of-type");
    const msgUsername = node.className.split("-").getLastItem();

    if (!isNodeServerMsg(node)) {
        const message = msgNode.innerText;
        const action = message.split(" ")[0];

        if (whitelistedActions.includes(action)) {
            const startParse = message.lastIndexOf(action);
            const param = message.slice(startParse + action.length).trim();

            switch (action) {
                // case "/gif":
                // if (msgUsername === currentUsername) {
                //     getGifSelectNode(param).then(node => {});
                // }
                // break;
                default:
                    addFeatureNotImplementedNode(action);
            }
        }
    }
};

const doesMsgContainImg = msg => {
    const urls = msg.match(/.*\.(?:jpg|gif|png|bmp|jpeg|webp)/i);
    return urls !== null && urls.length === 1 && urls[0] === msg;
};

const doesMsgContainVideo = msg => {
    const urls = msg.match(/.*\.(?:webm|mp4)/i);
    return urls !== null && urls.length === 1 && urls[0] === msg;
};

const addImgOrVideoProcessor = node => {
    const msgNode = node.querySelector(":scope > span:last-of-type");
    if (msgNode !== null && !isNodeServerMsg(node)) {
        const message = msgNode.innerText;
        let newNode = undefined;

        if (doesMsgContainImg(message)) {
            newNode = getImgNode(message);
        } else if (doesMsgContainVideo(message)) {
            newNode = getVideoNode(message);
        }

        if (newNode !== undefined) {
            const container = getMediaNode();
            container.appendChild(newNode);
            replaceMsgWithNode(msgNode, container);
        }
    }
};

const getVisibilityData = () => {
    if (typeof document.hidden !== "undefined") {
        return {
            hidden: "hidden",
            visibilityEvent: "visibilitychange",
        };
    } else if (typeof document.msHidden !== "undefined") {
        return {
            hidden: "msHidden",
            visibilityEvent: "msvisibilitychange",
        };
    } else if (typeof document.webkitHidden !== "undefined") {
        return {
            hidden: "webkitHidden",
            visibilityEvent: "webkitvisibilitychange",
        };
    }

    return undefined;
};

const newMsgTabAlertProcessor = () => {
    const visiblityData = getVisibilityData();
    if (
        visiblityData &&
        document[visiblityData.hidden] &&
        newMsgInterval === undefined
    ) {
        newMsgInterval = setInterval(() => {
            if (document.title === "geoffkeighleysroom") {
                document.title = "New Message!";
            } else {
                document.title = "geoffkeighleysroom";
            }
        }, 500);
    }
};

/**
 * Video Playlist Processors
 **/
const addUsernameToVideoProcessor = node => {
    if (node.querySelector('span[class*="video-added-by"]') === null) {
        const username = node.title.split(" ").getLastItem();
        const nameSpan = document.createElement("span");
        nameSpan.className = `video-added-by-${username}`;
        nameSpan.innerHTML = `Added by <strong>${username}</strong>`;
        node.insertBefore(nameSpan, node.querySelector("span"));
    }
};

/**
 * User List Processors
 **/
const addClassToUserlistProcessor = node => {
    if (node.querySelector('[class*="username-"]') === null) {
        const userNode = node.querySelector(":scope > span:last-of-type");
        userNode.className = `username-${userNode.innerText}`;
    }
};

const addObserverToUserProcessor = outerNode => {
    const userChangeProcessor = innerNode => {
        const parent = innerNode.parentNode.parentNode;
        const userNode = parent.querySelector(":scope > span:last-of-type");
        if (parent.querySelector('[class*="username-"]') === null) {
            userNode.className = `username-${userNode.innerText}`;
        }
    };

    const userObserver = new MutationObserver(
        createProcessor([userChangeProcessor])
    );

    outerNode = outerNode.querySelector("span");
    userObserver.observe(outerNode, { childList: true });
};

const orderedMsgProcessors = [
    addUsernameToMsgProcessor,
    manageInlineEmbedsProcessor,
    newMsgTabAlertProcessor,
    addImgOrVideoProcessor,
    scrollMsgBufferToBottom,
];

const orderedVideoProcessors = [addUsernameToVideoProcessor];

const orderedUserlistProcessors = [
    addClassToUserlistProcessor,
    addObserverToUserProcessor,
];

const runAllProcessors = () => {
    msgBuffer.childNodes.forEach(n => {
        for (let i = 0; i < orderedMsgProcessors.length; i++) {
            orderedMsgProcessors[i](n);
        }
    });

    videoBuffer.childNodes.forEach(n => {
        for (let i = 0; i < orderedVideoProcessors.length; i++) {
            orderedVideoProcessors[i](n);
        }
    });

    userList.childNodes.forEach(n => {
        for (let i = 0; i < orderedUserlistProcessors.length; i++) {
            orderedUserlistProcessors[i](n);
        }
    });
};

const initVisibilityListener = () => {
    const visiblityData = getVisibilityData();
    if (visiblityData !== undefined) {
        document.addEventListener(visiblityData.visibilityEvent, () => {
            if (!document[visiblityData.hidden] && newMsgInterval) {
                clearInterval(newMsgInterval);
                newMsgInterval = undefined;
                document.title = "geoffkeighleysroom";
            }
        });
    }
};

// eslint-disable-next-line no-unused-vars
const initScript = (() => {
    initCustomCSS();
    initCustomUserSettings();

    runAllProcessors();

    initVisibilityListener();

    const msgObserver = new MutationObserver(
        createProcessor(orderedMsgProcessors)
    );
    const videoObserver = new MutationObserver(
        createProcessor(orderedVideoProcessors)
    );
    const userlistObserver = new MutationObserver(
        createProcessor(orderedUserlistProcessors)
    );

    msgObserver.observe(msgBuffer, { childList: true });
    videoObserver.observe(videoBuffer, { childList: true });
    userlistObserver.observe(userList, { childList: true });

    // eslint-disable-next-line no-unused-vars
    const initLargeImageArea = (() => {
        const imgPreviewClass = "image-preview";
        if (document.querySelector(`.${imgPreviewClass}`) === null) {
            const imgPreviewContainer = document.createElement("div");
            imgPreviewContainer.classList.add(imgPreviewClass);
            imgPreviewContainer.classList.add("hidden");
            imgPreviewContainer.onclick = () => {
                imgPreviewContainer.classList.add("hidden");
            };

            const previewImage = document.createElement("img");
            imgPreviewContainer.appendChild(previewImage);

            document.addEventListener("keydown", e => {
                if (
                    e.key === "Escape" &&
                    !imgPreviewContainer.classList.contains("hidden")
                ) {
                    imgPreviewContainer.classList.add("hidden");
                }
            });

            document.body.appendChild(imgPreviewContainer);
        }
    })();
})();
