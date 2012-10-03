# Macchaito

A simple html builder for testing.

``` js
macchiato("article.post > header.post-title", "Macchiato").root("p", "Is smooth");
```

becomes:

``` html
<article class="post">

    <header class="post-title">
        Macchiato
    </header>
    
    <p>Is Smooth</p>    
    
</article>
```
