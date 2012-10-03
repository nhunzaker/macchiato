# Macchiato

A simple html builder for testing.

``` js
macchiato("article.post > header.post-title", "Macchiato")
.root("p, p, p", "Is smooth", "like a good", "cup of coffee")
.serve()
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
