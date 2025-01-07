import { useContext, useEffect, useState } from "react";
import { Context } from "../context/MainContext";
import AddPostForm from "../components/AddPostForm";
import { fetchPosts } from "../api/main";
import { PostType } from "../types";
import Post from "../components/Post";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Home = () => {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const res = await fetchPosts(10, 1);
        setPosts(res.data?.posts);
        // console.log("res.data", res.data?.posts);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        toast.error(message);
      }
    };
    loadPosts();
  }, []);
  return (
    <div className="home">
      {user?.id && <AddPostForm setPosts={setPosts} />}

      {loading ? (
        <Loading />
      ) : (
        posts?.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Home;
