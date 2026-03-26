import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Flex, Button, Spinner, Heading, Textarea, chakra as Chakra } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { getBookById, deleteBook } from "../services/booksService";
import { getReviewsByBook, createReview, deleteReview } from "../services/reviewsService";
import useAuth from "../hooks/useAuth";
import ReviewCard from "../components/ReviewCard";

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
    setSubmitting(true);
    try {
      const newReview = await createReview(id, { rating, comment }, token);
      setReviews([newReview, ...reviews]);
      setComment("");
      setRating(5);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("¿Eliminar esta reseña?")) return;
    try {
      await deleteReview(reviewId, token);
      setReviews(reviews.filter((r) => r.id !== reviewId));
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
    <Box bg={colorMode === "dark" ? "#0d0d0d" : "#faf7f5"} minH="100vh" px="var(--spacing-lg)" py="var(--spacing-xl)">
      <Box maxW="900px" mx="auto">
        {/* Info del libro */}
        <Box
          bg={colorMode === "dark" ? "#1a1a1a" : "#f0eae7"}
          borderRadius="var(--radius-lg)"
          p="var(--spacing-lg)"
          mb="var(--spacing-lg)"
          border="1px solid"
          borderColor={colorMode === "dark" ? "#222222" : "#e2d8d4"}
        >
          <Flex justify="space-between" align="flex-start" mb="var(--spacing-md)">
            <Box>
              <Heading
                as="h1"
                fontFamily="var(--font-title)"
                fontSize="2rem"
                fontWeight="700"
                color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
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
                bg={colorMode === "dark" ? "#222222" : "#e2d8d4"}
                color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
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
                bg={colorMode === "dark" ? "#222222" : "#e2d8d4"}
                color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
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
              color={colorMode === "dark" ? "#9a9a9a" : "#6b6360"}
              lineHeight="1.7"
            >
              {book.synopsis}
            </Chakra.p>
          )}
        </Box>

        {/* Formulario reseña */}
        {user ? (
          <Box
            bg={colorMode === "dark" ? "#1a1a1a" : "#f0eae7"}
            borderRadius="var(--radius-lg)"
            p="var(--spacing-lg)"
            mb="var(--spacing-lg)"
            border="1px solid"
            borderColor={colorMode === "dark" ? "#222222" : "#e2d8d4"}
          >
            <Heading
              as="h3"
              fontFamily="var(--font-title)"
              fontSize="1.2rem"
              fontWeight="700"
              color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
              mb="var(--spacing-md)"
            >
              Añadir reseña
            </Heading>

            <Flex align="center" gap="var(--spacing-sm)" mb="var(--spacing-md)">
              <Chakra.p fontFamily="var(--font-body)" color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}>
                Puntuación:
              </Chakra.p>
              {[1, 2, 3, 4, 5].map((star) => (
                <Box
                  key={star}
                  cursor="pointer"
                  fontSize="1.5rem"
                  color={star <= rating ? "#ca2d1e" : "#9a9a9a"}
                  onClick={() => setRating(star)}
                >
                  ★
                </Box>
              ))}
            </Flex>

            <Textarea
              placeholder="Escribe tu reseña..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              bg={colorMode === "dark" ? "#0d0d0d" : "#faf7f5"}
              border="1px solid"
              borderColor={colorMode === "dark" ? "#222222" : "#e2d8d4"}
              color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
              mb="var(--spacing-md)"
              _focus={{ borderColor: "#ca2d1e" }}
              borderRadius="var(--radius-md)"
              rows={4}
            />

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
        ) : (
          <Box
            bg={colorMode === "dark" ? "#1a1a1a" : "#f0eae7"}
            borderRadius="var(--radius-lg)"
            p="var(--spacing-lg)"
            mb="var(--spacing-lg)"
            textAlign="center"
            border="1px solid"
            borderColor={colorMode === "dark" ? "#222222" : "#e2d8d4"}
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
          color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
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
              <ReviewCard key={review._id} review={review} onDelete={handleDeleteReview} />
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default BookDetails;
