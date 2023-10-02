import { FC, useState } from "react";

import { Input } from "../../../Input/Input";
import { Comment } from "./Comment";

import { ICard, IComment } from "../../../../interface/interfaces";

import "./Comment.scss";

interface IProps {
  card: ICard;
  setCardNewValues: (card: ICard) => void;
}
export interface IActiveComment {
  type: string;
  id: number;
}
export const Comments: FC<IProps> = ({ card, setCardNewValues }) => {
  const [activeComment, setActiveComment] = useState<IActiveComment | null>(
    null
  );
  const [text, setText] = useState("");
  const rootComments = card.comment.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId: number) =>
    card.comment
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text: string, parentId?: number | null) => {
    if (parentId === undefined) parentId = null;
    const createNewComment: IComment = {
      id: Math.random(),
      body: text,
      parentId,
      userId: 1,
      user: "user",
      createdAt: new Date().toLocaleDateString(),
    };
    setCardNewValues({
      ...card,
      comment: [...card.comment, createNewComment],
    });
  };

  const deleteComment = (commentId: number) => {
    const newComment = card.comment.filter(
      (comment) => comment.id !== commentId
    );
    setCardNewValues({
      ...card,
      comment: newComment,
    });
  };
  const updateComment = (newComment: IActiveComment, text: string) => {
    const createNewComment: IComment = {
      id: Math.random(),
      body: text,
      parentId: newComment.id,
      userId: 1,
      user: "user",
      createdAt: new Date().toLocaleDateString(),
    };
    setCardNewValues({
      ...card,
      comment: [...card.comment, createNewComment],
    });
  };
  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <Input
        text="Add Comment"
        placeholder="Enter comment text"
        onSubmit={setText}
        commentSubmit={addComment}
        displayClass="taskButton"
      />
      <div className="comment-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            deleteComment={deleteComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
};
