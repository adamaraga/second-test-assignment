import { CommentType, PostType } from "../types";
import moment from "moment";
import Comments from "./Comments";
import { useContext, useEffect, useState } from "react";
import AddCommentForm from "./AddCommentForm";
import { Context } from "../context/MainContext";

const Post = ({ post }: { post: PostType }) => {
  const { user } = useContext(Context);
  const [showAddReply, setshowAddReply] = useState(false);
  const [commentsMain, setCommentsMain] = useState<CommentType[]>([]);

  useEffect(() => {
    setCommentsMain(post?.comments);
  }, [post]);

  return (
    <div className="post">
      <p className="post__info">
        <span>
          Posted by:{" "}
          {post.userId?.username === user?.username
            ? "You"
            : post.userId?.username}
        </span>
        <span>{moment.utc(post?.createdAt).format("MMM Do YYYY, h:mm a")}</span>
      </p>
      <h3 className="post__num">{post?.number}</h3>
      {user?.id && (
        <div>
          <p
            className="comments__reply"
            onClick={() => setshowAddReply(!showAddReply)}
          >
            Reply
          </p>
          {showAddReply && (
            <AddCommentForm
              setCommentsMain={setCommentsMain}
              setshowAddReply={setshowAddReply}
              postId={post?._id}
            />
          )}
        </div>
      )}
      <Comments comments={commentsMain} parentNumber={post?.number} />
    </div>
  );
};

export default Post;
