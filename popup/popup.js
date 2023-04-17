function changeFontSize(value) {
    const div = document.querySelector('#editor');
    div.style.fontSize = value.toString() + 'px';
}

injectCode = (tab, value) => {
    const { id, url } = tab;
    chrome.scripting.executeScript(
        {
            target: { tabId: id, allFrames: true },
            func: changeFontSize,
            args: [value],
        }
    )
}

getCurrentTab = async () => {
    let queryOptions = { active: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

getCurrentTab().then((tab) => {
    var range = document.querySelector('#slider');
    range.addEventListener('input', function () {
        injectCode(tab, range.value)
    }, false);
})