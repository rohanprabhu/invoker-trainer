/**
 * jQuery plugin for quickly making KeyBinding driven interfaces.
 * 
 * Author: Rohan Prabhu <rprabhu@amazon.com>; April, 2012
 * 
 * LICENSING PENDING
 */

(function($) {
    var ddInternals = (function() {
        var initialized = false,
            keyCodeMap = {};
            
        var stringToKeyCode = function(string) {
            var staticMap = {
                "ENTER": 12,
                "SPACE": 32
            };
            
            var numLockMap = [45,35,40,34,37,0,39,36,38,33];
            
            if(string.length == 1 && string.toLowerCase().charCodeAt(0) > 96 && string.toLowerCase().charCodeAt(0) < 123) {
                return string.toLowerCase().charCodeAt(0);
            }
            
            if(typeof parseInt(string) !== "undefined") {
                var num = parseInt(string);
                if(num >= 0 && num <= 9) {
                    return [(num + 48), numLockMap[num]];
                }
            }
            
            if(typeof staticMap[string] !== "undefined") {
                return staticMap[string];
            }
        };
        
        var centralCallback = function(e) {
            e = e || window.event;
            var keycode = e.which || e.keyCode;
            
            if(typeof keyCodeMap[keycode] === "object") {
                console.log("[1]");
                e.preventDefault();
                var actions = keyCodeMap[keycode];
                for(var actionIndex in keyCodeMap[keycode]) {
                    if(typeof actions[actionIndex] === "function") {
                        actions[actionIndex]();
                    }
                }
            } 
        };
            
        var init = function() {
            if(initialized == true) { return; }
            initialized = true;
            $(document).keypress(centralCallback);
        };
        
        var decorate = function(element, keyCode) {
            var ihSupportNodes = ["DIV", "SPAN", "A"];
            var keyStamp = "[" + keyCode + "] ";
            
            try {
                if(ihSupportNodes.indexOf(element.nodeName) !== -1) {
                    element.innerHTML = keyStamp + element.innerHTML;
                } else if(element.nodeName == "INPUT") {
                    element.value = keyStamp + element.value;
                }
            } catch(e) {
                
            }
        };
        
        var addNewKeyBinding = function(keycode, action) {
            if(typeof keyCodeMap[keycode] !== "object") {
                keyCodeMap[keycode] = new Array();
            }
            
            keyCodeMap[keycode][keyCodeMap[keycode].length] = action;
        };
        
        return {
            init: init,
            centralCallback: centralCallback,
            addNewKeyBinding: addNewKeyBinding,
            stringToKeyCode: stringToKeyCode,
            decorate: decorate
        };
    })();
    
    var ddActionCurries = (function() {
        var elementActionCurry = function(element) {
            return function() {
                var anchorOverride = false;
                if(element.nodeName == "A") {
                    var addr = element.href || "";
                    
                    if(addr !== "") {
                        anchorOverride = true;
                        window.location.href = addr;
                    }
                } else {
                    $(element).click();
                }
            }
        };
        
        var functionActionCurry = function(func) {
            return function() {
                if(typeof func === "function") {
                    func();
                }
            }
        };
        
        return {
            elementActionCurry: elementActionCurry,
            functionActionCurry: functionActionCurry
        };
    })();
    
    $.fn.dd = function(keyCode) {
        for(var i=0; i<this.length; i++) {
            $.dd(keyCode, this[i], true);
        }
        
        return (function(innerElements, keycode) {
            return ({
                decorate: function() {
                    for(var i=0; i<innerElements.length; i++) {
                        ddInternals.decorate(innerElements[i], keycode);
                    }
                }
            });
        })(this, keyCode);
    };
    
    $.dd = function(keyCode, element, jQuerySelector) {
        jQuerySelector = (typeof jQuerySelector !== "undefined")?jQuerySelector:false;
        var bindingFunction;
        
        if(typeof keyCode === "string") {
            keyCode = ddInternals.stringToKeyCode(keyCode);
        }
        
        if(typeof keyCode === "undefined") {
            return;
        }
        
        if(typeof keyCode === "number") {
            keyCode = [keyCode];
        }

        ddInternals.init();
        if(jQuerySelector == true) {
            bindingFunction = ddActionCurries.elementActionCurry(element);
        } else {
            if(typeof element === "function") {
                bindingFunction = ddActionCurries.functionActionCurry(element);
            }
        }
        
        if(typeof bindingFunction !== "undefined") {
            for(var idx in keyCode) {
                ddInternals.addNewKeyBinding(keyCode[idx], bindingFunction);
            }
        }
    };
})($);
