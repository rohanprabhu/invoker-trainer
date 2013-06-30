require(["libs/deedee", "managers/managers", "common"], function(a, Managers) {
	var to = function(a) {
		var message = "[";
		for(var i=0; i<a.length; i++) {
			message += ((i == 0)?"":":") + a[i].getName()
		}

		return (message + "]");
	};

	var skillToCssClassMap = (function() {
		var _skillClassMap = {};
		_skillClassMap[Skills.ColdSnap] = "cold_snap";
		_skillClassMap[Skills.GhostWalk] = "ghost_walk";
		_skillClassMap[Skills.IceWall] = "ice_wall";
		_skillClassMap[Skills.Tornado] = "tornado";
		_skillClassMap[Skills.DeafeningBlast] = "deafening_blast";
		_skillClassMap[Skills.ForgeSpirit] = "forge_spirit";
		_skillClassMap[Skills.EMP] = "emp";
		_skillClassMap[Skills.Alacrity] = "alacrity";
		_skillClassMap[Skills.ChaosMeteor] = "chaos_meteor";
		_skillClassMap[Skills.SunStrike] = "sun_strike";

		return _skillClassMap;
	})();

	var skillClassList = [
	    "cold_snap", "ghost_walk", "ice_wall", "tornado", "deafening_blast",
	    "forge_spirit", "emp", "alacrity", "chaos_meteor", "sun_strike"
	];

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
		$(this).css("border", "1px solid #000000");
		reagentManager.activateReagent(reagentKeyMap[this.id]);

		setTimeout((function(obj) {
			return function() {
			    $(obj).css("border", "1px solid #FFFFFF");
			}
		})(this), 100);
	});

	$("#invoke").click(function() {
		skillManager.invoke(reagentManager.getReagentQueueShort(ReagentsMap).join());

		for(var i=0; i<skillClassList.length; i++) {
			$("#skill_a").removeClass(skillClassList[i]);
			$("#skill_b").removeClass(skillClassList[i]);
		}

		var skillSet = skillManager.getCurrentInvocation();

		if(skillSet.length == 1 || skillSet.length == 2) {
		    $("#skill_a").addClass(skillToCssClassMap[skillSet[0].getId()]);
		    $("#skill_a .hotkey").html(skillSet[0].getHotkey());

		    if(skillSet.length == 2) {
		        $("#skill_b").addClass(skillToCssClassMap[skillSet[1].getId()]);
		        $("#skill_b .hotkey").html(skillSet[1].getHotkey());
		    }
		} else {
			// Cut a Sev-2
		}

		console.log(to(skillSet));
	});

	$("#quas").dd('Q');
	$("#exort").dd('E');
	$("#wex").dd('W');
	$("#invoke").dd('R');
});
