let users = [
  { id: 1, name: "John Doe", email: "john@gmail.com", role: "FREE" },
  { id: 2, name: "Anna Smith", email: "anna@gmail.com", role: "PREMIUM" },
  { id: 3, name: "Mike Brown", email: "mike@gmail.com", role: "FREE" },
];

export const getUsers = () => {
  return Promise.resolve([...users]);
};