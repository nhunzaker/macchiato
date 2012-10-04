(function(macchiato) {

    function outerHTML(node){
        return node.outerHTML || new XMLSerializer().serializeToString(node);
    }

    describe ("Macchiato Functional Tests", function() {

        it ("case 1 - vertical buildout", function() {
            var el = macchiato("article.post > header.post-title", "Macchiato").root("p", "Is smooth like coffee").serve();
            outerHTML(el).should.equal('<article class="post">'
                                       + '<header class="post-title">Macchiato</header>'
                                       + '<p>Is smooth like coffee</p>'
                                       + '</article>');            
        });

        it ("case 2 - adding properties", function() {
            var el = macchiato("section.post-container")("header")("h2", "Cool no?").set({ "class" : "post-title" }).serve();
            outerHTML(el).should.equal('<section class="post-container">'
                                       + '<header><h2 class="post-title">Cool no?</h2></header>'
                                       + '</section>');
        });

        it ("case 3 - horizontal buildout", function() {
            var el = macchiato("ul.list > li, li, li", "You can do lists", "For fun and profit", "And good coffee").serve();
            outerHTML(el).should.equal('<ul class="list">'
                                       + '<li>You can do lists</li>'
                                       + '<li>For fun and profit</li>'
                                       + '<li>And good coffee</li>'
                                       + '</ul>');            
        });

        it ("case 4 - merging html", function() {
            var body = macchiato("p, p", "Hello world", "Welcome to Macchiato!").serve();
            var container = macchiato("section").pour(body).serve();
            outerHTML(container).should.equal("<section>"
                                              + "<p>Hello world</p>"
                                              + "<p>Welcome to Macchiato!</p>"
                                              + "</section>");
        });
        
    });
    
}(window.macchiato));