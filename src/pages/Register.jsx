import { useState } from "react";
import { Box, Flex, Button, Input, Heading, chakra as Chakra } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const Register = () => {
  const { colorMode } = useColorMode();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.userName || !form.email || !form.password) {
      setError("Por favor, rellena todos los campos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(typeof data === "string" ? data : data.message || "Error al registrarse");
        return;
      }

      // Login automático tras registro exitoso
      const loginResponse = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        login(loginData.user, loginData.token);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const isDark = colorMode === "dark";

  return (
    <Box bg={isDark ? "#0d0d0d" : "#faf7f5"} minH="100vh">
      <Flex justify="center" align="center" minH="calc(100vh - 70px)" px="var(--spacing-lg)">
        <Box
          w="100%"
          maxW="420px"
          bg={isDark ? "#1a1a1a" : "#f0eae7"}
          borderRadius="var(--radius-lg)"
          p="var(--spacing-lg)"
          border="1px solid"
          borderColor={isDark ? "#222222" : "#e2d8d4"}
        >
          {/* Header */}
          <Box mb="var(--spacing-lg)">
            <Heading
              as="h1"
              fontFamily="var(--font-title)"
              fontSize="2rem"
              fontWeight="700"
              color={isDark ? "#f5f0ee" : "#1a1a1a"}
              mb="var(--spacing-xs)"
            >
              Crea tu cuenta
            </Heading>
            <Chakra.p fontFamily="var(--font-body)" fontSize="0.95rem" color="#9a9a9a">
              Únete a la comunidad lectora
            </Chakra.p>
          </Box>

          {/* Form */}
          <Flex direction="column" gap="var(--spacing-md)">
            <Box>
              <Chakra.label
                fontFamily="var(--font-body)"
                fontSize="0.85rem"
                fontWeight="500"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                display="block"
                mb="var(--spacing-xs)"
              >
                Nombre de usuario
              </Chakra.label>
              <Input
                name="userName"
                pl="var(--spacing-md)"
                type="text"
                placeholder="tu_nombre"
                value={form.userName}
                onChange={handleChange}
                bg={isDark ? "#0d0d0d" : "#faf7f5"}
                border="1px solid"
                borderColor={isDark ? "#222222" : "#e2d8d4"}
                borderRadius="var(--radius-md)"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                _focus={{ borderColor: "#ca2d1e", outline: "none" }}
                _placeholder={{ color: "#9a9a9a" }}
              />
            </Box>

            <Box>
              <Chakra.label
                fontFamily="var(--font-body)"
                fontSize="0.85rem"
                fontWeight="500"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                display="block"
                mb="var(--spacing-xs)"
              >
                Email
              </Chakra.label>
              <Input
                name="email"
                pl="var(--spacing-md)"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handleChange}
                bg={isDark ? "#0d0d0d" : "#faf7f5"}
                border="1px solid"
                borderColor={isDark ? "#222222" : "#e2d8d4"}
                borderRadius="var(--radius-md)"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                _focus={{ borderColor: "#ca2d1e", outline: "none" }}
                _placeholder={{ color: "#9a9a9a" }}
              />
            </Box>

            <Box>
              <Chakra.label
                fontFamily="var(--font-body)"
                fontSize="0.85rem"
                fontWeight="500"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                display="block"
                mb="var(--spacing-xs)"
              >
                Contraseña
              </Chakra.label>
              <Input
                name="password"
                pl="var(--spacing-md)"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                bg={isDark ? "#0d0d0d" : "#faf7f5"}
                border="1px solid"
                borderColor={isDark ? "#222222" : "#e2d8d4"}
                borderRadius="var(--radius-md)"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                _focus={{ borderColor: "#ca2d1e", outline: "none" }}
                _placeholder={{ color: "#9a9a9a" }}
              />
            </Box>

            {/* Error */}
            {error && (
              <Box
                bg="#f9e0de"
                border="1px solid"
                borderColor="#ca2d1e"
                borderRadius="var(--radius-sm)"
                px="var(--spacing-md)"
                py="var(--spacing-sm)"
              >
                <Chakra.p fontFamily="var(--font-body)" fontSize="0.85rem" color="#a12418">
                  {error}
                </Chakra.p>
              </Box>
            )}

            <Button
              bg="#ca2d1e"
              color="#fff"
              _hover={{ bg: "#a12418" }}
              borderRadius="var(--radius-lg)"
              onClick={handleSubmit}
              loading={loading}
              loadingText="Creando cuenta..."
              w="100%"
              mt="var(--spacing-sm)"
            >
              Crear cuenta
            </Button>
          </Flex>

          {/* Footer */}
          <Chakra.p
            fontFamily="var(--font-body)"
            fontSize="0.9rem"
            color="#9a9a9a"
            textAlign="center"
            mt="var(--spacing-lg)"
          >
            ¿Ya tienes cuenta?{" "}
            <Link to="/login">
              <Chakra.span color="#ca2d1e" fontWeight="500" _hover={{ color: "#a12418" }}>
                Inicia sesión
              </Chakra.span>
            </Link>
          </Chakra.p>
        </Box>
      </Flex>
    </Box>
  );
};

export default Register;
