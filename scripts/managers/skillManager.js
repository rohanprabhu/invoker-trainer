define(["common"], function() {

var SkillManager = function() {
    var config = {
        maximumSkills: 2
    };

    var skillsMap = (function() {
    	var _skills = {};

    	_skills["QQQ"] = SkillsMap[Skills.ColdSnap];
    	_skills["QQW"] = SkillsMap[Skills.GhostWalk];
    	_skills["QQE"] = SkillsMap[Skills.IceWall];
    	_skills["WWQ"] = SkillsMap[Skills.Tornado];
    	_skills["QWE"] = SkillsMap[Skills.DeafeningBlast];
    	_skills["EEQ"] = SkillsMap[Skills.ForgeSpirit];
    	_skills["WWW"] = SkillsMap[Skills.EMP];
    	_skills["WWE"] = SkillsMap[Skills.Alacrity];
    	_skills["EEW"] = SkillsMap[Skills.ChaosMeteor];
    	_skills["EEE"] = SkillsMap[Skills.SunStrike];

    	return _skills;
    })();

    var skillSet = [];

    var invoke = function(reagentString) {
    	if(reagentString in skillsMap) {
    		var idx = skillSet.indexOf(skillsMap[reagentString]);

    		if(idx != -1) {
    		    skillSet = [skillSet[idx]].concat(skillSet.slice(0, idx).concat(skillSet.slice(idx+1)));
    		} else {
    			if(skillSet.length === config.maximumSkills) {
    			    skillSet = skillSet.slice(1);
    		    }

    			skillSet.push(skillsMap[reagentString]);
    		}
    	}
    };

    var getCurrentInvocation = function() {
    	return skillSet;
    };

    var setMaximumSkills = function(maximumSkills) {
    	if(skillSet.length > maximumSkills) {
    		skillSet = skillSet.slice(0, maximumSkills - skillSet.length);
    	}
    };

    return {
    	invoke: invoke,
    	getCurrentInvocation: getCurrentInvocation,
    	setMaximumSkills: setMaximumSkills
    };
};

return SkillManager;

});
