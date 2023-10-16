import "./styles.css";
import { useReducer, useState, useCallback, useEffect } from "react";
import data from "./data";
import { Button, TextField } from "@mui/material";
import { userData } from "./Interface";
import CardComponent from "./CardComponent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  checkDeleteUser,
  debounce,
  filterUsers,
  generateRandomID,
  getNextOdd,
  randomNumber,
  sortData,
} from "./Utils";
/** Instructions
   0. Fork this codesandbox and sync it with your github 
   1. import users data from data.ts
   1.1. Utilize TypeScript in your implementation
   2. On load:
   2.1. Filter the users data array to only include users where age >= 18
   2.2. Map the users data array to only include username, address, age and companyName
   2.3. Add a new ID to each user object, which should consist of a randomized sequence (6 characters) of the following: {ABCDEF123456}
   2.4. Sort the array (asc) by age, then by companyName
   2.5. Dispatch the data to the local users state
   3. Display the users' properties using a loop in the tsx, preferably in a styled "Card" form
   3.1. Add a "remove" button to each card - this should remove the user from the state
   3.2. Store the removed users in a new state instance
   3.3. Using the second input, add a method to search for a user's username with the onChange event
   3.4. The removed users should also be found if the input is being used to search for a username
   3.5. In the case where a removed user is shown during a search, there should be a "restore" button, which would insert the removed user back into the users array
   4. Extend the reducer:
   4.1. Count must always be >= 0, in all cases
   4.2. Add a case to increment count with a random number, between 1 and 10
   4.3. Add a case to increment to the nearest odd number, if already odd - increment to next odd
   4.4. Add a case to decrease the count by the input of the first textfield
   4.5. Add a case to reset the count
   4.6. Add buttons to said cases
   4.7. Add styling using MUI
   5. Provide the link to your forked repo with your answers
   */

function reducer(state: any, action: any) {
  switch (action.type) {
    case "incrementRandom":
      return { count: state.count + randomNumber() };
    case "incrementToNextOdd":
      return { count: getNextOdd(state.count) };
    case "increment":
      return { count: state.count + randomNumber() };
    case "decrement":
      return { count: state.count - 1 };
    case "decreaseByValue":
      return { count: Math.max(state.count - action.value, 0) };
    case "reset":
      return { count: 0 };
    default:
      throw new Error();
  }
}
export default function App() {
  const [users, setUsers] = useState<userData[]>([]);
  const [allUsers, setAllUsers] = useState<userData[]>([]);
  const [removeUsers, setRemoveUsers] = useState<userData[]>([]);
  const [minAge, setMinAge] = useState<number>(18);
  const [numberInput, setNumberInput] = useState(0);
  const [text] = useState("");
  const [countState, dispatch] = useReducer(reducer, { count: 0 });
  useEffect(() => {
    const mappedUsers: userData[] = data.map((user) => ({
      username: user.username,
      id: user.id,
      name: user.name,
      address: user.address,
      age: user.age,
      companyName: user.company.name,
      userId: generateRandomID(6),
    }));
    setAllUsers([...sortData(filterUsers(mappedUsers, minAge))]);
    setUsers(sortData(filterUsers(mappedUsers, minAge)));
  }, []);
  const removeUser = (userObj: userData, buttonText: string) => {
    if (buttonText === "Restore") {
      const updatedRemoveUsers = removeUsers.filter(
        (obj) => obj.userId !== userObj.userId,
      );
      setRemoveUsers(updatedRemoveUsers);
    } else {
      const updatedUsers = users.filter(
        (user, index) => index !== users.indexOf(userObj),
      );
      setUsers(updatedUsers);
      setRemoveUsers((prev) => [...prev, userObj]);
    }
  };

  const handleChange = (value: string) => {
    const filteredUsers = allUsers.filter((user) => {
      const usernameMatch = user.username
        .toLowerCase()
        .includes(value.toLowerCase());
      const isRemoved = checkDeleteUser(removeUsers, user.userId);
      return (value && usernameMatch) || (!value && !isRemoved);
    });

    setUsers(filteredUsers);
  };
  const seachFn = debounce(handleChange);
  return (
    <div className="App">
      <p style={{ marginBottom: 0 }}>Count: {countState.count}</p>
      <TextField
        defaultValue={numberInput}
        type="number"
        style={{ display: "block" }}
        onChange={(e) => setNumberInput(Number(e.target.value))}
      />
      <Button
        variant="contained"
        onClick={() =>
          dispatch({ type: "decreaseByValue", value: numberInput })
        }
      >
        decrement by Value
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          if (countState.count) dispatch({ type: "decrement" });
        }}
      >
        -
      </Button>
      <Button
        variant="contained"
        onClick={() => dispatch({ type: "increment" })}
      >
        +
      </Button>
      <Button
        variant="contained"
        onClick={() => dispatch({ type: "incrementRandom" })}
      >
        Increment Random Number
      </Button>
      <Button
        variant="contained"
        onClick={() => dispatch({ type: "incrementToNextOdd" })}
      >
        Add Next Odd
      </Button>
      <Button variant="contained" onClick={() => dispatch({ type: "reset" })}>
        Reset
      </Button>
      <p style={{ marginBottom: 0, marginTop: 30 }}>Search for a user</p>
      <TextField
        defaultValue={text}
        onChange={(e) => seachFn(e.target.value)}
        style={{ display: "block", margin: "auto" }}
      />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {users.map((obj: userData, index: number) => {
            return (
              <Grid item xs={6} key={obj.userId}>
                <CardComponent
                  removeUser={(buttonText) => {
                    removeUser(obj, buttonText);
                  }}
                  buttonText={
                    checkDeleteUser(removeUsers, obj.userId)
                      ? "Restore"
                      : "Remove"
                  }
                  companyName={obj?.companyName || ""}
                  userName={obj?.username || ""}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}
