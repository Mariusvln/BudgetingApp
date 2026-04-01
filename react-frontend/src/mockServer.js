import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "./api/categories";

import { getUsers } from "./api/users";

const originalFetch = window.fetch;

window.fetch = async (url, options = {}) => {
  const { method = "GET" } = options;

  // ===== CATEGORIES =====
  if (url === "/api/categories" && method === "GET") {
    const data = await getCategories();
    return mockResponse(data);
  }

  if (url === "/api/categories" && method === "POST") {
    const body = JSON.parse(options.body);
    const data = await createCategory(body);
    return mockResponse(data);
  }

  if (url.startsWith("/api/categories/")) {
    const id = Number(url.split("/").pop());

    if (method === "DELETE") {
      await deleteCategory(id);
      return mockResponse({});
    }

    if (method === "PUT") {
      const body = JSON.parse(options.body);
      const data = await updateCategory(id, body);
      return mockResponse(data);
    }
  }

  // ===== USERS =====
  if (url === "/api/users" && method === "GET") {
    const data = await getUsers();
    return mockResponse(data);
  }

  return originalFetch(url, options);
};

const mockResponse = (data) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  });
};