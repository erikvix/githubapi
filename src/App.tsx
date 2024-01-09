import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Avatar, AvatarImage } from "./components/ui/avatar";
import { LuGithub, LuMapPin } from "react-icons/lu";

interface User {
  id: number;
  login: string;
  avatar_url: string;
  location: string;
  bio: string;
  followers: number;
  following: number;
}

function App(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUsername] = useState<string>("");

  const handleGetUser = (): void => {
    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => {
        return response.json();
      })
      .then((userData: User) => {
        setUsers([userData]);
        console.log(userData)
      })
      .catch((err: Error) => {
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
              }}
            />
            <Button onClick={() => handleGetUser()}>Send</Button>
          </div>
        </CardHeader>
        <CardContent>
          {users.length > 0 ? (
            <div>
              {users.map((user) => (
                <Card key={user.id} className="flex items-center flex-col">
                  <CardHeader className="flex items-center flex-col">
                    <Avatar>
                      <AvatarImage src={user.avatar_url} />
                    </Avatar>
                    <CardTitle>{user.login}</CardTitle>
                    {
                      user.location === null ?  (null) : (

                    <CardDescription className="flex items-center gap-1">
                      <LuMapPin />  
                      {user.location}
                    </CardDescription>
                      )
                    }
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{user.bio}</CardDescription>
                    <div className="flex gap-2">
                      <CardDescription>
                        Followers: {user.followers}
                      </CardDescription>
                      <CardDescription>
                        Following: {user.following}
                      </CardDescription>
                    </div>
                    <a href={`https://github.com/${userName}?tab=repositories`}>
                      <Card className="p-4 flex items-center gap-2">
                        <LuGithub />
                        <h1>Repositories</h1>
                      </Card>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm font-light">
              Enter a GitHub user
            </p>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default App;
