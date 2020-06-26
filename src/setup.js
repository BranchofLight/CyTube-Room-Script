import { addCSS, getVisibilityData } from "./utility";
import {
    userConfig,
    getCustomCSSNode,
    newMessageEventString,
    roomName,
    gifSearchResultsClass,
} from "./constants";
import MAIN_CSS from "to-string-loader!css-loader!sass-loader!../style/index.scss";

const initLargeImageArea = () => {
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
};

const initCustomCSS = () => {
    const customCssInHead = getCustomCSSNode();
    if (customCssInHead === null) {
        const customStyleTag = document.createElement("style");
        customStyleTag.classList.add("custom-css");
        document.head.appendChild(customStyleTag);
    } else {
        customCssInHead.innerText = "";
    }
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

    addCSS(MAIN_CSS);
};

const initVisibilityListener = () => {
    let newMsgInterval = undefined;
    const visiblityData = getVisibilityData();
    if (visiblityData !== undefined) {
        window.addEventListener(newMessageEventString, () => {
            if (
                document[visiblityData.hidden] &&
                newMsgInterval === undefined
            ) {
                newMsgInterval = setInterval(() => {
                    if (document.title === roomName) {
                        document.title = "New Message!";
                    } else {
                        document.title = roomName;
                    }
                }, 500);
            }
        });

        window.addEventListener(visiblityData.visibilityEvent, () => {
            if (!document[visiblityData.hidden]) {
                clearInterval(newMsgInterval);
                newMsgInterval = undefined;
                document.title = roomName;
            }
        });
    }
};

const initGifResultsArea = () => {
    const container = document.querySelector("#leftpane-inner");
    container.classList.remove("row");

    const gifContainer = document.createElement("div");
    gifContainer.classList.add(gifSearchResultsClass, "hidden");

    container.insertBefore(
        gifContainer,
        container.querySelector(":scope > *:first-child")
    );
};

const initMisc = () => {
    Array.prototype.getLastItem = function () {
        return this[this.length - 1];
    };
};

export const runSetup = () => {
    initMisc();
    initLargeImageArea();
    initCustomCSS();
    initCustomUserSettings();
    initVisibilityListener();
    initGifResultsArea();
};
