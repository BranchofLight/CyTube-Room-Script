import { apiConfig } from "./constants";
import { getImgNode, getMediaNode } from "../../utility";
import { msgBuffer, msgInput } from "../../constants";

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

    // While there remain elements to shuffle...
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

// Proposed change:
// - When user spawns a gif, generate it below the chat
// - Once added, can send it to channel
// - Prevents scrolling affecting gif selection
// - Can overwrite gif area with newest term search if user searches again without confirm/cancel on previous
// - Larger area, can show better preview
// - Can provide search bar (1000 requests per day, this isn't an issue for num of users)
// - Down the road could paginate
// - Still shuffle? Shuffle pages down the road?
export const getGifSelectDialogNode = gifsList => {
    gifsList = shuffleList(gifsList);

    const wrapper = document.createElement("span");

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

    const gifContainer = document.createElement("div");
    gifContainer.classList.add("gif-container");

    const gifNode = getImgNode(gifsList[0].images.original.url);

    gifContainer.appendChild(gifNode);

    container.appendChild(gifContainer);
    container.appendChild(nextButton);

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.innerText = "Cancel";
    cancelButton.addEventListener("click", () => {
        wrapper.parentNode.remove();
    });

    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm-button");
    confirmButton.innerText = "Confirm";
    confirmButton.addEventListener("click", () => {
        // let newNode = getMediaNode();
        // newNode.appendChild(gifNode);
        // container.parentNode.replaceChild(newNode, container);
        wrapper.parentNode.remove();
        sendMsgViaChat(gifsList[gifsListIndex].images.original.url);
    });

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    btnContainer.appendChild(cancelButton);
    btnContainer.appendChild(confirmButton);

    container.appendChild(btnContainer);
    wrapper.appendChild(container);
    wrapper.style.display = "inline-block";

    return wrapper;
};

export const getGifSelectNode = term => {
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
                                console.log(data);
                                if (data.length > 0) {
                                    resolve(getGifSelectDialogNode(data));
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
