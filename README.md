# Timeout :alarm_clock: :no_entry_sign: :clock1:

![Timeout Chrome Extension](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/479/306/datas/gallery.jpg)

Theme: "Automation and Optimization". 

Optimize your time on the web with Timeout. A Chrome Extension that locally blocks a website for a specified amount of time.

[Devpost](https://devpost.com/software/timeout-1p7y8t)

[Download on Chrome Web Store](https://chrome.google.com/webstore/detail/timeout/kdpkkmnahkcfdmaajglmfoemcokbeoad)

## My contribution
I worked on integrating the timer into the webpage - `insert.js`, once the user created a timeout in our extension.

## Inspiration
Many people find it difficult to study when having the distraction of Facebook, YouTube, online games, etc... and we thought there should be an easy way to block these sites for different periods of time.

## What it does
Timeout allows you to set specific blocks on any website by specifying the start time, affected website, and duration of the block. Any current tabs that are open for that website are instantly blocked with a timer specifying how long until the ban is lifted. If you go to the site on a new tab or current tab, the same system applies.

All "Timeouts" or blocks are synced across all your Chrome devices on your Google accounts and across Chrome restarts.

## How to run

1. Visit `chrome://extensions` in your browser.
2. Ensure that the Developer mode checkbox in the top right-hand corner is checked.
3. Click **Load unpacked extension…** to pop up a file-selection dialog.
4. Navigate to the directory in which your extension files live, and select it (select the entire folder).

Alternatively, you can drag and drop the directory where your extension files live onto `chrome://extensions` in your browser to load it.

If the extension is valid, it'll be loaded up and active right away! If it's invalid, an error message will be displayed at the top of the page. Correct the error, and try again.

## How we built it
Since this is a Chrome extension, it is completely built in JavaScript/HTML/CSS. We used the Bootstrap CSS framework and Datetime/Duration picker libraries. Timeouts are saved to `sync` Chrome storage (fallback onto `local` if the user isn't signed into a Google account).

There is a background script that continually checks the current timeouts in storage and communicates to affected tabs with new duration information. Each tab has an injected content script on behalf of the extension in order to communicate with the events that `background.js` sends.

## Challenges we ran into
There were a couple issues regarding the asynchronous nature of JavaScript. At times, some events to specific tabs simply disappear.

## Accomplishments that we're proud of
This was mostly a learning experience for most members of the group to expose them to web technologies and Chrome's APIs. The extension is fully functional, and we hope to squish bugs, add features, and improve it's performance in the future.

## What we learned
* Web technologies
* HTML/CSS/JS
* Chrome Extension APIs

## What's next for Timeout
* Fix event handling bugs
* Improve blocking page functionality
* Update the JS codebase to use more ES6 syntax
* Allow importing calendars to auto block

## Built With
`javascript` `bootstrap`
