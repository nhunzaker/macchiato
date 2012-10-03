# Macchiato

A simple html builder for testing.

## Examples

``` js
macchiato("article.post > header.post-title", "Macchiato").root("p", "Is smooth like coffee").serve()
```
``` html
<article class="post">

    <header class="post-title">
        Macchiato
    </header>
    
    <p>Is smooth like coffee</p>    
    
</article>
```

---

``` js
macchiato("section.post-container")("header")("h2", "Cool no?").set({ "class" : "post-title" });
```
``` html
<section class="post-container">
    <header>
        <h2 class="post-title">Cool no?</h2>
    </header>
</section>
```

---

``` js
macchiato("ul.list > li, li, li", "You can do lists", "For fun and profit", "And good coffee");
```
``` html

<ul class="list">
    <li>You can do lists</li>
    <li>For fun and profit</li>
    <li>And good coffee</li>
</ul>
```
---

``` js
var body = macchiato("p, p", "Hello world", "Welcome to Macchiato!").serve();
var container = macchiato("section").pour(body);
```
``` html
<section>
    <p>Hello world</p>
    <p>Welcome to Macchiato!</p>
</section>
```
