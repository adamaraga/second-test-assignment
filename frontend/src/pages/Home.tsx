import { useContext, useEffect, useState } from "react";
import { Context } from "../context/MainContext";
import AddPostForm from "../components/AddPostForm";
import { fetchPosts } from "../api/main";

const Home = () => {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const res = await fetchPosts(10, 1);
      setPosts(res.data?.posts);
      console.log("res.data", res.data?.posts);
    };
    loadPosts();
  }, []);
  return (
    <div className="home" style={{ margin: 100 }}>
      <AddPostForm />

      {posts?.map((post: any) => (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Starting Number: {post?.number}</h3>
          <p>Posted by: {post.userId?.username}</p>
          <ul>
            {post.comments?.map((comment: any) => (
              <li key={comment._id}>
                {comment.baseNumber} {comment.operation} {comment.operand} ={" "}
                {comment.result}
              </li>
            ))}
          </ul>
          {/* <AddOperationForm postId={post._id} /> */}
        </div>
      ))}
    </div>
  );
};

export default Home;
