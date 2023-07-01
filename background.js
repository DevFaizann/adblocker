// 'use strict';

// chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
//   const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
//   console.log(msg);
// });

// console.log('Service worker started.');

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("in background")
  if(request.action === "toggleAdBlock") {
    
    const adBlockRuleId = "ruleset_1";

    let rulesetIds = await chrome.declarativeNetRequest.getEnabledRulesets();

    // chrome.declarativeNetRequest.getEnabledRulesets((enabledRulesets) => {
      const isEnabled = rulesetIds.includes(adBlockRuleId);
      console.log("isEnabled", isEnabled)
      console.log("adBlockRuleId", adBlockRuleId)
    //   console.log("enabledRulesets", enabledRulesets)

    // })
    console.log("rulesetIds", rulesetIds)

    if(rulesetIds){

      if(isEnabled){
        console.log("inside isEnabled")
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
      return true

    }
    else{
      console.log("no rulesetIds")
    }
    

    }
  });


  function enableAdBlock(ruleId, callback){
    console.log("ad block enabled")
    // const adBlockRuleId = "ruleset_1";

    let updatedRulesets = chrome.declarativeNetRequest.updateEnabledRulesets(options.enableRulesetIds(rulesetIds), () => {
      // if(!rulesetIds.includes(adBlockRuleId)){
      //   chrome.declarativeNetRequest.enableRuleset({rulesetIds:[adBlockRuleId]}, () => {
      //     if(chrome.runtime.lastError){
      //       console.log(`Failed to enable the ruleset_1: ${chrome.runtime.lastError.message} `);
      //     }
      //     else{
      //       console.log("Ad blocking enabled")
      //     }
      //   })
      // }
      if(chrome.runtime.lastError) {
        console.log(`Failed to enable the ${ruleId}: ${chrome.runtime.lastError.message} `)
      }
      else{
        console.log(`Ad blocking (${ruleId})`)
      }
      if(callback) callback();

    });
    return updatedRulesets;
    
  }

  function disableAdBlock(ruleId, callback){
    console.log("ad block disabled")  
    // const adBlockRuleId = "ruleset_1";
    chrome.declarativeNetRequest.disableRuleset({rulesetIds : [ruleId]},() => {
      // if(rulesetIds.includes(adBlockRuleId)){
      //   chrome.declarativeNetRequest.disableRuleset({ rulesetIds: [adBlockRuleId]}, () => {
      //     if(chrome.runtime.lastError){
      //       console.log(`Failed to disable the ruleset_1: ${chrome.runtime.lastError.message} `);
      //     }
      //     else{
      //       console.log("Ad blocking enabled")
      //     }
      //   })
      // }
      if(chrome.runtime.lastError){
        console.log(`Failed to disable the ${ruleId}: ${chrome.runtime.lastError.message} `);
      }
      else{
        console.log(`Ad blocking disabled (${ruleId})`)
      }
      if(callback) callback();
    })

  }
