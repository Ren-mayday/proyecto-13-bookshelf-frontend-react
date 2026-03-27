import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Flex, Button, Spinner, Heading, Textarea, chakra as Chakra } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { getBookById, deleteBook } from "../services/booksService";
import { getReviewsByBook, createReview, updateReview, deleteReview } from "../services/reviewsService";
import useAuth from "../hooks/useAuth";
import ReviewCard from "../components/ReviewCard";
import StarRating from "../components/StarRating";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { colorMode } = useColorMode();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const isDark = colorMode === "dark";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookData, reviewsData] = await Promise.all([getBookById(id), getReviewsByBook(id)]);
        setBook(bookData);
        setReviews(reviewsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Comprueba si el usuario ya tiene una reseña en este libro
  const userReview = user ? reviews.find((r) => r.user?._id === user.id || r.user === user.id) : null;

  const handleDeleteBook = async () => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este libro?")) return;
    try {
      await deleteBook(id, token);
      navigate("/books");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitReview = async () => {
    if (!comment.trim()) return;
    setReviewError("");
    setSubmitting(true);
    try {
      const data = await createReview(id, { rating, comment }, token);

      if (!data._id) {
        setReviewError(typeof data === "string" ? data : data.message || "Error al publicar la reseña");
        return;
      }

      const newReview = {
        ...data,
        user: { _id: user.id, userName: user.userName || user.email },
      };

      setReviews([newReview, ...reviews]);
      setComment("");
      setRating(5);
    } catch (error) {
      setReviewError("Error de conexión con el servidor");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("¿Eliminar esta reseña?")) return;
    try {
      await deleteReview(reviewId, token);
      setReviews(reviews.filter((r) => r._id !== reviewId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateReview = async (reviewId, newComment, newRating) => {
    try {
      const data = await updateReview(reviewId, { newComment, newRating }, token);
      if (!data.review) return;
      setReviews(reviews.map((r) => (r._id === reviewId ? { ...r, comment: newComment, rating: newRating } : r)));
    } catch (error) {
      console.error(error);
    }
  };

  const isBookOwner = user && book && (user.id === book.createdBy || user.role === "admin");

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner color="#ca2d1e" size="xl" />
      </Flex>
    );
  }

  if (!book) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Chakra.p color="#9a9a9a">Libro no encontrado</Chakra.p>
      </Flex>
    );
  }

  return (
    <Box bg={isDark ? "#0d0d0d" : "#faf7f5"} minH="100vh" px="var(--spacing-lg)" py="var(--spacing-xl)">
      <Box maxW="900px" mx="auto">
        {/* Info del libro */}
        <Box
          bg={isDark ? "#1a1a1a" : "#f0eae7"}
          borderRadius="var(--radius-lg)"
          p="var(--spacing-lg)"
          mb="var(--spacing-lg)"
          border="1px solid"
          borderColor={isDark ? "#222222" : "#e2d8d4"}
        >
          <Flex justify="space-between" align="flex-start" mb="var(--spacing-md)">
            <Box>
              <Heading
                as="h1"
                fontFamily="var(--font-title)"
                fontSize="2rem"
                fontWeight="700"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                mb="var(--spacing-xs)"
              >
                {book.title}
              </Heading>
              <Chakra.p fontFamily="var(--font-body)" fontSize="1.1rem" color="#9a9a9a">
                {book.author}
              </Chakra.p>
            </Box>

            {isBookOwner && (
              <Flex gap="var(--spacing-sm)">
                <Button
                  variant="outline"
                  borderColor="#ca2d1e"
                  color="#ca2d1e"
                  _hover={{ bg: "#ca2d1e", color: "#fff" }}
                  borderRadius="var(--radius-lg)"
                  size="sm"
                  onClick={() => navigate(`/books/${id}/edit`)}
                >
                  Editar
                </Button>
                <Button
                  bg="#ca2d1e"
                  color="#fff"
                  _hover={{ bg: "#a12418" }}
                  borderRadius="var(--radius-lg)"
                  size="sm"
                  onClick={handleDeleteBook}
                >
                  Eliminar
                </Button>
              </Flex>
            )}
          </Flex>

          <Flex gap="var(--spacing-sm)" mb="var(--spacing-md)" flexWrap="wrap">
            <Box
              bg="#ca2d1e"
              color="#fff"
              px="var(--spacing-sm)"
              py="2px"
              borderRadius="var(--radius-sm)"
              fontSize="0.8rem"
            >
              {book.genre}
            </Box>
            {book.year && (
              <Box
                bg={isDark ? "#222222" : "#e2d8d4"}
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                px="var(--spacing-sm)"
                py="2px"
                borderRadius="var(--radius-sm)"
                fontSize="0.8rem"
              >
                {book.year}
              </Box>
            )}
            {book.pages && (
              <Box
                bg={isDark ? "#222222" : "#e2d8d4"}
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                px="var(--spacing-sm)"
                py="2px"
                borderRadius="var(--radius-sm)"
                fontSize="0.8rem"
              >
                {book.pages} páginas
              </Box>
            )}
          </Flex>

          {book.synopsis && (
            <Chakra.p
              fontFamily="var(--font-body)"
              fontSize="1rem"
              color={isDark ? "#9a9a9a" : "#6b6360"}
              lineHeight="1.7"
            >
              {book.synopsis}
            </Chakra.p>
          )}
        </Box>

        {/* Formulario reseña */}
        {user ? (
          userReview ? (
            <Box
              bg={isDark ? "#1a1a1a" : "#f0eae7"}
              borderRadius="var(--radius-lg)"
              p="var(--spacing-lg)"
              mb="var(--spacing-lg)"
              textAlign="center"
              border="1px solid"
              borderColor={isDark ? "#222222" : "#e2d8d4"}
            >
              <Chakra.p fontFamily="var(--font-body)" color="#9a9a9a">
                Ya has escrito una reseña para este libro. Puedes editarla o eliminarla desde tu reseña.
              </Chakra.p>
            </Box>
          ) : (
            <Box
              bg={isDark ? "#1a1a1a" : "#f0eae7"}
              borderRadius="var(--radius-lg)"
              p="var(--spacing-lg)"
              mb="var(--spacing-lg)"
              border="1px solid"
              borderColor={isDark ? "#222222" : "#e2d8d4"}
            >
              <Heading
                as="h3"
                fontFamily="var(--font-title)"
                fontSize="1.2rem"
                fontWeight="700"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                mb="var(--spacing-md)"
              >
                Añadir reseña
              </Heading>

              <Flex align="center" gap="var(--spacing-sm)" mb="var(--spacing-md)">
                <Chakra.p fontFamily="var(--font-body)" color={isDark ? "#f5f0ee" : "#1a1a1a"}>
                  Puntuación:
                </Chakra.p>
                <StarRating rating={rating} onRate={setRating} size="1.5rem" />
              </Flex>

              <Textarea
                placeholder="Escribe tu reseña..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                bg={isDark ? "#0d0d0d" : "#faf7f5"}
                border="1px solid"
                borderColor={isDark ? "#222222" : "#e2d8d4"}
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                mb="var(--spacing-md)"
                p="var(--spacing-md)"
                _focus={{ borderColor: "#ca2d1e" }}
                borderRadius="var(--radius-md)"
                rows={4}
              />

              {reviewError && (
                <Box
                  bg="#f9e0de"
                  border="1px solid"
                  borderColor="#ca2d1e"
                  borderRadius="var(--radius-sm)"
                  px="var(--spacing-md)"
                  py="var(--spacing-sm)"
                  mb="var(--spacing-md)"
                >
                  <Chakra.p fontFamily="var(--font-body)" fontSize="0.85rem" color="#a12418">
                    {reviewError}
                  </Chakra.p>
                </Box>
              )}

              <Button
                bg="#ca2d1e"
                color="#fff"
                _hover={{ bg: "#a12418" }}
                borderRadius="var(--radius-lg)"
                onClick={handleSubmitReview}
                loading={submitting}
                px="var(--spacing-lg)"
              >
                Publicar reseña
              </Button>
            </Box>
          )
        ) : (
          <Box
            bg={isDark ? "#1a1a1a" : "#f0eae7"}
            borderRadius="var(--radius-lg)"
            p="var(--spacing-lg)"
            mb="var(--spacing-lg)"
            textAlign="center"
            border="1px solid"
            borderColor={isDark ? "#222222" : "#e2d8d4"}
          >
            <Chakra.p fontFamily="var(--font-body)" color="#9a9a9a" mb="var(--spacing-md)">
              Inicia sesión para dejar una reseña
            </Chakra.p>
            <Button
              bg="#ca2d1e"
              color="#fff"
              _hover={{ bg: "#a12418" }}
              borderRadius="var(--radius-lg)"
              onClick={() => navigate("/login")}
              px="var(--spacing-lg)"
            >
              Iniciar sesión
            </Button>
          </Box>
        )}

        {/* Lista de reseñas */}
        <Heading
          as="h2"
          fontFamily="var(--font-title)"
          fontSize="1.5rem"
          fontWeight="700"
          color={isDark ? "#f5f0ee" : "#1a1a1a"}
          mb="var(--spacing-md)"
        >
          Reseñas ({reviews.length})
        </Heading>

        {reviews.length === 0 ? (
          <Chakra.p fontFamily="var(--font-body)" color="#9a9a9a">
            Aún no hay reseñas. ¡Sé el primero!
          </Chakra.p>
        ) : (
          <Flex direction="column" gap="var(--spacing-md)">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onDelete={handleDeleteReview}
                onUpdate={handleUpdateReview}
              />
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default BookDetails;
