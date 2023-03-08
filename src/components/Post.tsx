import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import Styles from "./Post.module.css";

interface CommentProps {
  id: number;
  content: string;
}

interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

export interface PostProps {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface Post {
  post: PostProps;
}

export function Post({ post }: Post) {
  const [comments, setComments] = useState<CommentProps[]>([
    { id: 1, content: "Muito bom!!" },
  ]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    const newComment = {
      id: comments.length + 1,
      content: newCommentText,
    };

    setComments([...comments, newComment]);

    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  function deleteComment(commentId: number) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment.id !== commentId;
    });

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={Styles.post}>
      <header>
        <div className={Styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={Styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={Styles.content}>
        {post.content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>
      <form
        onSubmit={(e) => handleCreateNewComment(e)}
        className={Styles.commentForm}
      >
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          value={newCommentText}
          onChange={(e) => handleNewCommentChange(e)}
          onInvalid={handleNewCommentInvalid}
          placeholder="Deixe seu comentário"
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={Styles.commentsList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              content={comment.content}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
