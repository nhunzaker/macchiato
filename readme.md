# Macchiato

A simple html builder for testing.

## Examples

``` js
macchiato("article.post > header.post-title", "Macchiato").root("p", "Is smooth like coffee").serve()
```

becomes:

``` html
<article class="post">

    <header class="post-title">
        Macchiato
    </header>
    
    <p>Is Smooth</p>    
    <p>like a good</p>    
    <p>cup of coffee</p>    
    
</article>
```

---

``` js
macchiato("section.post-container")("header")("h2", "Cool no?").set({ "class" : "post-title" });
```

becomes

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

becomes

``` html

<ul class="list">
    <li>You can do lists</li>
    <li>For fun and profit</li>
    <li>And good coffee</li>
</ul>
```