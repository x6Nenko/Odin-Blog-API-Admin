import { useState } from "react";
import useData from "../hooks/useData"
import { Link } from "react-router-dom";

const Home = () => {
  //const userData = useData();
  const [changePublishState, setChangePublishState] = useState(false);
  const postsData = useData('http://localhost:3000/posts', changePublishState);
  const postsArray = postsData && postsData.posts;

  // swap between tru/false whenever publish state changes for any article
  // so it re-renders the page with updated data

  async function handlePublishBtn(e, post) {
    e.preventDefault();

    const updatePublishState = {
      text: post.text,
      title: post.title,
      published: !post.published
    }

    try {
      const response = await fetch(`http://localhost:3000/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(updatePublishState)
      });

      if (response.ok) {
        setChangePublishState(!changePublishState);
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
      <h2 className="recently-published-header">Recently published</h2>

      <section className="recently-published-container">
        {postsArray && postsArray.map(post => ( 
          <article className="recently-published-article" key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.text}</p>

            {post.published === true ? 
              <div className="published-container">
                <p className="published">Published</p>
                <a href="#" onClick={(e) => handlePublishBtn(e, post)}>Unpublish</a>
              </div>
            :
              <div className="published-container">
                <p className="unpublished">Unpublished</p>
                <a href="#" onClick={(e) => handlePublishBtn(e, post)}>Publish</a>
              </div>
            }

            <Link to={"/posts/" + post._id}>Read more & edit...</Link>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Home