import { useEffect, useState } from "react";
import { Box, Flex, Button, SimpleGrid, Spinner, Heading, Input, chakra as Chakra } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { getAllBooks } from "../services/booksService";
import BookCard from "../components/BookCard";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("title");
  const { colorMode } = useColorMode();

  const fetchBooks = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await getAllBooks(filters);
      setBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
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
    <Box bg={colorMode === "dark" ? "#0d0d0d" : "#faf7f5"} minH="100vh" px="var(--spacing-lg)" py="var(--spacing-xl)">
      <Box maxW="1200px" mx="auto">
        <Heading
          as="h1"
          fontFamily="var(--font-title)"
          fontSize="2.5rem"
          fontWeight="700"
          mb="var(--spacing-lg)"
          color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
        >
          Catálogo de libros
        </Heading>

        {/* Buscador */}
        <Flex gap="var(--spacing-sm)" mb="var(--spacing-lg)" flexWrap="wrap">
          <Input
            pl="var(--spacing-md)"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            bg={colorMode === "dark" ? "#1a1a1a" : "#f0eae7"}
            border="1px solid"
            borderRadius="var(--radius-lg)"
            borderColor={colorMode === "dark" ? "#222222" : "#e2d8d4"}
            color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
            maxW="300px"
            _focus={{ borderColor: "#ca2d1e", outline: "none" }}
          />
          <Button
            variant={searchType === "title" ? "solid" : "outline"}
            bg={searchType === "title" ? "#ca2d1e" : "transparent"}
            color={searchType === "title" ? "#fff" : "#ca2d1e"}
            borderRadius="var(--radius-lg)"
            borderColor="#ca2d1e"
            onClick={() => setSearchType("title")}
            _hover={{ bg: "#ca2d1e", color: "#fff" }}
            px="var(--spacing-lg)"
          >
            Título
          </Button>
          <Button
            variant={searchType === "author" ? "solid" : "outline"}
            bg={searchType === "author" ? "#ca2d1e" : "transparent"}
            color={searchType === "author" ? "#fff" : "#ca2d1e"}
            borderRadius="var(--radius-lg)"
            borderColor="#ca2d1e"
            onClick={() => setSearchType("author")}
            _hover={{ bg: "#ca2d1e", color: "#fff" }}
            px="var(--spacing-lg)"
          >
            Autor
          </Button>
          <Button
            bg="#ca2d1e"
            color="#fff"
            _hover={{ bg: "#a12418" }}
            borderRadius="var(--radius-lg)"
            onClick={handleSearch}
            px="var(--spacing-lg)"
          >
            Buscar
          </Button>
          {search && (
            <Button
              bg="#9a9a9a"
              color="#fff"
              _hover={{ bg: "#6b6b6b" }}
              borderRadius="var(--radius-lg)"
              onClick={handleClear}
              px="var(--spacing-lg)"
            >
              Limpiar
            </Button>
          )}
        </Flex>

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
