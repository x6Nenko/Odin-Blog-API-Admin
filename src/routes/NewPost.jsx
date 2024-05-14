import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const NewPost = () => {
  const navigate = useNavigate();
  const isLogged = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    published: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        return navigate("/");
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

            <button type="submit">Post new article</button>
          </form>
        </div>
      :
        <h2 className="recently-published-header">Only admin can access this site.</h2>
      }
    </main>
  )
}

export default NewPost