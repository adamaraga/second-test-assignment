import { useEffect, useState } from "react";
import { CommentType } from "../types";
import CommentItem from "./CommentItem";

const Comments = ({
  comments,
  parentNumber,
}: {
  comments: CommentType[];
  parentNumber: number;
}) => {
  const [showMore, setShowMore] = useState(true);
  const [commentsMain, setCommentsMain] = useState<CommentType[]>([]);

  useEffect(() => {
    if (typeof comments?.[0] === "string") {
      setShowMore(false);
    }
    setCommentsMain(comments);
  }, [comments]);

  return (
    <div className="comments">
      {showMore ? (
        commentsMain?.map((comment) => {
          return (
            <CommentItem
              key={comment._id}
              comment={comment}
              setCommentsMain={setCommentsMain}
              parentNumber={parentNumber}
            />
          );
        })
      ) : (
        <p className="comments__showmore">show more</p>
      )}
    </div>
  );
};

export default Comments;
