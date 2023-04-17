function changeFontSize(value) {
    const div = document.querySelector('#editor');
    div.style.fontSize = value.toString() + 'px';
    chrome.storage.local.set({'font': value}, function() {
        console.log('Updated Font Size Successfully');
    });
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

    chrome.storage.local.get('font', function(data) {
        range.defaultValue = data.font;
    });

    range.addEventListener('input', function () {
        injectCode(tab, range.value)
    }, false);
})