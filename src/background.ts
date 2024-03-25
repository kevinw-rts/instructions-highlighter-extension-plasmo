import tldr from "wikipedia-tldr"

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: "Quick Wiki Lookup for \"%s\"",
        contexts: ["selection"],
        id: "ihContextMenu"
    })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    const tldrText = await tldr(info.selectionText)

    chrome.tabs.sendMessage(tab.id, {
        type: "wiki-query",
        text: tldrText
    })
})