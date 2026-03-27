import { useState } from "react";
import { Box, Flex, Text, Button, IconButton } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = colorMode === "dark";

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="1000"
      bg={isDark ? "#0d0d0d" : "#faf7f5"}
      borderBottom="1px solid"
      borderColor={isDark ? "#1a1a1a" : "#e2d8d4"}
      w="100%"
    >
      {/* Barra principal */}
      <Flex
        align="center"
        justify="space-between"
        maxW="1200px"
        mx="auto"
        px="var(--spacing-lg)"
        py="var(--spacing-md)"
      >
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <Text fontFamily="var(--font-title)" fontSize="1.5rem" fontWeight="700" color="#ca2d1e">
            Librería Virtual
          </Text>
        </Link>

        {/* Links desktop */}
        <Flex gap="var(--spacing-lg)" align="center" display={{ base: "none", md: "flex" }}>
          <Link to="/">
            <Text fontFamily="var(--font-body)" color={isDark ? "#f5f0ee" : "#1a1a1a"} _hover={{ color: "#ca2d1e" }}>
              Inicio
            </Text>
          </Link>
          <Link to="/books">
            <Text fontFamily="var(--font-body)" color={isDark ? "#f5f0ee" : "#1a1a1a"} _hover={{ color: "#ca2d1e" }}>
              Libros
            </Text>
          </Link>
        </Flex>

        {/* Derecha desktop: toggle + auth */}
        <Flex gap="var(--spacing-md)" align="center" display={{ base: "none", md: "flex" }}>
          <IconButton
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            variant="ghost"
            color={isDark ? "#f5f0ee" : "#1a1a1a"}
          >
            {isDark ? "☀️" : "🌙"}
          </IconButton>

          {user ? (
            <Flex align="center" gap="var(--spacing-sm)">
              <Link to="/books/new">
                <Button
                  bg="#ca2d1e"
                  color="#fff"
                  _hover={{ bg: "#a12418" }}
                  borderRadius="var(--radius-lg)"
                  size="sm"
                  px="var(--spacing-md)"
                >
                  + Añadir libro
                </Button>
              </Link>
              <Link to="/profile">
                <Text
                  fontFamily="var(--font-body)"
                  fontSize="0.9rem"
                  color={isDark ? "#f5f0ee" : "#1a1a1a"}
                  _hover={{ color: "#ca2d1e" }}
                >
                  Mi perfil
                </Text>
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                borderRadius="var(--radius-lg)"
                borderColor="#ca2d1e"
                color="#ca2d1e"
                _hover={{ bg: "#ca2d1e", color: "#fff" }}
                size="sm"
              >
                Logout
              </Button>
            </Flex>
          ) : (
            <Flex gap="var(--spacing-sm)">
              <Link to="/login">
                <Button
                  variant="outline"
                  borderRadius="var(--radius-lg)"
                  borderColor="#ca2d1e"
                  color="#ca2d1e"
                  _hover={{ bg: "#ca2d1e", color: "#fff" }}
                  size="sm"
                  px="var(--spacing-md)"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  bg="#ca2d1e"
                  borderRadius="var(--radius-lg)"
                  color="#fff"
                  _hover={{ bg: "#a12418" }}
                  size="sm"
                  px="var(--spacing-md)"
                >
                  Register
                </Button>
              </Link>
            </Flex>
          )}
        </Flex>

        {/* Móvil: toggle + hamburguesa */}
        <Flex gap="var(--spacing-sm)" align="center" display={{ base: "flex", md: "none" }}>
          <IconButton
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            variant="ghost"
            color={isDark ? "#f5f0ee" : "#1a1a1a"}
          >
            {isDark ? "☀️" : "🌙"}
          </IconButton>
          <IconButton
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            variant="ghost"
            color={isDark ? "#f5f0ee" : "#1a1a1a"}
          >
            {menuOpen ? "✕" : "☰"}
          </IconButton>
        </Flex>
      </Flex>

      {/* Panel móvil */}
      {menuOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          bg={isDark ? "#0d0d0d" : "#faf7f5"}
          borderTop="1px solid"
          borderColor={isDark ? "#1a1a1a" : "#e2d8d4"}
          px="var(--spacing-lg)"
          py="var(--spacing-md)"
        >
          <Flex direction="column" gap="var(--spacing-md)">
            <Link to="/" onClick={closeMenu}>
              <Text
                fontFamily="var(--font-body)"
                fontSize="1.1rem"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                _hover={{ color: "#ca2d1e" }}
              >
                Inicio
              </Text>
            </Link>
            <Link to="/books" onClick={closeMenu}>
              <Text
                fontFamily="var(--font-body)"
                fontSize="1.1rem"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                _hover={{ color: "#ca2d1e" }}
              >
                Libros
              </Text>
            </Link>

            <Box borderTop="1px solid" borderColor={isDark ? "#1a1a1a" : "#e2d8d4"} pt="var(--spacing-md)">
              {user ? (
                <Flex direction="column" gap="var(--spacing-sm)">
                  <Link to="/books/new" onClick={closeMenu}>
                    <Button
                      bg="#ca2d1e"
                      color="#fff"
                      _hover={{ bg: "#a12418" }}
                      borderRadius="var(--radius-lg)"
                      size="sm"
                      w="fit-content"
                      px="var(--spacing-md)"
                    >
                      + Añadir libro
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={closeMenu}>
                    <Text fontFamily="var(--font-body)" fontSize="0.9rem" color="#9a9a9a">
                      Mi perfil
                    </Text>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    borderRadius="var(--radius-lg)"
                    borderColor="#ca2d1e"
                    color="#ca2d1e"
                    _hover={{ bg: "#ca2d1e", color: "#fff" }}
                    size="sm"
                    w="fit-content"
                  >
                    Logout
                  </Button>
                </Flex>
              ) : (
                <Flex gap="var(--spacing-sm)">
                  <Link to="/login" onClick={closeMenu}>
                    <Button
                      variant="outline"
                      borderRadius="var(--radius-lg)"
                      borderColor="#ca2d1e"
                      color="#ca2d1e"
                      _hover={{ bg: "#ca2d1e", color: "#fff" }}
                      size="sm"
                      px="var(--spacing-md)"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMenu}>
                    <Button
                      bg="#ca2d1e"
                      borderRadius="var(--radius-lg)"
                      color="#fff"
                      _hover={{ bg: "#a12418" }}
                      size="sm"
                      px="var(--spacing-md)"
                    >
                      Registrar
                    </Button>
                  </Link>
                </Flex>
              )}
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
