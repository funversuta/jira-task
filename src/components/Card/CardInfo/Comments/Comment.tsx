import { FC } from "react";

import { CommentForm } from "./CommentForm";
import { IActiveComment } from "./Comments";

import { IComment } from "../../../../interface/interfaces";

import "./Comment.scss";

interface IProps {
  comment: IComment;
  replies: IComment[];
  activeComment: IActiveComment | null;
  setActiveComment: (comment: IActiveComment | null) => void;
  updateComment: (newComment: IActiveComment, inputText: string) => void;
  deleteComment: (commentId: number) => void;
}

export const Comment: FC<IProps> = ({
  comment,
  replies,
  deleteComment,
  activeComment,
  updateComment,
  setActiveComment,
}) => {
  return (
    <div className="comment">
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-user">{comment.user}</div>
          <div>{comment.createdAt}</div>
        </div>
      </div>
      <div className="comment-text">{comment.body}</div>
      <div className="comment-btnss">
        <div
          className="comment-btns"
          onClick={() => {
            setActiveComment({ id: comment.id, type: "replying" });
          }}
        >
          Reply
        </div>
        <div
          className="comment-btns"
          onClick={() => {
            deleteComment(comment.id);
          }}
        >
          Delete
        </div>
      </div>
      {activeComment?.type === "replying" &&
        activeComment.id === comment.id && (
          <CommentForm
            onSubmit={updateComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
          />
        )}
      {replies.length > 0 && (
        <div className="replies">
          {replies.map((reply) => (
            <Comment
              comment={reply}
              key={reply.id}
              deleteComment={deleteComment}
              setActiveComment={setActiveComment}
              activeComment={activeComment}
              updateComment={updateComment}
              replies={[]}
            />
          ))}
        </div>
      )}
    </div>
  );
};
