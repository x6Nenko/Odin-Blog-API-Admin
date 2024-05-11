import { useParams } from "react-router-dom";
import useData from "../hooks/useData"
import { DateTime } from "luxon";

const Post = () => {
  const { postid } = useParams();
  const postData = useData(`http://localhost:3000/posts/${postid}`);
  const commentsData = useData(`http://localhost:3000/posts/${postid}/comments`);
  const commentsArray = commentsData && commentsData.posts;

  function convertTime(time) {
    const createdAtDate = new Date(time);
    return DateTime.fromJSDate(createdAtDate).toLocaleString(DateTime.DATETIME_MED);
  }

  return (
    <main>
      {postData &&
        <article className="single-article">
          <h3>{postData.post.title}</h3>
          <p>Author: {postData.post.author.username}, posted at: {convertTime(postData.post.createdAt)}</p>
          <p className="single-article-text">{postData.post.text}</p>

        </article>
      }

      <section className="comments-section">
        <h4>Comments</h4>

        {commentsData && commentsArray.map(comment => ( 
          <p className="comment" key={comment._id}>{comment.author.username}: {comment.text} <span>({convertTime(comment.createdAt)})</span></p>
        ))}
      </section>
    </main>
  )
}

export default Post