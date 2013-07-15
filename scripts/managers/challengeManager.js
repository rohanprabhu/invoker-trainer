define(["common"], function() {

var ChallengeManager = function() {

	var getChallenge = function() {
		keys =  Object.keys(SkillsMap);
		return SkillsMap[keys[Math.floor(keys.length * Math.random())]];
	};

	return {
		getChallenge : getChallenge
	};
};

return ChallengeManager;

});