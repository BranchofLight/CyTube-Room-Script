import { apiConfig } from "./constants";
import {
    showGifSearchResults,
    hideGifSearchResults,
    showGifError,
    hideGifError,
    clearGifSearchResults,
} from "../../utility";
import {
    msgInput,
    getGifSearchNode,
    getGifErrorMsgNode,
} from "../../constants";

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

const shuffleList = list => {
    let currentIndex = list.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = list[currentIndex];
        list[currentIndex] = list[randomIndex];
        list[randomIndex] = temporaryValue;
    }

    return list;
};

const sendMsgViaChat = msg => {
    msgInput.value = msg;
    const enterKeyEvent = new Event("keydown");
    enterKeyEvent.keyCode = 13;

    msgInput.dispatchEvent(enterKeyEvent);
};

const getGifResultNode = gif => {
    const container = document.createElement("div");
    container.classList.add("gif-search-result");

    const gifNode = document.createElement("img");
    gifNode.src = gif.images.original.url;
    container.addEventListener("click", () => {
        sendMsgViaChat(gifNode.src);
        hideGifSearchResults();
        msgInput.focus();
    });

    container.appendChild(gifNode);
    return container;
};

export const updateGifSearchResults = gifList => {
    const resultsContainer = getGifSearchNode().querySelector(".results");

    clearGifSearchResults();

    for (let i = 0; i < gifList.length; i++) {
        resultsContainer.appendChild(getGifResultNode(gifList[i]));
    }

    hideGifError();
    showGifSearchResults();
    resultsContainer.scrollTop = 0;
};

export const addErrorMsgToGifArea = errMsg => {
    const errorMsgNode = getGifErrorMsgNode();
    errorMsgNode.innerText = errMsg;
    if (errorMsgNode.classList.contains("hidden")) {
        errorMsgNode.classList.remove("hidden");
    }

    clearGifSearchResults();
    showGifError();
    showGifSearchResults();
};

export const makeGifSearchRequest = term => {
    return new Promise((resolve, reject) => {
        if (term.length > 0) {
            fetch(
                `https://${apiConfig.baseURL}?api_key=${
                    apiConfig.apiKey
                }&q=${encodeURIComponent(term)}`
            )
                .then(res => {
                    if (res.status !== 200) {
                        reject({
                            err: "Server error: " + res.status,
                        });
                    } else {
                        res.json()
                            .then(({ data }) => {
                                if (data.length > 0) {
                                    resolve(shuffleList(data));
                                } else {
                                    reject({
                                        err: "No results for given search term",
                                    });
                                }
                            })
                            .catch(err => {
                                reject({ err });
                            });
                    }
                })
                .catch(err => {
                    reject({
                        err: "API call was not sent correctly: " + err,
                    });
                });
        } else {
            reject({
                err: "Param length is 0",
            });
        }
    });
};

export const addFeatureNotImplementedNode = action => {
    const testNode = document.createElement("div");
    testNode.classList.add("gif");
    testNode.innerText = "HELLO " + action;
    return testNode;
};

export const doesMsgContainImg = (msg, onSuccess) => {
    const protocolMatch = msg.match(/^https:\/\/\S*/i);
    if (
        protocolMatch !== null &&
        protocolMatch.length === 1 &&
        protocolMatch[0] === msg
    ) {
        const image = new Image();
        image.onload = onSuccess;
        image.src = msg;
    }
};

export const doesMsgContainVideo = msg => {
    const urls = msg.match(/.*\.(?:webm|mp4)/i);
    return urls !== null && urls.length === 1 && urls[0] === msg;
};
