export async function getPosts() {
    const resp = await fetch("http://localhost:3000/api/posts/1");
    const json = await resp.json();
    return json;
}

export async function getChannel(id:number) {
    if(id < 1) return;
    const resp = await fetch(("http://localhost:3000/api/channel/"+id));
    const json = await resp.json();
    return json;
}

