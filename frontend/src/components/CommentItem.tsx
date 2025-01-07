import moment from "moment";
import React, { useContext, useState } from "react";
import Comments from "./Comments";
import AddCommentForm from "./AddCommentForm";
import { Context } from "../context/MainContext";
import { CommentType } from "../types";

interface CommentItemPropsType {
  comment: CommentType;
  setCommentsMain: React.Dispatch<React.SetStateAction<CommentType[]>>;
  parentNumber: number;
}

const CommentItem = ({
  comment,
  setCommentsMain,
  parentNumber,
}: CommentItemPropsType) => {
  const { user } = useContext(Context);
  const [showAddReply, setshowAddReply] = useState<boolean>(false);

  return (
    <div className="comments__item">
      <div>
        <p className="post__info">
          <span>
            Posted by:{" "}
            {comment.userId?.username === user?.username
              ? "You"
              : comment.userId?.username}
          </span>
          <span>
            {moment.utc(comment?.createdAt).format("MMM Do YYYY, h:mm a")}
          </span>
        </p>
        <h3 className="post__num">
          {parentNumber} {comment.operation} {comment.number} = {comment.result}
        </h3>
      </div>

      {user?.id && (
        <>
          <p
            className="comments__reply"
            onClick={() => setshowAddReply(!showAddReply)}
          >
            Reply
          </p>
          {showAddReply && (
            <AddCommentForm
              setshowAddReply={setshowAddReply}
              setCommentsMain={setCommentsMain}
              postId={comment.postId}
              parentId={comment._id}
            />
          )}
        </>
      )}

      <Comments comments={comment?.replies} parentNumber={comment.result} />
    </div>
  );
};

export default CommentItem;
