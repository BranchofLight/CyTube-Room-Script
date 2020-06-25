import { apiConfig } from "./constants";
import { getImgNode, getMediaNode } from "../../utility";

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

export const getGifSelectDialogNode = gifsList => {
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
        container.parentNode.parentNode.remove();
    });

    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm-button");
    confirmButton.innerText = "Confirm";
    confirmButton.addEventListener("click", () => {
        let newNode = getMediaNode();
        newNode.appendChild(gifNode);
        container.parentNode.replaceChild(newNode, container);
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
