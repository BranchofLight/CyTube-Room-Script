export const userConfig = [
    {
        username: "geoffkeighley",
        colour: "#71b3ff",
    },
    {
        username: "sadweeaboo2",
        colour: "#e6b423",
    },
    {
        username: "Fitzthistlewits",
        colour: "#a83fff",
    },
    {
        username: "Eshnuz",
        colour: "#f7ff00",
    },
];

export const getCurrentUsername = () => {
    const usernameNode = document.querySelector("#welcome");
    return usernameNode !== null
        ? usernameNode.innerText.split(" ").getLastItem()
        : undefined;
};

export const roomName = "geoffkeighleysroom";

export const getCustomCSSNode = () => {
    return document.head.querySelector(".custom-css");
};

export const newMessageEventString = "NewMessage";

export const msgBuffer = document.querySelector("#messagebuffer");
export const videoBuffer = document.querySelector(".videolist#queue");
export const userList = document.querySelector("#userlist");

export const msgInput = document.querySelector("#chatline");

export const gifSearchResultsClass = "gif-results-container";
export const gifErrorMsgClass = "gif-error-msg";

export const getGifSearchNode = () => {
    return document.querySelector(`.${gifSearchResultsClass}`);
};
export const getGifErrorMsgNode = () => {
    return getGifSearchNode().querySelector(`.${gifErrorMsgClass}`);
};
