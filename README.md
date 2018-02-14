# CyTube Room Script

This script adds functionality to any CyTube video room.

## Feature List
- Usernames are displayed on all sent messages for easier identification.
- Usernames displayed beside videos to identify who added what.
- Embedded images with large sized previews.
- Giphy API integration allowing auto gif embedding.
- Custom colour mappings for any registered users.
- Dice rolling of any side amount.
- Ability to add custom "bot"/server messages.
- Ability to add a banner image to your room.
- Customize CSS in JS file to avoid managing multiple files.
- Skip videos, pause, play and toggle lead via keyboard commands.
- Spin images, text or gifs.
- Framework for implementing custom features requiring synchronized information between users without a server. 
- Much more in progress.

## Installation
### Automatic Updates
1. Go to a channel page where you have script permissions.
2. Click 'Channel Settings'.
3. Click 'Admin Settings'.
4. Paste the following link into the 'External Javascript' input: https://cdn.rawgit.com/BranchofLight/CyTube-Room-Script/master/cytubescript.js
5. Click 'Close'.

This will provide automatic updates to your room without having to manually update the script. Note that updates may take time to be reflected to users. Neither rawgit or I guarantee uptime or compatibility in a room especially one with users using different cached script versions.

### ~~Manual Updates~~
1. ~~Go to a channel page where you have script permissions.~~
2. ~~Click 'Channel Settings'.~~
3. ~~Click 'Edit' dropdown.~~
4. ~~Select 'Javascript' from the dropdown.~~
5. ~~Paste the script in the text area provided.~~
6. ~~Click 'Save JS'.~~

~~This method requires you to come back here for newer version of the script as desired. Clicking 'commits' at the top of the main script page will allow you to check for a version that works best for your needs if necessary.~~

The script is now too large to support this feature. However it will still work with older and smaller versions of the script which you can navigate to at the top with 'Commits'. This is a limitation given by cy.tube and the only current solutions are to minify (advanced) or use automatic updates (recommended).

## Usage

| Keyword | Options | Description                                                                            | Example                              |
| ------- | ------- | -------------------------------------------------------------------------------------- | ------------------------------------ |
| 'img    | URL     | Embeds an image in the chat window. Click image to enlarge.                            | 'img https://i.imgur.com/FaMUWvF.jpg |
| 'roll   | Number  | Rolls a die with a number of sides equal to input given.                               | 'roll 6                              |
| 'skip   |         | A mod and admin tool to skip the current video.                                        | 'skip                                |
| 'lead   |         | Takes or removes lead on yourself. Mod / admin only.                                   | 'lead                                |
| 'video  |         | Pauses or plays the video. Auto-leads. Mod / admin only.                               | 'video                               |
| 'gif    | Query   | Queries Giphy API and embeds a random result.                                          | 'gif hello                           |
| 'spin   | Message | Spins the given content. Only supports 'img, /emote, 'gif and text. No mixed content.  | 'spin /duane                         |
