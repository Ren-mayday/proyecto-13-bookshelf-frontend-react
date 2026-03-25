import { Box } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const { colorMode } = useColorMode();

  return (
    <Link to={`/books/${book._id}`}>
      <Box
        bg={colorMode === "dark" ? "#1a1a1a" : "#f0eae7"}
        borderRadius="var(--radius-md)"
        p="var(--spacing-md)"
        border="1px solid"
        borderColor={colorMode === "dark" ? "#222222" : "#e2d8d4"}
        _hover={{ borderColor: "#ca2d1e", transform: "translateY(-4px)" }}
        transition="all 0.2s"
        cursor="pointer"
      >
        <chakra.p
          fontFamily="var(--font-title)"
          fontSize="1.1rem"
          fontWeight="700"
          mb="var(--spacing-xs)"
          color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
        >
          {book.title}
        </chakra.p>
        <chakra.p fontFamily="var(--font-body)" fontSize="0.9rem" color="#9a9a9a" mb="var(--spacing-xs)">
          {book.author}
        </chakra.p>
        <chakra.p fontFamily="var(--font-body)" fontSize="0.8rem" color="#ca2d1e">
          {book.genre}
        </chakra.p>
      </Box>
    </Link>
  );
};

export default BookCard;
