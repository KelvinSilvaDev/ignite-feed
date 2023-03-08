import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import Styles from "./Comment.module.css";

interface CommentProps {
  id: number;
  content: string;
  onDeleteComment: (comment: number) => void;
}

export function Comment({ id, content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(id);
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  return (
    <div className={Styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/kelvinsilvadev.png" />
      <div className={Styles.commentBox}>
        <div className={Styles.commentContent}>
          <header>
            <div className={Styles.authorAndTime}>
              <strong>Kelvin Silva</strong>
              <time title="11 de Maio às 08:13" dateTime="2022-05-11 08:13:30">
                Cerca de 1h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir<span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
