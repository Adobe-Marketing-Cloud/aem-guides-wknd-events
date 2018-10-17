List Component:

```js
const {Route} = require('react-router-dom');
const {BrowserRouter} = require('react-router-dom');
let items = [
    {
        url: "#",
        path: "item1",
        title: "First Article",
        lastModified: 1539529744910
    },
    {
        url: "#",
        path: "item2",
        title: "Second Article",
        lastModified: 1539532397436
    }
    ];
    <BrowserRouter>
        <Route key="list-example" path="sample">
            <List items={items} />
        </Route>
    </BrowserRouter>
    
```

