import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useData from "../hooks/useData";

const EditPost = () => {
  const { postid } = useParams();
  const postData = useData(`http://localhost:3000/posts/${postid}`);
  const navigate = useNavigate();
  const isLogged = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    published: false,
  });

  useEffect(() => {
    if (postData) {
      setFormData({
        title: postData.post.title,
        text: postData.post.text,
        published: postData.post.published,
      });
    }
  }, [postData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/posts/${postid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        return navigate(`/posts/${postid}`);
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
          <form onSubmit={handleSubmit} className="sign-form">
            <div className="input-holder">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required></input>
            </div>

            <div className="input-holder">
              <label htmlFor="text">Text</label>
              <textarea name="text" id="text" rows={10} value={formData.text} onChange={handleChange} required />
            </div>

            <button type="submit">Submit changes</button>
          </form>
        </div>
      :
        <h2 className="recently-published-header">Only admin can access this site.</h2>
      }
    </main>
  )
}

export default EditPost