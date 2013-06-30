/**
  * enum for reagents
  **/
var Reagents = {
    Quas: "Quas",
    Wex: "Wex",
    Exort: "Exort"
};

var Skills = {
    ColdSnap: "ColdSnap",
    GhostWalk: "GhostWalk",
    IceWall: "IceWall",
    Tornado: "Tornado",
    DeafeningBlast: "DeafeningBlast",
    ForgeSpirit: "ForgeSpirit",
    EMP: "EMP",
    Alacrity: "Alacrity",
    ChaosMeteor: "ChaosMeteor",
    SunStrike: "SunStrike"
};

var Channels = {
    InvokeChannel: "InvokeChannel",
    ReagentChannel: "ReagentChannel"
};


var ReagentsMap = (function() {
	var _reagentsMap = {};

    _reagentsMap[Reagents.Quas]  = "Q";
    _reagentsMap[Reagents.Wex]   = "W";
    _reagentsMap[Reagents.Exort] = "E";

    return _reagentsMap;
})();

var Skill = function(skillId, skillName, skillHotkey) {
    var id = skillId,
        name = skillName,
        hotkey = skillHotkey;

    var getName = function() {
        return name;
    };

    var getId = function() {
        return id;
    };

    var getHotkey = function() {
        return hotkey;
    };

    var is = function(skillId) {
        return (skillId === getId());
    };

    return {
        getName  : getName,
        getId    : getId,
        getHotkey: getHotkey,
        is       : is
    };
};

var SkillsMap = (function() {
	var _skillsMap = {};

	_skillsMap[Skills.ColdSnap]       = new Skill(Skills.ColdSnap      , "Cold Snap"      , "Y");
	_skillsMap[Skills.GhostWalk]      = new Skill(Skills.GhostWalk     , "Ghost Walk"     , "V");
	_skillsMap[Skills.IceWall]        = new Skill(Skills.IceWall       , "Ice Wall"       , "G");
	_skillsMap[Skills.Tornado]        = new Skill(Skills.Tornado       , "Tornado"        , "X");
	_skillsMap[Skills.DeafeningBlast] = new Skill(Skills.DeafeningBlast, "Deafening Blast", "B");
	_skillsMap[Skills.ForgeSpirit]    = new Skill(Skills.ForgeSpirit   , "Forge Spirit"   , "F");
	_skillsMap[Skills.EMP]            = new Skill(Skills.EMP           , "EMP"            , "C");
	_skillsMap[Skills.Alacrity]       = new Skill(Skills.Alacrity      , "Alacrity"       , "Z");
	_skillsMap[Skills.ChaosMeteor]    = new Skill(Skills.ChaosMeteor   , "Chaos Meteor"   , "D");
	_skillsMap[Skills.SunStrike]      = new Skill(Skills.SunStrike     , "Sun Strike"     , "T");

	return _skillsMap;
})();
