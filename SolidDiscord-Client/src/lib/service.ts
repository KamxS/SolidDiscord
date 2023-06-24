export async function getPosts() {
    const resp = await fetch("http://localhost:3000/api/posts/1");
    const json = await resp.json();
    return json;
}
