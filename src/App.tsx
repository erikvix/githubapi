import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  const [user, setUser] = useState([]);
  const [userName, setUsername] = useState("");

  const handleGetUser = (userName: string) => {
    return fetch(`https://api.github.com/users/${userName}`)
      .then((response) => response.json())
      .then(({ users }) => setUser(users))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="max-w-screen-xl flex justify-center items-center h-screen mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Github Search</CardTitle>
          <div className="flex gap-1">
            <Input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Button onClick={() => handleGetUser(userName)}>Send</Button>
          </div>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default App;
