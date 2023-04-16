var slider = document.getElementById('slider');

function changeFontSize(value) {
    const div = document.querySelector('#editor');
    alert(value);
    div.style.fontSize = value.toString() + 'px';
}

slider.oninput = function () {
    chrome.scripting
        .executeScript({
            target: { tabId: getTabId() },
            func: changeFontSize,
            args: [slider.value],
        })
        .then(() => console.log("injected a function"));
}
