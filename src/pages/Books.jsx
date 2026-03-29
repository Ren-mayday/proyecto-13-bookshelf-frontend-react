import { useEffect, useState, useCallback, useRef } from "react";
import { Box, Flex, SimpleGrid, Spinner, Heading, Button, chakra as Chakra } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Link } from "react-router-dom";
import { getAllBooks } from "../services/booksService";
import BookCard from "../components/BookCard";
import useAuth from "../hooks/useAuth";
import SearchBar from "../components/SearchBar";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("title");
  const { colorMode } = useColorMode();
  const { user } = useAuth();
  const isDark = colorMode === "dark";

  // useRef para hacer foco automático en el input del buscador
  const searchInputRef = useRef(null);

  // useCallback para evitar que fetchBooks se recree en cada render
  const fetchBooks = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const data = await getAllBooks(filters);
      setBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Foco automático en el input al cargar la página
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSearch = () => {
    if (!search.trim()) {
      fetchBooks();
      return;
    }
    fetchBooks({ [searchType]: search });
  };

  const handleClear = () => {
    setSearch("");
    fetchBooks();
  };

  return (
    <Box bg={isDark ? "#0d0d0d" : "#faf7f5"} minH="100vh" px="var(--spacing-lg)" py="var(--spacing-xl)">
      <Box maxW="1200px" mx="auto">
        {/* Header */}
        <Flex justify="space-between" align="center" mb="var(--spacing-lg)" flexWrap="wrap" gap="var(--spacing-md)">
          <Heading
            as="h1"
            fontFamily="var(--font-title)"
            fontSize="2.5rem"
            fontWeight="700"
            color={isDark ? "#f5f0ee" : "#1a1a1a"}
          >
            Catálogo de libros
          </Heading>
          {user && (
            <Link to="/books/new">
              <Button
                bg="#ca2d1e"
                color="#fff"
                _hover={{ bg: "#a12418" }}
                borderRadius="var(--radius-lg)"
                px="var(--spacing-lg)"
              >
                + Añadir libro
              </Button>
            </Link>
          )}
        </Flex>

        {/* Buscador */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          searchType={searchType}
          setSearchType={setSearchType}
          onSearch={handleSearch}
          onClear={handleClear}
          inputRef={searchInputRef}
        />

        {/* Resultados */}
        {loading ? (
          <Flex justify="center" py="var(--spacing-xl)">
            <Spinner color="#ca2d1e" size="xl" />
          </Flex>
        ) : books.length === 0 ? (
          <Flex justify="center" py="var(--spacing-xl)">
            <Chakra.p fontFamily="var(--font-body)" color="#9a9a9a" fontSize="1.1rem">
              No se han encontrado libros
            </Chakra.p>
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="var(--spacing-md)">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default Books;
