import { createSignal, createEffect, createRenderEffect } from "solid-js";
import "./App.css";
import { getPosts } from "./lib/service";

function App() {
    const [count, setCount] = createSignal(0);
    const [posts, setPosts] = createSignal({});
    createRenderEffect(async () => {
        const posts = await getPosts();
        setPosts(posts);
    });

    return (
        <div class="App">
            <h1>Hello {posts()["name"]}</h1>
        </div>
    )
}

export default App;
