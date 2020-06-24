export const addUsernameToVideoProcessor = node => {
    if (node.querySelector('span[class*="video-added-by"]') === null) {
        const username = node.title.split(" ").getLastItem();
        const nameSpan = document.createElement("span");
        nameSpan.className = `video-added-by-${username}`;
        nameSpan.innerHTML = `Added by <strong>${username}</strong>`;
        node.insertBefore(nameSpan, node.querySelector("span"));
    }
};
