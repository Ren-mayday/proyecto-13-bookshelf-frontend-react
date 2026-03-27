import { useEffect, useState } from "react";
import { Box, Flex, Heading, Spinner, chakra as Chakra, Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getReviewsByUser } from "../services/reviewsService";
import StarRating from "../components/StarRating";

const Profile = () => {
  const { colorMode } = useColorMode();
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const isDark = colorMode === "dark";

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByUser(user.id, token);
        // De más antiguo a más nuevo
        setReviews([...data].reverse());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchReviews();
  }, [user, token]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box bg={isDark ? "#0d0d0d" : "#faf7f5"} minH="100vh" px="var(--spacing-lg)" py="var(--spacing-xl)">
      <Box maxW="700px" mx="auto">
        <Heading
          as="h1"
          fontFamily="var(--font-title)"
          fontSize="2.5rem"
          fontWeight="700"
          color={isDark ? "#f5f0ee" : "#1a1a1a"}
          mb="var(--spacing-lg)"
        >
          Mi perfil
        </Heading>

        {/* Tarjeta de usuario */}
        <Box
          bg={isDark ? "#1a1a1a" : "#f0eae7"}
          borderRadius="var(--radius-lg)"
          p="var(--spacing-lg)"
          border="1px solid"
          borderColor={isDark ? "#222222" : "#e2d8d4"}
          mb="var(--spacing-lg)"
        >
          <Flex align="center" gap="var(--spacing-md)" mb="var(--spacing-lg)">
            <Flex w="64px" h="64px" borderRadius="50%" bg="#ca2d1e" align="center" justify="center" flexShrink={0}>
              <Chakra.span fontFamily="var(--font-title)" fontSize="1.5rem" fontWeight="700" color="#fff">
                {user?.email?.[0]?.toUpperCase() || "?"}
              </Chakra.span>
            </Flex>
            <Box>
              <Heading
                as="h2"
                fontFamily="var(--font-title)"
                fontSize="1.3rem"
                fontWeight="700"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
              >
                {user?.email}
              </Heading>
              <Box
                display="inline-block"
                bg={user?.role === "admin" ? "#ca2d1e" : isDark ? "#222222" : "#e2d8d4"}
                color={user?.role === "admin" ? "#fff" : isDark ? "#f5f0ee" : "#1a1a1a"}
                px="var(--spacing-sm)"
                py="2px"
                borderRadius="var(--radius-sm)"
                fontSize="0.75rem"
                mt="var(--spacing-xs)"
              >
                {user?.role === "admin" ? "Administrador" : "Usuario"}
              </Box>
            </Box>
          </Flex>

          <Flex gap="var(--spacing-md)">
            <Button
              variant="outline"
              borderColor="#ca2d1e"
              color="#ca2d1e"
              _hover={{ bg: "#ca2d1e", color: "#fff" }}
              borderRadius="var(--radius-lg)"
              onClick={() => navigate("/books")}
              px="var(--spacing-lg)"
            >
              Ver libros
            </Button>
            <Button
              bg="#ca2d1e"
              color="#fff"
              _hover={{ bg: "#a12418" }}
              borderRadius="var(--radius-lg)"
              onClick={handleLogout}
              px="var(--spacing-lg)"
            >
              Cerrar sesión
            </Button>
          </Flex>
        </Box>

        {/* Reseñas del usuario */}
        <Heading
          as="h2"
          fontFamily="var(--font-title)"
          fontSize="1.5rem"
          fontWeight="700"
          color={isDark ? "#f5f0ee" : "#1a1a1a"}
          mb="var(--spacing-md)"
        >
          Mis reseñas
        </Heading>

        {loading ? (
          <Flex justify="center" py="var(--spacing-xl)">
            <Spinner color="#ca2d1e" size="xl" />
          </Flex>
        ) : reviews.length === 0 ? (
          <Box
            bg={isDark ? "#1a1a1a" : "#f0eae7"}
            borderRadius="var(--radius-lg)"
            p="var(--spacing-lg)"
            border="1px solid"
            borderColor={isDark ? "#222222" : "#e2d8d4"}
            textAlign="center"
          >
            <Chakra.p fontFamily="var(--font-body)" color="#9a9a9a" mb="var(--spacing-md)">
              Todavía no has escrito ninguna reseña
            </Chakra.p>
            <Link to="/books">
              <Button
                bg="#ca2d1e"
                color="#fff"
                _hover={{ bg: "#a12418" }}
                borderRadius="var(--radius-lg)"
                px="var(--spacing-lg)"
              >
                Explorar libros
              </Button>
            </Link>
          </Box>
        ) : (
          <Flex direction="column" gap="var(--spacing-md)">
            {reviews.map((review) => (
              <Link to={`/books/${review.book?._id || review.book}`} key={review._id}>
                <Box
                  bg={isDark ? "#1a1a1a" : "#f0eae7"}
                  borderRadius="var(--radius-lg)"
                  p="var(--spacing-lg)"
                  border="1px solid"
                  borderColor={isDark ? "#222222" : "#e2d8d4"}
                  _hover={{ borderColor: "#ca2d1e", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                >
                  <Flex justify="space-between" align="flex-start" mb="var(--spacing-sm)">
                    <Chakra.p
                      fontFamily="var(--font-title)"
                      fontWeight="700"
                      fontSize="1rem"
                      color={isDark ? "#f5f0ee" : "#1a1a1a"}
                    >
                      {review.book?.title || "Libro"}
                    </Chakra.p>
                    <StarRating rating={review.rating} />
                  </Flex>
                  <Chakra.p
                    fontFamily="var(--font-body)"
                    fontSize="0.9rem"
                    color={isDark ? "#9a9a9a" : "#6b6360"}
                    lineHeight="1.6"
                  >
                    {review.comment}
                  </Chakra.p>
                  <Chakra.p fontFamily="var(--font-body)" fontSize="0.8rem" color="#ca2d1e" mt="var(--spacing-sm)">
                    Ver libro →
                  </Chakra.p>
                </Box>
              </Link>
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
