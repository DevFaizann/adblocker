// 'use strict';

// chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
//   const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
//   console.log(msg);
// });

// console.log('Service worker started.');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.action === "toggleAdBlock") {
    const adBlockRuleId = "ruleset_1";
    chrome.declarativeNetRequest.getEnabledRulesets((enabledRulesets) => {
      const isEnabled = enabledRulesets.includes(adBlockRuleId);

    })

    if(isEnabled){
      disableAdBlock(adBlockRuleId, () => {
        sendResponse({ enabled: false})
      });
    }
    else{

      enableAdBlock(adBlockRuleId,() => {
        sendResponse({enabled: true});
      });
    }

    // sendResponse({ enabled : isEnabled });
  }
});

function enableAdBlock(){
  console.log("ad block enabled")
  const adBlockRuleId = "ruleset_1";

  chrome.declarativeNetRequest.getEnabledRulesets((rulesetIds) => {
    if(!rulesetIds.includes(adBlockRuleId)){
      chrome.declarativeNetRequest.enableRuleset({rulesetIds:[adBlockRuleId]}, () => {
        if(chrome.runtime.lastError){
          console.log(`Failed to enable the ruleset_1: ${chrome.runtime.lastError.message} `);
        }
        else{
          console.log("Ad blocking enabled")
        }
      })
    }
  }) 
  
}

function disableAdBlock(){
  console.log("ad block disabled")  
  const adBlockRuleId = "ruleset_1";
  chrome.declarativeNetRequest.getEnabledRulesets((rulesetIds) => {
    if(rulesetIds.includes(adBlockRuleId)){
      chrome.declarativeNetRequest.disableRuleset({ rulesetIds: [adBlockRuleId]}, () => {
        if(chrome.runtime.lastError){
          console.log(`Failed to disable the ruleset_1: ${chrome.runtime.lastError.message} `);
        }
        else{
          console.log("Ad blocking enabled")
        }
      })
    }
  })

}