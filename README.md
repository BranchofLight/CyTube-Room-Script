# CyTube Room Script

This script adds functionality to any CyTube video room.

## Feature List
- Usernames are displayed on all sent messages for easier identification.
- Usernames displayed beside videos to identify who added what.
- Embedded images with large sized previews.
- Custom colour mappings for any registered users.
- Dice rolling of any side amount.
- Ability to add custom "bot"/server messages.
- Ability to add a banner image to your room.
- Customize CSS in JS file to avoid managing multiple files.
- Skip videos and toggle lead via keyboard commands.
- Much more in progress.

## Installation
1. Go to a channel page where you have script permissions.
2. Click 'Channel Settings'.
3. Click 'Edit' dropdown.
4. Select 'Javascript' from the dropdown.
5. Paste the script in the text area provided.
6. Click 'Save JS'.

## Usage

| Keyword | Options | Description                                                 | Example                              |
| ------- | ------- | ----------------------------------------------------------- | ------------------------------------ |
| 'img    | URL     | Embeds an image in the chat window. Click image to enlarge. | 'img https://i.imgur.com/FaMUWvF.jpg |
| 'roll   | Number  | Rolls a die with a number of sides equal to input given.    | 'roll 6                              |
| 'skip   |         | A mod and admin tool to skip the current video.             | 'skip                                |
| 'lead   |         | Takes or removes lead on yourself. Mod / admin only.        | 'lead                                |
| 'video  |         | Pauses or plays the video (toggle). Mod / admin only.       | 'video                               |
