import { useParams, NavLink } from "react-router-dom";
import useData from "../hooks/useData"
import { DateTime } from "luxon";
import { useState } from "react";

const Post = () => {
  const { postid } = useParams();
  const [refetchPost, setRefetchPost] = useState(false);
  const [refetchComments, setRefetchComments] = useState(false);
  const postData = useData(`http://localhost:3000/posts/${postid}`, refetchPost);
  const commentsData = useData(`http://localhost:3000/posts/${postid}/comments`, refetchComments);
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

  // ---------------------------------------
  // edit comments data
  const [formData, setFormData] = useState({
    text: '',
  });

  // if comment id is in the state then it means its in an edit process
  const [isEdit, setIsEdit] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function editCommentBtn(e, comment) {
    setFormData({text: comment.text})
    setIsEdit(comment._id);
  }

  function cancelEditBtn() {
    setIsEdit(null);
  }

  async function deleteCommentBtn(e, comment) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/posts/${postid}/comments/${comment._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("token")
        },
      });

      if (response.ok) {
        setRefetchComments(!refetchComments);
        console.log("ok");
      } else {
        console.log("not ok");
      }
    } catch (error) {
      console.error('Something went wrong:', error);
      // Handle other error cases
    }
  }

  async function handleSubmitCommentEdit() {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postid}/comments/${isEdit}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
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

        {isEdit && 
          <form onSubmit={handleSubmitCommentEdit}>
            <div className="input-holder">
              <label htmlFor="text">Edit the comment:</label>
              <textarea name="text" id="text" rows={3} value={formData.text} onChange={handleChange} required />
            </div>

            <button className="send-comment-btn" type="submit">Submit changes</button>
            <button className="cancel-btn" onClick={cancelEditBtn}>Cancel</button>
          </form>
        }

        {commentsData && commentsArray.map(comment => ( 
          <p className="comment" key={comment._id}>
            {comment.author.username}: {comment.text} <span>({convertTime(comment.createdAt)})&nbsp;
            <a href="#" onClick={(e) => editCommentBtn(e, comment)}>Edit</a> / <a href="#" onClick={(e) => deleteCommentBtn(e, comment)}>Delete</a></span>
          </p>
        ))}
      </section>
    </main>
  )
}

export default Post