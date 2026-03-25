import { useEffect, useState } from "react";
import { Box, Flex, Button, SimpleGrid, Spinner, Heading, chakra } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Link } from "react-router-dom";
import { getAllBooks } from "../services/booksService";
import BookCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <Box bg={colorMode === "dark" ? "#0d0d0d" : "#faf7f5"} minH="100vh">
      {/* Hero */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="60vh"
        textAlign="center"
        px="var(--spacing-lg)"
        gap="var(--spacing-md)"
      >
        <Heading
          as="h1"
          fontFamily="var(--font-title)"
          fontSize={{ base: "2.5rem", md: "4rem" }}
          fontWeight="700"
          lineHeight="1.1"
          color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
        >
          Descubre tu próximo{" "}
          <Box as="span" color="#ca2d1e">
            libro favorito
          </Box>
        </Heading>
        <chakra.p fontFamily="var(--font-body)" fontSize="1.1rem" color="#9a9a9a" maxW="500px">
          Explora, comenta y comparte los libros que te han cambiado la vida.
        </chakra.p>
        <Link to="/books">
          <Button
            bg="#ca2d1e"
            color="#fff"
            _hover={{ bg: "#a12418" }}
            borderRadius="var(--radius-lg)"
            size="lg"
            px="var(--spacing-lg)"
          >
            Explora Libros
          </Button>
        </Link>
      </Flex>

      {/* Últimos libros */}
      <Box px="var(--spacing-lg)" py="var(--spacing-xl)" maxW="1200px" mx="auto">
        <Heading
          as="h2"
          fontFamily="var(--font-title)"
          fontSize="2rem"
          fontWeight="700"
          mb="var(--spacing-lg)"
          color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
        >
          Libros recientes
        </Heading>

        {loading ? (
          <Flex justify="center" py="var(--spacing-xl)">
            <Spinner color="#ca2d1e" size="xl" />
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="var(--spacing-md)">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </SimpleGrid>
        )}

        <Flex justify="center" mt="var(--spacing-lg)">
          <Link to="/books">
            <Button
              variant="outline"
              borderColor="#ca2d1e"
              borderRadius="var(--radius-lg)"
              color="#ca2d1e"
              _hover={{ bg: "#ca2d1e", color: "#fff" }}
              px="var(--spacing-lg)"
            >
              Ver toda la biblioteca
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
