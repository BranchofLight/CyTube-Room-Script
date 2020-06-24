import {
    isNodeServerMsg,
    getImgNode,
    appendMsgNodeToBuffer,
    getMediaNode,
    getVideoNode,
    replaceMsgWithNode,
} from "../../utility";
import { getCurrentUsername, newMessageEventString } from "../../constants";
import {
    getGifSelectNode,
    addFeatureNotImplementedNode,
    doesMsgContainImg,
    doesMsgContainVideo,
} from "./utility";
import { whitelistedActions } from "./constants";

export const addUsernameToMsgProcessor = node => {
    if (!isNodeServerMsg(node) && node.querySelector(".username") === null) {
        const username = node.className.split("-").getLastItem();
        const usernameNode = document.createElement("span");
        usernameNode.innerHTML = `<strong class="username">${username}: </strong>`;
        node.insertBefore(usernameNode, node.querySelector("span:last-child"));
    }
};

export const manageInlineEmbedsProcessor = node => {
    const msgNode = node.querySelector(":scope > span:last-of-type");
    const msgUsername = node.className.split("-").getLastItem();

    if (!isNodeServerMsg(node)) {
        const message = msgNode.innerText;
        const action = message.split(" ")[0];

        if (whitelistedActions.includes(action)) {
            const startParse = message.lastIndexOf(action);
            const param = message.slice(startParse + action.length).trim();

            switch (action) {
                case "/gif":
                    if (msgUsername === getCurrentUsername()) {
                        getGifSelectNode(param).then(node => {
                            replaceMsgWithNode(node);
                            msgNode.remove();
                        });
                    }
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

export const newMsgTabAlertProcessor = () => {
    window.dispatchEvent(new Event(newMessageEventString));
};
