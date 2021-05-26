const users = [
  {
    username: "aditya",
    password: "agrawal",
  },
  {
    username: "aishwarya",
    password: "bhat",
  },
];

const findUserByUsername = (username) =>
  users.find((user) => user.username === username);

export const fakeAuthApi = (username, password) => {
  return new Promise((resolve, reject) => {
    const doesUserExists = findUserByUsername(username);
    setTimeout(() => {
      if (doesUserExists.password === password) {
        console.log("resolved")
        resolve({ success: true, status: 200 });
      } else {
        reject({ success: false, status: 401 });
      }
    }, 2000);
  });
};
