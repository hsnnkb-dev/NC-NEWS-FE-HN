import { UserContext } from "../contexts/UserContext";
import { TopicContext } from "../contexts/TopicContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { postTopic } from "../utils/api";

export default function TopicAdder() {
  const [ isDisabled, setIsDisabled ] = useState(false);
  const [ topicSlug , setTopicSlug ] = useState("");
  const [ topicDescription , setTopicDescription ] = useState("");
  const { currentUser } = useContext(UserContext);
  const { currentTopics, setCurrentTopics } = useContext(TopicContext);
  const toastStyle = {
    style: {
      border: '2px solid black',
      borderRadius: 0,
      color: 'black',
      boxShadow: '0.2rem 0.2rem black',
      backgroundColor: '#FAF9F6',
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();  
    if (currentUser.username === "Guest") {
      toast(`You need to log in before posting`, toastStyle);
    } else if (topicSlug === "" || topicDescription === "") {
      toast('Cannot leave any fields blank', toastStyle);
    } else {
      postTopic(topicSlug, topicDescription)
        .then(newTopic => {
          console.log(newTopic)
          setCurrentTopics(currentTopics => [...currentTopics, newTopic[0]]);
          setIsDisabled(false);
        })
        .catch(() => {
          toast(`Could not post topic, try again later`, toastStyle);
          setIsDisabled(false);
        })
    }
  }


  return (
    <section>
      <h3>Post a Topic</h3>
      <form className="TopicAdder" onSubmit={event => handleSubmit(event)}>
            <input
              placeholder="Topic Title"
              value={topicSlug} 
              onChange={event => setTopicSlug(event.target.value)} 
              type="text" />
              <input
              placeholder="Topic Description"
              value={topicDescription} 
              onChange={event => setTopicDescription(event.target.value)} 
              type="text" />
            <button disabled={isDisabled} >Post Topic</button>
      </form>
      {/* {(topicMessage) ? <p className="CommentMessage">{topicMessage}</p> : null } */}
    </section>
  )
}