var ReagentManager = function() {
    
    var reagentQueue = [];
    var reagentQueueSize = 3;
    
    var activateReagent = function(reagent) {
        if (reagentQueue.length < reagentQueueSize) {
            reagentQueue.push(reagent);
        } else {
            reagentQueue = reagentQueue.slice(1);
            reagentQueue.push(reagent);
        }
    };
    
    var getReagentQueue = function(reagentsMap) {
        if (typeof reagentsMap === "undefined") {
            return reagentQueue;
        } else {
            var mappedReagentQueue = [];
            reagentQueue.forEach(function(value){
                mappedReagentQueue.push(reagentsMap[value]);
            });
            return mappedReagentQueue;
        } 
      
    };
    
    
    return {
      activateReagent : activateReagent,
      getReagentQueue : getReagentQueue
    };
};


var reagents = {
	Quas : "Quas",
	Wex  : "Wex",
	Exort: "Exort"
};

var reagentsMap = {};
reagentsMap[reagents.Quas] = "Q";
reagentsMap[reagents.Wex]  = "W";
reagentsMap[reagents.Exort]= "E";