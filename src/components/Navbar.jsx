import { Box, Flex, Text, Button, IconButton } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="1000"
      bg={colorMode === "dark" ? "#0d0d0d" : "#faf7f5"}
      borderBottom="1px solid"
      borderColor={colorMode === "dark" ? "#1a1a1a" : "#e2d8d4"}
      px="var(--spacing-lg)"
      py="var(--spacing-md)"
    >
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        {/* Logo */}
        <Link to="/">
          <Text fontFamily="var(--font-title)" fontSize="1.5rem" fontWeight="700" color="#ca2d1e">
            BookShelf
          </Text>
        </Link>

        {/* Links */}
        <Flex gap="var(--spacing-lg)" align="center">
          <Link to="/">
            <Text
              fontFamily="var(--font-body)"
              color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
              _hover={{ color: "#ca2d1e" }}
            >
              Home
            </Text>
          </Link>
          <Link to="/books">
            <Text
              fontFamily="var(--font-body)"
              color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
              _hover={{ color: "#ca2d1e" }}
            >
              Books
            </Text>
          </Link>
        </Flex>

        {/* Derecha: toggle + auth */}
        <Flex gap="var(--spacing-md)" align="center">
          {/* Toggle dark/light */}
          <IconButton
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            variant="ghost"
            color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
          >
            {colorMode === "dark" ? "☀️" : "🌙"}
          </IconButton>

          {/* Auth buttons */}
          {user ? (
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
      </Flex>
    </Box>
  );
};

export default Navbar;
