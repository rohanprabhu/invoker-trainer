define(["common"], function() {

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
    
    var getReagentQueueShort = function() {
        var reagentsMap = ReagentsMap;
	    var mappedReagentQueue = [];

        reagentQueue.forEach(function(value){
           mappedReagentQueue.push(reagentsMap[value]);
        });

        return mappedReagentQueue;
    }; 
      

    var getReagentQueue = function() {
	    return reagentQueue;
    };
    
    return {
      activateReagent : activateReagent,
      getReagentQueue : getReagentQueue,
      getReagentQueueShort : getReagentQueueShort
    };
};

return ReagentManager;

});
