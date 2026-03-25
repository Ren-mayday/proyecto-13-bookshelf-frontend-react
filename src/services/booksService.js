const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export const getAllBooks = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_URL}/books?${params}`);
  const data = await response.json();
  return data;
};

export const getBookById = async (id) => {
  const response = await fetch(`${API_URL}/books/${id}`);
  const data = await response.json();
  return data;
};
