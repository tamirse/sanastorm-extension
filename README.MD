## SANASTORM

This chrome extension displays cases, conjugations and translations of selected finnish words.
---

## Download & Install
To install the extension on the browser [go to the web store](https://chrome.google.com/webstore/detail/jfbkejnfndcehkilemfmmpjjdceefghe/publish-accepted)
<br>
<br>
To download the source code clone from this repositery.<br>
After cloning, run ```npm install``` to download dependencies.

## Develop
We use "Webpack Extension Reloader" to automatically load the extension in the browser.

use ```npm start``` to run webpack on watch mode which will update the extension on every change.

## Build
to build, use ```npm run zip``` - this will call webpack to bundle the files and then zip them into sanastorm.zip
