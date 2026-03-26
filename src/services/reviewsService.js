const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export const getReviewsByBook = async (bookId) => {
  const response = await fetch(`${API_URL}/reviews?bookId=${bookId}`);
  const data = await response.json();
  return data;
};

export const createReview = async (bookId, reviewData, token) => {
  const response = await fetch(`${API_URL}/reviews/${bookId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });
  const data = await response.json();
  return data;
};

export const deleteReview = async (id, token) => {
  const response = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
};
