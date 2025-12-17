// ==UserScript==
// @name         Hide potz-badge elements
// @namespace    http://tampermonkey.net/
// @version      2025-12-17
// @description  Hides all elements with class "potz-badge"
// @author       @proximitron
// @match        https://9gag.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=9gag.com
// @downloadURL  https://raw.githubusercontent.com/Proximitron/Tampermonkey/main/hide-potz-badge.user.js
// @updateURL    https://raw.githubusercontent.com/Proximitron/Tampermonkey/main/hide-potz-badge.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==


(function () {
    'use strict';

    function hideBadges(root = document) {
        const elements = root.querySelectorAll('.potz-badge');
        for (const el of elements) {
            el.style.display = 'none';
        }
    }

    // Hide already existing elements
    hideBadges();

    // Observe future DOM changes
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;

                if (node.matches?.('.potz-badge')) {
                    node.style.display = 'none';
                }

                if (node.querySelectorAll) {
                    hideBadges(node);
                }
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
