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
    return document
        .querySelector("#welcome")
        .innerText.split(" ")
        .getLastItem();
};

export const roomName = "geoffkeighleysroom";

export const getCustomCSSNode = () => {
    return document.head.querySelector(".custom-css");
};

export const newMessageEventString = "NewMessage";

export const msgBuffer = document.querySelector("#messagebuffer");
export const videoBuffer = document.querySelector(".videolist#queue");
export const userList = document.querySelector("#userlist");
