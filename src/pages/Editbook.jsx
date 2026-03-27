import { useState, useEffect } from "react";
import { Box, Flex, Button, Input, Heading, Textarea, Spinner, chakra as Chakra } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const EditBook = () => {
  const { colorMode } = useColorMode();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isDark = colorMode === "dark";

  const [form, setForm] = useState({
    newTitle: "",
    newAuthor: "",
    newGenre: "",
    newSynopsis: "",
    newYear: "",
    newPages: "",
    newLanguage: "",
    newCoverImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Carga los datos actuales del libro
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${API_URL}/books/${id}`);
        const data = await response.json();

        if (!response.ok) {
          navigate("/books");
          return;
        }

        setForm({
          newTitle: data.title || "",
          newAuthor: data.author || "",
          newGenre: data.genre || "",
          newSynopsis: data.synopsis || "",
          newYear: data.year || "",
          newPages: data.pages || "",
          newLanguage: data.language || "",
          newCoverImage: data.coverImage || "",
        });
      } catch (err) {
        navigate("/books");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.newTitle || !form.newAuthor || !form.newGenre || !form.newSynopsis) {
      setError("Título, autor, género y sinopsis son obligatorios");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(typeof data === "string" ? data : data.message || "Error al actualizar el libro");
        return;
      }

      navigate(`/books/${id}`);
    } catch (error) {
      setError("Error de conexión con el servidor");
    } finally {
      setSubmitting(false);
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

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner color="#ca2d1e" size="xl" />
      </Flex>
    );
  }

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
          Editar libro
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
              <Input name="newTitle" value={form.newTitle} onChange={handleChange} {...inputStyles} />
            </Box>

            <Box>
              <Chakra.label {...labelStyles}>Autor *</Chakra.label>
              <Input name="newAuthor" value={form.newAuthor} onChange={handleChange} {...inputStyles} />
            </Box>

            <Box>
              <Chakra.label {...labelStyles}>Género *</Chakra.label>
              <Input name="newGenre" value={form.newGenre} onChange={handleChange} {...inputStyles} />
            </Box>

            <Box>
              <Chakra.label {...labelStyles}>Sinopsis *</Chakra.label>
              <Textarea
                name="newSynopsis"
                value={form.newSynopsis}
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
                  <Input name="newYear" type="number" value={form.newYear} onChange={handleChange} {...inputStyles} />
                </Box>
                <Box flex="1" minW="140px">
                  <Chakra.label {...labelStyles}>Páginas</Chakra.label>
                  <Input name="newPages" type="number" value={form.newPages} onChange={handleChange} {...inputStyles} />
                </Box>
                <Box flex="1" minW="140px">
                  <Chakra.label {...labelStyles}>Idioma</Chakra.label>
                  <Input name="newLanguage" value={form.newLanguage} onChange={handleChange} {...inputStyles} />
                </Box>
              </Flex>
            </Box>

            <Box>
              <Chakra.label {...labelStyles}>URL de portada</Chakra.label>
              <Input
                name="newCoverImage"
                placeholder="https://..."
                value={form.newCoverImage}
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
                onClick={() => navigate(`/books/${id}`)}
              >
                Cancelar
              </Button>
              <Button
                bg="#ca2d1e"
                color="#fff"
                _hover={{ bg: "#a12418" }}
                borderRadius="var(--radius-lg)"
                onClick={handleSubmit}
                loading={submitting}
                loadingText="Guardando..."
                px="var(--spacing-lg)"
              >
                Guardar cambios
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default EditBook;
