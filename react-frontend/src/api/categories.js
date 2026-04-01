let categories = [
  { id: 1, name: "Salary", type: "INCOME" },
  { id: 2, name: "Food", type: "EXPENSE" },
  { id: 3, name: "Investments", type: "INCOME" },
];

let idCounter = 4;

export const getCategories = () => {
  return Promise.resolve([...categories]);
};

export const createCategory = (data) => {
  const newCat = { id: idCounter++, ...data };
  categories.push(newCat);
  return Promise.resolve(newCat);
};

export const deleteCategory = (id) => {
  categories = categories.filter((c) => c.id !== id);
  return Promise.resolve();
};

export const updateCategory = (id, data) => {
  categories = categories.map((c) =>
    c.id === id ? { ...c, ...data } : c
  );

  const updated = categories.find((c) => c.id === id);
  return Promise.resolve(updated);
};