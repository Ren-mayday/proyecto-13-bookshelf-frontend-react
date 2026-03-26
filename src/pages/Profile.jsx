import { Box, Flex, Heading, chakra as Chakra, Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { colorMode } = useColorMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isDark = colorMode === "dark";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box bg={isDark ? "#0d0d0d" : "#faf7f5"} minH="100vh" px="var(--spacing-lg)" py="var(--spacing-xl)">
      <Box maxW="600px" mx="auto">
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
          {/* Avatar inicial */}
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

          {/* Info */}
          <Flex direction="column" gap="var(--spacing-sm)">
            <Flex
              justify="space-between"
              align="center"
              py="var(--spacing-sm)"
              borderBottom="1px solid"
              borderColor={isDark ? "#222222" : "#e2d8d4"}
            >
              <Chakra.p fontFamily="var(--font-body)" fontSize="0.85rem" color="#9a9a9a">
                Email
              </Chakra.p>
              <Chakra.p fontFamily="var(--font-body)" fontSize="0.95rem" color={isDark ? "#f5f0ee" : "#1a1a1a"}>
                {user?.email}
              </Chakra.p>
            </Flex>
            <Flex justify="space-between" align="center" py="var(--spacing-sm)">
              <Chakra.p fontFamily="var(--font-body)" fontSize="0.85rem" color="#9a9a9a">
                Rol
              </Chakra.p>
              <Chakra.p fontFamily="var(--font-body)" fontSize="0.95rem" color={isDark ? "#f5f0ee" : "#1a1a1a"}>
                {user?.role === "admin" ? "Administrador" : "Usuario"}
              </Chakra.p>
            </Flex>
          </Flex>
        </Box>

        {/* Acciones */}
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
    </Box>
  );
};

export default Profile;
