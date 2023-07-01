const btn = document.querySelector(".isActive");

btn.addEventListener("click", async () => {
    chrome.runtime.sendMessage({action: "toggleAdBlock"}, async (response) => {

        if(chrome.runtime.lastError){
            console.log(`error in popup.js |  ${chrome.runtime.lastError.message} `);
          }
        
        console.log("clicked");
        if(response.enabled) {
            console.log("AdPlus is now blocking!");
        }
        else{
            console.log("AdPlus is disabled")
        }
    });
});