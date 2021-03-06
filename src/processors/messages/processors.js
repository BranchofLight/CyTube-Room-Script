import {
    isNodeServerMsg,
    getImgNode,
    getMediaNode,
    getVideoNode,
    replaceMsgWithNode,
    scrollMsgBufferToBottom,
} from "../../utility";
import { getCurrentUsername, newMessageEventString } from "../../constants";
import {
    makeGifSearchRequest,
    updateGifSearchResults,
    addFeatureNotImplementedNode,
    doesMsgContainImg,
    doesMsgContainVideo,
    addErrorMsgToGifArea,
} from "./utility";
import { whitelistedActions, largeEmotes } from "./constants";

export const addUsernameToMsgProcessor = node => {
    if (!isNodeServerMsg(node) && node.querySelector(".username") === null) {
        const username = node.className.split("-").getLastItem();
        const usernameNode = document.createElement("span");
        usernameNode.innerHTML = `<strong class="username">${username}: </strong>`;
        node.insertBefore(usernameNode, node.querySelector("span:last-child"));
    }
};

export const manageInlineEmbedsProcessor = (node, isInitRun = false) => {
    const msgNode = node.querySelector(":scope > span:last-of-type");
    const msgUsername = node.className.split("-").getLastItem();

    // NOTE: temporary binder twine to prevent other users from using experimental features
    if (!isNodeServerMsg(node)) {
        const message = msgNode.innerText;
        const action = message.split(" ")[0];

        if (whitelistedActions.includes(action)) {
            const startParse = message.lastIndexOf(action);
            const param = message.slice(startParse + action.length).trim();

            switch (action) {
                case "/gif":
                    if (!isInitRun && msgUsername === getCurrentUsername()) {
                        makeGifSearchRequest(param)
                            .then(gifListData => {
                                updateGifSearchResults(gifListData);
                            })
                            .catch(({ err }) => {
                                addErrorMsgToGifArea(err);
                            });
                    }

                    node.classList.add("hidden");

                    break;
                default:
                    addFeatureNotImplementedNode(action);
            }
        }
    }
};

export const addImgOrVideoProcessor = node => {
    const msgNode = node.querySelector(":scope > span:last-of-type");
    if (msgNode !== null && !isNodeServerMsg(node)) {
        const message = msgNode.innerText;

        // Simple Regex Check
        if (doesMsgContainVideo(message)) {
            const container = getMediaNode();
            container.appendChild(getVideoNode(message));
            replaceMsgWithNode(msgNode, container);
        } else {
            // Regex + preload attempt (if needed)
            // Requires callback
            doesMsgContainImg(message, () => {
                const container = getMediaNode();
                container.appendChild(getImgNode(message));
                replaceMsgWithNode(msgNode, container);
            });
        }
    }
};

export const scrollBufferOnMsgSentProcessor = () => {
    // Tagging for feature improvement consideration
    // Eg. you can "break free" of new message scroll lock
    scrollMsgBufferToBottom();
};

export const newMsgTabAlertProcessor = () => {
    window.dispatchEvent(new Event(newMessageEventString));
};

export const modifyStandardMsgCmdProcessor = node => {
    node.querySelectorAll("img").forEach(imgNode => {
        if (imgNode !== null && largeEmotes.includes(imgNode.title)) {
            const container = getMediaNode();
            const newImgNode = getImgNode(imgNode.src);

            newImgNode.classList.add("image-msg", "big-emote");

            container.appendChild(newImgNode);
            imgNode.parentNode.replaceChild(container, imgNode);
        }
    });
};
