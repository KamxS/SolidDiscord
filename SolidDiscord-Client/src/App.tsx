import { createSignal, createEffect, createRenderEffect, For, Show} from "solid-js";
import "./App.css";
import { getChannel } from "./lib/service";
import Channel from "./components/Channel";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { reconnectionDelayMax: 10000 });
socket.close();
// Add Auth0 ?

// Flags
const showMessages = false;
const showAddChannel= false;

function App() {
    const [channel, setChannel] = createSignal(1);
    // any ????????????????? I don't think so
    const [messages, setMessages] = createSignal<any>([]);
    const [input, setInput] = createSignal("");
    createRenderEffect(async () => {
        socket.on("connect", () => {
            //console.log("connected")
        });

        socket.on("message", (msg: string) => {
            setMessages((prev) => [...prev, msg]);
        });
    });

    return (
        <div class="App">

            <Show when={showMessages}>
            <input
                type="text"
                onInput={(event) => {
                    setInput(event.currentTarget.value);
                }}
            ></input>
            <button
                onClick={() => {
                    setMessages((prev) => [...prev, input()]);
                    socket.emit("message", input());
                }}
            >
                Send Message
            </button>
            <For each={messages()}>{(msg, ind) => <div>{msg}</div>}</For>
            </Show>

            <Show when={showAddChannel}>
            <form action="http://localhost:3000/api/new" method="post">
                <input type="text" name="name"></input>
                <input type="submit"/>
            </form>
            </Show>

            <input
                type="number"
                onInput={(event) => {
                    setChannel(parseInt(event.currentTarget.value));
                }}
            ></input>
            <Channel id={channel}/>
        </div>
    );
    //TODO: I dont think I should be passing signals as props
}

export default App;
