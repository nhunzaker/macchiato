# Macchiato

A simple html builder for testing.

``` js
var mock = macchiato("ul > li, li, li", "Coffee", "is good", "for the brain").serve();
```

## Methods

- `macchiato`: If given a number, will execute the `climb` method, otherwise executes `append`.
- `append`: Adds an element to the current context, then sets the context to this child. Accepts a `string` or `HTMLObject`
- `climb`: Crawls up a chain of elements n times. Sets the context to this parent element.
- `html`: Sets the innerHTML value of an element.
- `jumpTo`: Searches for an element given a CSS selector from `root`. Sets the context to this element.
- `out`: An alias to `serve`
- `pour`: An alias to `append`
- `root`: Sets the context to the root element in the current chain.
- `serve`: Returns raw html output for the current chain.
- `set`: Sets the value of a given attribute for the current context. Also excepts an object.


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
macchiato("section.post-container")("header")("h2", "Cool no?").set({ "class" : "post-title" }).serve();
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
macchiato("ul.list > li, li, li", "You can do lists", "For fun and profit", "And good coffee").serve();
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
var container = macchiato("section").pour(body).serve();
```
``` html
<section>
    <p>Hello world</p>
    <p>Welcome to Macchiato!</p>
</section>
```
