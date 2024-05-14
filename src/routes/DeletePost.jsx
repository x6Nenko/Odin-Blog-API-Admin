import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useData from "../hooks/useData";

const DeletePost = () => {
  const { postid } = useParams();
  const postData = useData(`https://pleasant-utopian-duke.glitch.me/posts/${postid}`);
  const navigate = useNavigate();
  const isLogged = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://pleasant-utopian-duke.glitch.me/posts/${postid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("token")
        },
      });

      if (response.ok) {
        return navigate(`/`);
      } else {
        const responseData = await response.json(); // Extract JSON from the response
        console.error('Something went wrong:', responseData);
      }
    } catch (error) {
      console.error('Something went wrong:', error);
      // Handle other error cases
    }
  };

  return (
    <main>
      {isLogged.isLogged ? 
        <div className="new-post-form-container">
          {postData && 
            <form onSubmit={handleSubmit} className="sign-form">
              <p>Are you sure you want to delete the <strong>{postData.post.title}</strong>?</p>

              <button type="submit">Delete</button>
            </form>
          }
        </div>
      :
        <h2 className="recently-published-header">Only admin can access this site.</h2>
      }
    </main>
  )
}

export default DeletePost