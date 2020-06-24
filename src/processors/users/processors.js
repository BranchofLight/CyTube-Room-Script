import { createProcessorsFromList } from "../utility";

export const addClassToUserlistProcessor = node => {
    if (node.querySelector('[class*="username-"]') === null) {
        const userNode = node.querySelector(":scope > span:last-of-type");
        userNode.className = `username-${userNode.innerText}`;
    }
};

export const addObserverToUserProcessor = outerNode => {
    const userChangeProcessor = innerNode => {
        const parent = innerNode.parentNode.parentNode;
        const userNode = parent.querySelector(":scope > span:last-of-type");
        if (parent.querySelector('[class*="username-"]') === null) {
            userNode.className = `username-${userNode.innerText}`;
        }
    };

    const userObserver = new MutationObserver(
        createProcessorsFromList([userChangeProcessor])
    );

    outerNode = outerNode.querySelector("span");
    userObserver.observe(outerNode, { childList: true });
};
