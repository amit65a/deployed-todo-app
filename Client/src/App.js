import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookies, removeCookies] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken
  const [tasks, setTasks] = useState(null)
  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      // console.log(json);
      setTasks(json)

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    if (authToken && userEmail) {
      getData()
    }
  }, [])

  //Sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))
  return (
    <div className="app">
      {(!authToken || !userEmail) && <Auth />}
      {authToken && userEmail && <>
        <ListHeader listName={"🌴 Holiday tick list"} getData={getData} />
        <p className="user-email">Welcome back {userEmail}</p>
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>}
      <p className="copyright">© creative group</p>
    </div>
  );
}

export default App;
