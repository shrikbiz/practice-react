import React from "react";

const POSTS_API = "https://jsonplaceholder.typicode.com/posts";

export default function Unnamed() {
    const [posts, setPosts] = React.useState([]);
    console.log("🚀 ~ Unnamed ~ posts:", posts);

    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        async function fetchPostData() {
            setIsLoading(true);
            try {
                const responseJSON = await fetch(POSTS_API);
                console.log("Shrikant");
                if (responseJSON.status !== 200) {
                    setError("Unable to fetch post data");
                    return;
                }
                const response = await responseJSON.json();
                setPosts(response);
                setError(null);
            } catch (e) {
                setError(e.message);
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPostData();
    }, []);

    if (isLoading) {
        return <>Loading...</>;
    } else if (error) {
        return <>{error}</>;
    } else {
        return (
            <section>
                {posts.map((post, key) => (
                    <div
                        key={key}
                        style={{
                            border: "1px solid black",
                            padding: "10px",
                            margin: "20px",
                        }}
                    >
                        <div>{post.title}</div>
                        <div>{post.body} </div>
                    </div>
                ))}
            </section>
        );
    }
}
