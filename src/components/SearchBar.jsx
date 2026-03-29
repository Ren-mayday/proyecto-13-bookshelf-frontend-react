import { Flex, Input, Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";

const SearchBar = ({ search, setSearch, searchType, setSearchType, onSearch, onClear, inputRef }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex gap="var(--spacing-sm)" mb="var(--spacing-lg)" flexWrap="wrap">
      <Input
        ref={inputRef}
        pl="var(--spacing-md)"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        bg={isDark ? "#1a1a1a" : "#f0eae7"}
        border="1px solid"
        borderRadius="var(--radius-lg)"
        borderColor={isDark ? "#222222" : "#e2d8d4"}
        color={isDark ? "#f5f0ee" : "#1a1a1a"}
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
        onClick={onSearch}
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
          onClick={onClear}
          px="var(--spacing-lg)"
        >
          Limpiar
        </Button>
      )}
    </Flex>
  );
};

export default SearchBar;
