import {
    getCustomCSSNode,
    msgBuffer,
    getCurrentUsername,
    getGifSearchNode,
    getGifErrorMsgNode,
} from "./constants";

export const addCSS = cssString => {
    getCustomCSSNode().innerText =
        getCustomCSSNode().innerText + " " + cssString;
};

export const isNodeServerMsg = node => {
    return node.className.includes("server-msg");
};

export const scrollMsgBufferToBottom = () => {
    msgBuffer.scrollTop = msgBuffer.scrollHeight;
};

export const getServerMsgNode = (msgText, colour) => {
    const container = document.createElement("div");
    container.classList.add("server-msg-reconnect");
    container.innerText = msgText;
    container.style.color = colour;

    return container;
};

export const getMediaNode = () => {
    const container = document.createElement("div");
    container.classList.add("media-container");

    return container;
};

export const getImgNode = imgSrc => {
    const newNode = document.createElement("img");
    newNode.src = imgSrc;
    newNode.classList.add("image-msg");
    newNode.classList.add("media-msg");

    newNode.onclick = () => {
        document.querySelector(".image-preview img").src = newNode.src;
        document.querySelector(".image-preview").classList.remove("hidden");
    };
    newNode.onload = scrollMsgBufferToBottom;

    return newNode;
};

export const getVideoNode = videoSrc => {
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

/**
 * @param {object | string} msg Can be a DOM element or text string. Will be appended to message buffer.
 * @returns {null} returns null if msg isn't a node or text string, otherwise does not explicitly return
 **/
export const appendMsgNodeToBuffer = msg => {
    const msgSpan = document.createElement("span");
    msgSpan.style.display = "inline-block";
    if (typeof msg === "object" && msg.innerHTML !== undefined) {
        msgSpan.appendChild(msg);
    } else if (typeof msg === "string") {
        msgSpan.innerText = msg;
    } else {
        return null;
    }

    const container = document.createElement("div");
    container.classList.add(`chat-msg-${getCurrentUsername()}`);

    const timestamp = document.createElement("span");
    timestamp.classList.add("timestamp");
    const dateTime = new Date();
    // Whitespace on end is expected
    timestamp.innerText = `[${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}] `;

    const usernameSpan = document.createElement("span");
    const usernameStrong = document.createElement("strong");
    // Whitespace on end is expected
    usernameStrong.innerText = `${getCurrentUsername()}: `;
    usernameStrong.classList.add("username");

    usernameSpan.appendChild(usernameStrong);

    container.appendChild(timestamp);
    container.appendChild(usernameSpan);
    container.appendChild(msgSpan);

    msgBuffer.appendChild(container);
};

export const getVisibilityData = () => {
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

export const replaceMsgWithNode = (msgNode, newNode) => {
    msgNode.parentNode.replaceChild(newNode, msgNode);
};

export const showGifError = () => {
    const errorMsgNode = getGifErrorMsgNode();
    if (errorMsgNode.classList.contains("hidden")) {
        errorMsgNode.classList.remove("hidden");
    }
};

const hideGifError = () => {
    const errorMsgNode = getGifErrorMsgNode();
    if (!errorMsgNode.classList.contains("hidden")) {
        errorMsgNode.classList.add("hidden");
    }
};

export const showGifSearchResults = () => {
    const container = getGifSearchNode();
    if (container.classList.contains("hidden")) {
        container.classList.remove("hidden");
    }
};

export const hideGifSearchResults = () => {
    const container = getGifSearchNode();
    if (!container.classList.contains("hidden")) {
        container.classList.add("hidden");
    }

    hideGifError();
};
