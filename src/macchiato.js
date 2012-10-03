function macchiato() {

    var out = document.createDocumentFragment();
    var current = out;
    var slice = Array.prototype.slice;

    var trim = macchiato.trim;
    var isID = macchiato.isID;
    var isClass = macchiato.isClass;

    var fn = function fn (command) {

        if (!command) {
            return fn;
        }

        var action = (typeof command === 'number') ? "climb" : "append";
        return fn[action].apply(fn, arguments);
    };

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

    fn.html = function(text) {
        current.innerHTML = text;
        return fn;
    };

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

    fn.climb = function(steps) {

        steps = Math.abs(steps || 1);

        while(steps) {						
            current = current.parentNode || current;
            steps--;
        }

        return fn;
    };
    
    fn.root = function() {

        if (out.childNodes.length > 1) {
            current = out;
        } else {
            current = out.childNodes[0];
        }

        return fn.apply(fn, arguments);
    };
    
    fn.jumpTo = function(sel) {
        current = out.querySelector(sel) || out;
        return fn;
    };

    fn.serve = fn.out = function() {
        if (out.childNodes.length > 1) {
            return out;
        } else {
            return out.childNodes[0];
        }
    };

    return fn.apply(fn, arguments);

}

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