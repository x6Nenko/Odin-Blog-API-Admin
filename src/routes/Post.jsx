import { useParams, NavLink } from "react-router-dom";
import useData from "../hooks/useData"
import { DateTime } from "luxon";
import { useState } from "react";

const Post = () => {
  const { postid } = useParams();
  const [refetchPost, setRefetchPost] = useState(false);
  const postData = useData(`http://localhost:3000/posts/${postid}`, refetchPost);
  const commentsData = useData(`http://localhost:3000/posts/${postid}/comments`);
  const commentsArray = commentsData && commentsData.posts;

  function convertTime(time) {
    const createdAtDate = new Date(time);
    return DateTime.fromJSDate(createdAtDate).toLocaleString(DateTime.DATETIME_MED);
  }

  async function handlePublishBtn(e) {
    e.preventDefault();

    const updatePublishState = {
      text: postData.post.text,
      title: postData.post.title,
      published: !postData.post.published
    }

    try {
      const response = await fetch(`http://localhost:3000/posts/${postid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(updatePublishState)
      });

      if (response.ok) {
        setRefetchPost(!refetchPost);
        console.log("ok");
      } else {
        console.log("not ok");
      }
    } catch (error) {
      console.error('Something went wrong:', error);
      // Handle other error cases
    }
  }

  return (
    <main>
      {postData &&
        <article className="single-article">
          <h3>{postData.post.title}</h3>
          <p>Author: {postData.post.author.username}, posted at: {convertTime(postData.post.createdAt)}</p>
          <p className="single-article-text">{postData.post.text}</p>

          <div className="published-container">
            {postData.post.published === true ? 
              <div className="published-row">
                <p className="published">Published</p>
                <a href="#" onClick={(e) => handlePublishBtn(e)}>Unpublish</a>
              </div>
            :
              <div className="published-row">
                <p className="unpublished">Unpublished</p>
                <a href="#" onClick={(e) => handlePublishBtn(e)}>Publish</a>
              </div>
            }

            <hr />

            <div className="published-row">
              <NavLink
                to={`/editpost/${postid}`}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Edit post
              </NavLink>
            </div>

            <hr />

            <div className="published-row">
            <NavLink
                to={`/deletepost/${postid}`}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Delete post
              </NavLink>
            </div>
          </div>
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