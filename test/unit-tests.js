(function(macchiato) {

    describe ("Macchiato Unit Tests", function() {

        it ("#trim - can trim text", function() {
            macchiato.trim("   foobar").should.equal("foobar");
        });

        it ("#isClass - can determine if a value has a css class within it", function () {
            macchiato.isClass(".foobar").should.equal(true);
            macchiato.isClass("#jenkins").should.equal(false);
        });
        
        it ("#isID - can determine if a value has a css id within it", function () {
            macchiato.isID("#foobar").should.equal(true);
            macchiato.isID(".jenkins").should.equal(false);
        });

        it ("#serve - can return the current output", function() {
            macchiato("div").serve().tagName.should.equal("DIV");
        });

        describe ("#append", function() {

            it ("can add elements to the current element", function() {
                var el = macchiato().append("div").serve();
                assert.equal(el.tagName, "DIV");
            });

            it ("can add existing dom elements", function() {
                
                var el = macchiato("p", "howdy").out();
                var el2 = macchiato("div").pour(el).out();

                assert.equal(el2.children[0].innerHTML, "howdy");
                assert.equal(el2.children[0].tagName, "P");

            });

            it ("can add nested elements using the \">\" character", function() {

                var el = macchiato().append("article > header > h2").serve();

                assert.equal(el.tagName, "ARTICLE");
                assert.equal(el.children[0].tagName, "HEADER");
                assert.equal(el.children[0].children[0].tagName, "H2");
            });

            it ("can add more than one child using the \".\" character", function() {
                var el = macchiato("article > p, p, p, p").serve();
                el.children.should.have.length(4);

                el.children[0].tagName.should.equal("P");
            });
            
            it ("can add classes using shorthand", function() {
                var el = macchiato("article.caramel").serve();
                assert.equal(el.getAttribute("class"), "caramel");
            });

            it ("can add ids using shorthand", function() {
                var el = macchiato("article#caramel").serve();
                assert.equal(el.getAttribute("id"), "caramel");
            });

            it ("can append text to the last child in a chain", function() {
                var el = macchiato("article#caramel > div.content", "This is text").serve();

                assert.equal(el.tagName, "ARTICLE");
                assert.equal(el.getAttribute("id"), "caramel");

                assert.equal(el.children[0].tagName, "DIV");
                assert.equal(el.children[0].getAttribute("class"), "content");
                assert.equal(el.children[0].innerHTML, "This is text");
            });
            
        });
        
        describe("#set", function() {

            it ("can set attributes of the current element", function() {
                var el = macchiato("div").set("class", "espresso").serve();
                el.getAttribute("class").should.equal("espresso");
            });
            it ("can set attributes of the current element given an object", function() {

                var el = macchiato("div").set({
                    "class" : "espresso",
                    "style"   : "border: 1px solid blue;"
                }).serve();

                el.getAttribute("class").should.equal("espresso");
                el.getAttribute("style").should.equal("border: 1px solid blue;");
            });

        });

        it("#html - can embue html into an element via a string", function() {
            var el = macchiato("div").html("Foobar").serve();
            el.innerHTML.should.equal("Foobar");
        });
        
        it ("#climb - can climb back up the chain", function() {
            var el = macchiato("div").set("class", "espresso").serve();
        });

        it ("#jumpTo - can move to a specific part of the chain", function() {
            
            var el = macchiato("article > div#anchor").append("p").jumpTo("#anchor").append("ul.foo").serve();
            
            el.tagName.should.equal("ARTICLE");
            el.children[0].tagName.should.equal("DIV");
            el.children[0].getAttribute("id").should.equal("anchor");
            el.children[0].children[0].tagName.should.equal("P");
            el.children[0].children[1].tagName.should.equal("UL");
            el.children[0].children[1].getAttribute("class").should.equal("foo");
            
        });

        describe("#root", function() {

            it ("can move to a root element", function() {
                
                var el = macchiato("article > div#anchor").append("p")
                        .root().set("class", "sample")
                        .serve();

                assert.equal(el.getAttribute("class"), "sample");
                
            });

            it ("can conduct the same operations as the standard macchiato function", function() {
                
                var el = macchiato("article > div#anchor").append("p")
                        .root("p", "sample")
                        .serve();

                assert.equal(el.children.length, 2);
                assert.equal(el.children[1].innerHTML, "sample");
                
            });

        });

        
    });
    
}(window.macchiato));