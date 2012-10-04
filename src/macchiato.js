(function(window) {

    "use strict";

    // macchiato()
    // --------------------
    // The main function. When envoked, macchiato will create several variables
    // to keep track of the current context (the focal point of all sequential actions)
    //
    // `var el = macchiato("article");`

    var macchiato = window.macchiato = function macchiato() {

        var out = document.createDocumentFragment();
        var current = out;
        var slice = Array.prototype.slice;

        var trim = macchiato.trim;
        var isID = macchiato.isID;
        var isClass = macchiato.isClass;

        // builder()
        // --------------------
        // Builder is the workhorse function that performs all of the operations that we
        // need to build html. 
        // 
        // If given a number, it will perform the `climb` operation.
        // If given any other argument, it will perform the 'append' operation.
        // Otherwise it just returns itself;
        var fn = function builder (command) {

            if (!command) {
                return fn;
            }

            var action = (typeof command === 'number') ? "climb" : "append";
            return fn[action].apply(fn, arguments);
        };

        // set()
        // --------------------
        // Given a key and value, set will assign the value of an attribute for the current
        // context.
        // 
        // Given an object, it will iterate through each key and assign the coordinating value.
        fn.set = function(key, value) {

            if (typeof key === 'object') {
                
                for (var k in key) {

                    if ( key.hasOwnProperty(k) ) {
                        fn.set(k, key[k]);
                    }

                }
                
            } else {        
                if (!value) return fn;
                current.setAttribute(key, value);
            }

            return fn;
        };

        // html()
        // --------------------
        // Sets the raw innerHTML value for the current context. This is particularly useful
        // for hammering out HTML that macchiato isn't good at building yet, or simply providing
        // text.
        fn.html = function(text) {
            current.innerHTML = text;
            return fn;
        };
        
        // append(), pour()
        // --------------------
        // Append is responsible for adding additional elements to the current context.
        // If given an object, it will simply try to append it. Otherwise, it follows this logic:
        //
        // **Nesting** : Split the string by the ">" character. 
        //
        // **Siblings** : Take each next, and split it by the "." character
        //
        // **Names** : Now that we have a given nest and sibling, determine if it has a "#" or "."
        // character and assign the associated id/class attribute values
        //
        // ex: `macchiato().append("article > header > h2.main-title, h3.sub-title");
        fn.append = fn.pour = function(str, html, html__) {

            if (typeof str === 'object') {
                current.appendChild(str);
                return fn;
            }

            var elements = str.split(">");
            var child;

            while (elements.length) {

                var branch = trim( elements[0] ),
                    children = branch.split(","),
                    className = "",
                    idName = "",
                    tmp;

                if (children.length > 1) {
                    var text = Array.apply(null, arguments).slice(1);
                    while (children.length) {
                        fn.append(children.shift(), text.shift() || html );
                        fn.climb(1);
                    }
                    return fn;
                }

                if ( isID(branch) ) {
                    tmp = branch.split("#");
                    idName = tmp[1];
                    branch = tmp[0];
                }

                if ( isClass(branch) ) {
                    tmp = branch.split(".");
                    className = tmp[1];
                    branch = tmp[0];
                }

                child = document.createElement(branch);

                current.appendChild(child);
                current = child;

                fn.set("class", className);
                fn.set("id", idName);

                elements.shift();
            }

            if (html) {
                fn.html(html);
            }

            return fn;
        };

        // climb()
        // --------------------
        // Crawls back up the chain. For example, if the current context is an `<li>` tag,
        // you could climb to its parent `<ul>` by using *.climb(1)
        fn.climb = function(steps) {

            steps = Math.abs(steps || 1);

            while(steps) {						
                current = current.parentNode || current;
                steps--;
            }

            return fn;
        };

        // root()
        // --------------------
        // Returns the context to the highest level domain
        fn.root = function() {

            if (out.childNodes.length > 1) {
                current = out;
            } else {
                current = out.childNodes[0];
            }

            return fn.apply(fn, arguments);
        };
        
        // jumpTo()
        // --------------------
        // Given a CSS selector, `jumpTo` will use [node].querySelector to find an element.
        // If none is found, it will default to the value returned by root();
        fn.jumpTo = function(sel) {
            current = out.querySelector(sel) || out;
            return fn;
        };

        // serve(), out()
        // --------------------
        // Returns the current chain of elements created by `macchiato`
        fn.serve = fn.out = function() {
            if (out.childNodes.length > 1) {
                return out;
            } else {
                return out.childNodes[0];
            }
        };

        return fn.apply(fn, arguments);

    };


    // Utility functions
    // --------------------
    // Used to make maintenance easier.

    macchiato.trim = function(str, characters) {
        if (str == null) return '';
        characters = characters || '\\s';
        return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    };
    macchiato.isID = function(str) {
        return (/\#/).test(str);
    };
    macchiato.isClass = function(str) {
        return (/\./).test(str);
    };

}(window));