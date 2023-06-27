import { createSignal, createEffect, createRenderEffect, For} from "solid-js";
import "./App.css";
import { getPosts } from "./lib/service";
import { io } from "socket.io-client";

type Post = {
    name: string;
};

const socket = io("http://localhost:3000", {reconnectionDelayMax: 10000});
let messageText:HTMLInputElement;

function App() {
    const [posts, setPosts] = createSignal({ name: "" });
    // any ????????????????? I don't think so
    const [messages, setMessages] = createSignal<any>([]);
    const [input, setInput] = createSignal("");
    createRenderEffect(async () => {
        const posts = await getPosts();
        setPosts(posts);

        socket.on("connect", () => {
            //console.log("connected")
        });

        socket.on("message", (msg:string)=> {
            setMessages(prev => [...prev,msg]);
        })
    });

    return (
        <div class="App">
            <h1>Hello, {posts()["name"]}</h1>
            <input type="text" onInput={event => {
                setInput(event.currentTarget.value);
            }} ></input>
            <button onClick={() => {
                setMessages(prev => [...prev,input()]);
                socket.emit("message",input());
            }}>Guzior</button>
            <For each={messages()}>{(msg, ind) =>
                <div>{msg}</div>
            }</For>
        </div>
    );
}

export default App;
