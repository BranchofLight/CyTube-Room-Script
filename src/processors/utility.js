import { msgBuffer, videoBuffer, userList } from "../constants";

export const createProcessorsFromList = listOfProcessors => {
    return mutationsList => {
        for (let mutation of mutationsList) {
            mutation.addedNodes.forEach(n => {
                for (let i = 0; i < listOfProcessors.length; i++) {
                    listOfProcessors[i](n);
                }
            });
        }
    };
};

/**
 *
 * @param {Object} processors A config of processors
 *** @key {messages[]} Required. Ordered list of "new message" processors.
 *** @key {videos[]} Required. Ordered list of "new video" processors.
 *** @key {users[]} Required. Ordered list of "new user in userlist" processors.
 */
export const initRunProcessors = processors => {
    msgBuffer.childNodes.forEach(n => {
        for (let i = 0; i < processors.messages.length; i++) {
            processors.messages[i](n, true);
        }
    });

    videoBuffer.childNodes.forEach(n => {
        for (let i = 0; i < processors.videos.length; i++) {
            processors.videos[i](n, true);
        }
    });

    userList.childNodes.forEach(n => {
        for (let i = 0; i < processors.users.length; i++) {
            processors.users[i](n, true);
        }
    });
};
