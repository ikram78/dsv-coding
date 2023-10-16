//@ts-nocheck
import { userData } from "./Interface";

export const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};
export const getNextOdd = (num) => {
  return num % 2 === 0 ? num + 1 : num + 2;
};
export const randomNumber = () => {
  return Math.floor(Math.random() * 10) + 1;
};
export const generateRandomID = (length: number) => {
  const characters = "ABCDEF123456";
  let randomID = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomID += characters.charAt(randomIndex);
  }

  return randomID;
};

export const sortData = (usersList: userData[]) => {
  return usersList.sort((a, b) => {
    if (a.age < b.age) return -1;
    if (a.age > b.age) return 1;
    return a.companyName.localeCompare(b.companyName);
  });
};

export const filterUsers = (users: userData[], minAge: number) => {
  return users.filter((user) => user.age >= minAge);
};
export const checkDeleteUser = (
  removedUsedList: userData[],
  userID: string,
) => {
  return removedUsedList.some((obj: userData) => obj.userId == userID);
};
