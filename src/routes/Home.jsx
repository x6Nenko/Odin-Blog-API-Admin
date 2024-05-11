import useData from "../hooks/useData"
import { Link } from "react-router-dom";

const Home = () => {
  const data = useData('http://localhost:3000/posts');
  const postsArray = data && data.posts;

  return (
    <main>
      <h2 className="recently-published-header">Recently published</h2>

      <section className="recently-published-container">
        {postsArray && postsArray.map(post => ( 
          <article className="recently-published-article" key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.text}</p>

            <Link to={"/posts/" + post._id}>Read more...</Link>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Home