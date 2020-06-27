// Create way to send "server" messages (used for everything)
// /video
// -> pauses / play video with lead (admin/mod only)
// /spin
// -> spin whatever shows to the right
// /scroll
// -> scroll whatever shows to the right
// /gif improvements
// -> pagination (scroll to bottom, load next page)
// -> add query to gifNode.title (not sure how, don't want to send JSON again)

import { runSetup } from "./setup";
import {
    createProcessorsFromList,
    initRunProcessors,
} from "./processors/utility";
import {
    addUsernameToMsgProcessor,
    manageInlineEmbedsProcessor,
    newMsgTabAlertProcessor,
    addImgOrVideoProcessor,
    scrollBufferOnMsgSentProcessor,
    modifyStandardMsgCmdProcessor,
} from "./processors/messages/processors";
import { addUsernameToVideoProcessor } from "./processors/videos/processors";
import {
    addClassToUserlistProcessor,
    addObserverToUserProcessor,
} from "./processors/users/processors";
import { msgBuffer, videoBuffer, userList } from "./constants";

const orderedMsgProcessors = [
    addUsernameToMsgProcessor,
    manageInlineEmbedsProcessor,
    newMsgTabAlertProcessor,
    addImgOrVideoProcessor,
    scrollBufferOnMsgSentProcessor,
    modifyStandardMsgCmdProcessor,
];

const orderedVideoProcessors = [addUsernameToVideoProcessor];

const orderedUserlistProcessors = [
    addClassToUserlistProcessor,
    addObserverToUserProcessor,
];

// eslint-disable-next-line no-unused-vars
const initScript = (() => {
    runSetup();

    initRunProcessors({
        messages: orderedMsgProcessors,
        videos: orderedVideoProcessors,
        users: orderedUserlistProcessors,
    });

    const msgObserver = new MutationObserver(
        createProcessorsFromList(orderedMsgProcessors)
    );
    const videoObserver = new MutationObserver(
        createProcessorsFromList(orderedVideoProcessors)
    );
    const userlistObserver = new MutationObserver(
        createProcessorsFromList(orderedUserlistProcessors)
    );

    msgObserver.observe(msgBuffer, { childList: true });
    videoObserver.observe(videoBuffer, { childList: true });
    userlistObserver.observe(userList, { childList: true });
})();
