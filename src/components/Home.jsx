import toast  from "react-hot-toast";
import PostTopicCard from "./PostTopicCard";
import PostArticleCard from "./PostArticleCard";
import Footer from "./Footer";

export default function Home() {
  const toastStyle = {
    style: {
      border: '2px solid black',
      borderRadius: 0,
      color: 'black',
      boxShadow: '0.2rem 0.2rem black',
      backgroundColor: '#FAF9F6',
    }
  }

  const greetUser = () => {
    const randomNumber = Math.round(Math.random() * 11);
    let easterEggMessage = 'Log in for more fun ๐';
    switch (randomNumber) {
      case 0:
        easterEggMessage = 'The Count of Monte Crusto ๐ฅง';
        break;
      case 1:
        easterEggMessage = 'NEVER MUTATE THE STATE! ๐ง';
        break;
      case 2:
        easterEggMessage = 'weird flex ๐ช, but ok';
        break;
      case 3:
        easterEggMessage = 'Scrum daddy ๐ฅธ???';
        break;
      case 4:
        easterEggMessage = 'It\'s dangerous to go alone, take this ๐ก๏ธ';
        break;
      case 5:
        easterEggMessage = 'Better luck next time ๐โโฌ';
        break;
      case 6:
        easterEggMessage = 'Status 418 - I\'m a teapot ๐ซ';
        break;
      case 7:
        easterEggMessage = '/nchelp ๐';
        break;
      case 8:
        easterEggMessage = '๐ฝ';
        break;
      case 9:
        easterEggMessage = '๐ชจ ๐งป โ๏ธ';
        break;
      case 10:
        easterEggMessage = 'Thanks for visiting!';
        break;
      case 11:
        easterEggMessage = 'Log in for more fun ๐';
        break;
    }
      
    toast(easterEggMessage, toastStyle)
  }

  return (
    <>
    <main className="Home">
      <h2>home</h2>
      <p id="content">
        Welcome to <span onClick={() => greetUser()}>Yesterday's News ๐ฐ</span>! 
        Navigate to different pages using the links above. 
        Log in to post topics, articles and comments. 
        Once logged in, you can vote on articles and comments.
        You can also delete articles and comments that you've made.
        Get started now by logging in and posting an article or a topic!
      </p>
      <PostArticleCard />
      <p id="or">OR</p>
      <PostTopicCard />
      
    </main>
    <Footer />
    </>
  )
}