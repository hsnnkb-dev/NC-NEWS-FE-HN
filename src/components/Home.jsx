import PostTopic from "./PostTopicCard";
import toast  from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import PostTopicCard from "./PostTopicCard";

export default function Home() {
  const { currentUser } = useContext(UserContext);
  const toastStyle = {
    style: {
      border: '2px solid black',
      borderRadius: 0,
      color: 'black',
      boxShadow: '0.2rem 0.2rem black',
      backgroundColor: '#FAF9F6',
    }
  }
  const toastStyleBold = {
    style: {
      border: '2px solid black',
      borderRadius: 0,
      color: 'black',
      boxShadow: '0.2rem 0.2rem black',
      backgroundColor: '#FAF9F6',
      fontWeight: 'bold'
    }
  }

  const greetUser = () => {
    (currentUser.username === "Guest") ? 
      toast('Log in for more fun 🎉', toastStyle) :
      toast(`Welcome, ${currentUser.username}`, toastStyleBold)
  }

  return (
    <main className="Home">
      <h2>home</h2>
      <p>Welcome to <span onClick={() => greetUser()}>Yesterday's News 📰</span>! Navigate using the links above. Log in to post topics, articles and comments. You can also vote on articles and comments, once logged in!</p>
      <PostTopicCard />
      <p>OR</p>
      <PostTopicCard />
    </main>
  )
}