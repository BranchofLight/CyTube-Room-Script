import {
    isNodeServerMsg,
    getImgNode,
    appendMsgNodeToBuffer,
    getMediaNode,
    getVideoNode,
    replaceMsgWithNode,
} from "../../utility";
import { currentUsername, newMessageEventString } from "../../constants";
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
                    if (msgUsername === currentUsername) {
                        getGifSelectNode(param).then(node => {
                            appendMsgNodeToBuffer(node);
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

export const newMsgTabAlertProcessor = () => {
    window.dispatchEvent(new Event(newMessageEventString));
};
