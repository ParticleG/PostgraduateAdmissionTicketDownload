// ==UserScript==
// @name            浙江省考研准考证下载
// @namespace       http://tampermonkey.net/
// @version         0.1
// @description     try to take over the world!
// @author          Particle_G
// @include         https://yz.chsi.com.cn/apply/kscx/kscx.do*
// @icon            https://www.google.com/s2/favicons?domain=chsi.com.cn
// @grant		    GM_addElement
// @grant		    GM_log
// @grant		    GM_xmlhttpRequest
// @grant		    window.close
// @run-at		    document-start
// ==/UserScript==

(async function () {
    await injectButton();
})();

async function injectButton() {
    await waitUntilDocumentReady();
    addElement(
        "button",
        `<span>提前下载准考证</span>`,
        {
            className: "ivu-btn ivu-btn-primary ivu-btn-large",
            onclick: () => { download(); }
        },
        document.querySelector(".yzwb-loading-btn").parentNode
    );
}

function download() {
    let scripts = document.querySelectorAll("script");
    let locationScript = scripts[scripts.length - 2].innerText;
    eval(locationScript.substring(locationScript.indexOf("location"), locationScript.indexOf(`");`) + 3));
}

/**
 * 向指定 父元素 中添加 子元素
 * @param {String} tagName 子元素标签名称
 * @param {String} innerHTML 子元素的内容
 * @param {Object} options 子元素的属性
 * @param {HTMLElement} parentNode 父元素，默认为 body
 */
function addElement(tagName, innerHTML = "", options = {}, parentNode = document.body) {
    const el = document.createElement(tagName);
    el.innerHTML = innerHTML;
    Object.assign(el, options);
    parentNode.appendChild(el);
}

async function waitUntilDocumentReady() {
    let isReady = false;
    do {
        isReady = document.readyState == "complete" && document.querySelector(".yzwb-loading-btn");
        await sleep(100);
    } while (!isReady);
    GM_log("Document is ready!");
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}