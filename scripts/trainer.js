require(["libs/deedee", "managers/managers", "common"], function(a, Managers) {
	var to = function(a) {
		var message = "[";
		for(var i=0; i<a.length; i++) {
			message += ((i == 0)?"":":") + a[i].getName()
		}

		return (message + "]");
	};

	Array.prototype.join = function(seperator) {
		var ret = "";

		for(var i=0; i<this.length; i++) {
			ret += this[i];
		}

		return ret;
	};

	var skillManager = new Managers.SkillManager();
	var reagentManager = new Managers.ReagentManager();

    var reagentKeyMap = {
    	"quas": Reagents.Quas,
    	"exort": Reagents.Exort,
    	"wex": Reagents.Wex
    };

	var colorMap = {
		"quas" : "#FF0000",
		"wex"  : "#00FF00",
		"exort": "#0000FF"
	};

	$("#quas, #exort, #wex").click(function() {
		$(this).css("background", colorMap[this.id]);
		reagentManager.activateReagent(reagentKeyMap[this.id]);

		setTimeout((function(obj) {
			return function() {
			    $(obj).css("background", "#000000");
			}
		})(this), 100);
	});

	$("#invoke").click(function() {
		skillManager.invoke(reagentManager.getReagentQueue(ReagentsMap).join());
		console.log(to(skillManager.getCurrentInvocation()));
	});

	$("#quas").dd('Q');
	$("#exort").dd('E');
	$("#wex").dd('W');
	$("#invoke").dd('R');
});
