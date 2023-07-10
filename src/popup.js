let webhook_url = "https://discord.com/api/webhooks/..."

function sendWebhookMessage(message) {
    let request = new XMLHttpRequest();
    request.open("POST", webhook_url);
    request.setRequestHeader('Content-type', 'application/json');
    const params = {
        content: message
    }
    request.send(JSON.stringify(params));
}

document.addEventListener('DOMContentLoaded', function() {
  // Call the sendWebhookMessage function with the current URL
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var url = tabs[0].url;
    if (url.indexOf('https://geotastic.net/online-lobby/') !== 0) {
      document.querySelector('.banner').textContent = 'Error: Not a valid GeoTastic lobby-URL.';
      document.querySelector('.banner').style.backgroundColor = 'red';
      throw new Error('Invalid URL: ' + url);
    }
    url = url.replace("online-lobby", "join");
    
    sendWebhookMessage(url);
  });
});