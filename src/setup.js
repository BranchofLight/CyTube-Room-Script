import { addCSS, getVisibilityData } from "./utility";
import {
    userConfig,
    getCustomCSSNode,
    newMessageEventString,
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
    window.addEventListener(newMessageEventString, () => {
        if (!document[visiblityData.hidden] && newMsgInterval) {
            clearInterval(newMsgInterval);
            newMsgInterval = undefined;
            document.title = "geoffkeighleysroom";
        }
    });
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
};
