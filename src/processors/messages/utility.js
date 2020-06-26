import { apiConfig } from "./constants";
import { showGifSearchResults, hideGifSearchResults } from "../../utility";
import { msgInput, getGifSearchArea } from "../../constants";

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
    });

    container.appendChild(gifNode);
    return container;
};

// Proposed change:
// - When user fires a /gif search, generate results below the chat
// - Once added, can send it to channel
// - Prevents scrolling affecting gif selection
// - Can overwrite gif area with newest term search if user searches again without confirm/cancel on previous
// - Larger area, can show better preview
// - Can provide search bar (1000 requests per day, this isn't an issue for num of users)
// - Down the road could paginate
// - Still shuffle? Shuffle pages down the road?
export const updateGifSearchResults = gifList => {
    const resultsContainer = getGifSearchArea().querySelector(".results");
    resultsContainer.innerHTML = "";

    for (let i = 0; i < gifList.length; i++) {
        resultsContainer.appendChild(getGifResultNode(gifList[i]));
    }

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
