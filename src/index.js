/**
 * TODO
 * /gif ->
 *      => capture each keydown (verify its a character if possible) in a string
 *      => when ENTER is pressed, check if it has commands
 *      => process commands
 *      => never have to do this from msg buffer this way
 * Integrate webpack for bundling and minifying ONLY (use prettier watch, eslint vscode extension)
 * Break out code into other files (processors, utility, or whatever makes sense)
 * /video -> take lead (if don't already have it), pause video (admin / mod only)
 *        => can I do this with the youtube api directly? or simulate click?
 **/

// gif ideas:
// -> embed a block that allows you to ask for new gif before committing (ala Slack)
//    -> use visual notifications of confirmed / not confirmed gifs

// /gif term
// -> search gif api for term
// Create way to send "server" messages (used for everything)
// /video
// -> pauses / play video with lead (admin/mod only)
// /spin
// -> spin whatever shows to the right
// /scroll
// -> scroll whatever shows to the right

import { runSetup } from "./setup";
import {
    createProcessorsFromList,
    runAllProcessors,
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

    runAllProcessors({
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
