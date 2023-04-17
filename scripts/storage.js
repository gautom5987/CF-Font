window.onload = function() {
    chrome.storage.local.get('font', function(data) {
        const div = document.querySelector('#editor');
        div.style.fontSize = data.font.toString() + 'px';    
    });
}