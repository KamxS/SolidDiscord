import { createResource, Show, For } from "solid-js";
import { getChannel } from "../lib/service";

function Channel(props) {
    const [channel] = createResource(props.id,async () => await getChannel(props.id()));

    return (
        <Show when={!channel.loading}>
            <div>{channel().name}</div>
            <For each={channel().messages}>
                {(msg, i) => (
                    <div>
                        {msg.message}
                    </div>
                )}
            </For>
        </Show>
    );
}

export default Channel;
