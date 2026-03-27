import { useState } from "react";
import { Box, Flex, Button, Input, Heading, Textarea, chakra as Chakra } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const AddBook = () => {
  const { colorMode } = useColorMode();
  const { token } = useAuth();
  const navigate = useNavigate();
  const isDark = colorMode === "dark";

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    synopsis: "",
    year: "",
    pages: "",
    language: "",
    coverImage: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.title || !form.author || !form.genre || !form.synopsis) {
      setError("Título, autor, género y sinopsis son obligatorios");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(typeof data === "string" ? data : data.message || "Error al crear el libro");
        return;
      }

      navigate(`/books/${data._id}`);
    } catch (error) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    bg: isDark ? "#0d0d0d" : "#faf7f5",
    border: "1px solid",
    borderColor: isDark ? "#222222" : "#e2d8d4",
    borderRadius: "var(--radius-md)",
    color: isDark ? "#f5f0ee" : "#1a1a1a",
    pl: "var(--spacing-md)",
    _focus: { borderColor: "#ca2d1e", outline: "none" },
    _placeholder: { color: "#9a9a9a" },
  };

  const labelStyles = {
    fontFamily: "var(--font-body)",
    fontSize: "0.85rem",
    fontWeight: "500",
    color: isDark ? "#f5f0ee" : "#1a1a1a",
    display: "block",
    mb: "var(--spacing-xs)",
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
          Añadir libro
        </Heading>

        <Box
          bg={isDark ? "#1a1a1a" : "#f0eae7"}
          borderRadius="var(--radius-lg)"
          p="var(--spacing-lg)"
          border="1px solid"
          borderColor={isDark ? "#222222" : "#e2d8d4"}
        >
          <Flex direction="column" gap="var(--spacing-md)">
            {/* Obligatorios */}
            <Box>
              <Chakra.label {...labelStyles}>Título *</Chakra.label>
              <Input
                name="title"
                placeholder="El nombre del viento"
                value={form.title}
                onChange={handleChange}
                {...inputStyles}
              />
            </Box>

            <Box>
              <Chakra.label {...labelStyles}>Autor *</Chakra.label>
              <Input
                name="author"
                placeholder="Patrick Rothfuss"
                value={form.author}
                onChange={handleChange}
                {...inputStyles}
              />
            </Box>

            <Box>
              <Chakra.label {...labelStyles}>Género *</Chakra.label>
              <Input name="genre" placeholder="Fantasía" value={form.genre} onChange={handleChange} {...inputStyles} />
            </Box>

            <Box>
              <Chakra.label {...labelStyles}>Sinopsis *</Chakra.label>
              <Textarea
                name="synopsis"
                placeholder="Escribe una sinopsis del libro..."
                value={form.synopsis}
                onChange={handleChange}
                bg={isDark ? "#0d0d0d" : "#faf7f5"}
                border="1px solid"
                borderColor={isDark ? "#222222" : "#e2d8d4"}
                borderRadius="var(--radius-md)"
                color={isDark ? "#f5f0ee" : "#1a1a1a"}
                pl="var(--spacing-md)"
                _focus={{ borderColor: "#ca2d1e", outline: "none" }}
                _placeholder={{ color: "#9a9a9a" }}
                rows={4}
              />
            </Box>

            {/* Opcionales */}
            <Box borderTop="1px solid" borderColor={isDark ? "#222222" : "#e2d8d4"} pt="var(--spacing-md)">
              <Chakra.p fontFamily="var(--font-body)" fontSize="0.8rem" color="#9a9a9a" mb="var(--spacing-md)">
                Campos opcionales
              </Chakra.p>

              <Flex gap="var(--spacing-md)" flexWrap="wrap">
                <Box flex="1" minW="140px">
                  <Chakra.label {...labelStyles}>Año</Chakra.label>
                  <Input
                    name="year"
                    type="number"
                    placeholder="2007"
                    value={form.year}
                    onChange={handleChange}
                    {...inputStyles}
                  />
                </Box>
                <Box flex="1" minW="140px">
                  <Chakra.label {...labelStyles}>Páginas</Chakra.label>
                  <Input
                    name="pages"
                    type="number"
                    placeholder="662"
                    value={form.pages}
                    onChange={handleChange}
                    {...inputStyles}
                  />
                </Box>
                <Box flex="1" minW="140px">
                  <Chakra.label {...labelStyles}>Idioma</Chakra.label>
                  <Input
                    name="language"
                    placeholder="Español"
                    value={form.language}
                    onChange={handleChange}
                    {...inputStyles}
                  />
                </Box>
              </Flex>
            </Box>

            <Box>
              <Chakra.label {...labelStyles}>URL de portada</Chakra.label>
              <Input
                name="coverImage"
                placeholder="https://..."
                value={form.coverImage}
                onChange={handleChange}
                {...inputStyles}
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

            <Flex gap="var(--spacing-md)" justify="flex-end" mt="var(--spacing-sm)">
              <Button
                variant="outline"
                borderColor="#9a9a9a"
                color="#9a9a9a"
                borderRadius="var(--radius-lg)"
                _hover={{ borderColor: "#ca2d1e", color: "#ca2d1e" }}
                onClick={() => navigate("/books")}
              >
                Cancelar
              </Button>
              <Button
                bg="#ca2d1e"
                color="#fff"
                _hover={{ bg: "#a12418" }}
                borderRadius="var(--radius-lg)"
                onClick={handleSubmit}
                loading={loading}
                loadingText="Guardando..."
                px="var(--spacing-lg)"
              >
                Añadir libro
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default AddBook;
