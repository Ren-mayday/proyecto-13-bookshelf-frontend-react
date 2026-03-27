import { useState } from "react";
import { Box, Flex, Button, Textarea, chakra as Chakra } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import useAuth from "../hooks/useAuth";

const ReviewCard = ({ review, onDelete, onUpdate }) => {
  const { colorMode } = useColorMode();
  const { user } = useAuth();
  const isDark = colorMode === "dark";

  const [editing, setEditing] = useState(false);
  const [editComment, setEditComment] = useState(review.comment);
  const [editRating, setEditRating] = useState(review.rating);
  const [saving, setSaving] = useState(false);

  const isOwner = user && (user.id === review.user?._id || user.id === review.user || user.role === "admin");

  const handleSave = async () => {
    if (!editComment.trim()) return;
    setSaving(true);
    await onUpdate(review._id, editComment, editRating);
    setSaving(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditComment(review.comment);
    setEditRating(review.rating);
    setEditing(false);
  };

  return (
    <Box
      bg={isDark ? "#1a1a1a" : "#f0eae7"}
      borderRadius="var(--radius-lg)"
      p="var(--spacing-lg)"
      border="1px solid"
      borderColor={isDark ? "#222222" : "#e2d8d4"}
    >
      <Flex justify="space-between" align="flex-start" mb="var(--spacing-sm)">
        <Box>
          <Chakra.p fontFamily="var(--font-body)" fontWeight="700" color={isDark ? "#f5f0ee" : "#1a1a1a"} mb="2px">
            {review.user?.userName || review.user?.email || "Usuario"}
          </Chakra.p>
          <Flex gap="2px">
            {[1, 2, 3, 4, 5].map((star) => (
              <Box
                key={star}
                fontSize="1rem"
                color={star <= (editing ? editRating : review.rating) ? "#ca2d1e" : "#9a9a9a"}
              >
                {editing ? (
                  <Box cursor="pointer" onClick={() => setEditRating(star)}>
                    ★
                  </Box>
                ) : (
                  "★"
                )}
              </Box>
            ))}
          </Flex>
        </Box>

        {isOwner && !editing && (
          <Flex gap="var(--spacing-sm)">
            <Button
              size="sm"
              variant="outline"
              borderColor="#ca2d1e"
              color="#ca2d1e"
              _hover={{ bg: "#ca2d1e", color: "#fff" }}
              borderRadius="var(--radius-lg)"
              px="var(--spacing-md)"
              onClick={() => setEditing(true)}
            >
              Editar
            </Button>
            <Button
              size="sm"
              bg="#ca2d1e"
              color="#fff"
              _hover={{ bg: "#a12418" }}
              borderRadius="var(--radius-lg)"
              px="var(--spacing-md)"
              onClick={() => onDelete(review._id)}
            >
              Eliminar
            </Button>
          </Flex>
        )}
      </Flex>

      {editing ? (
        <Box mt="var(--spacing-sm)">
          <Textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            bg={isDark ? "#0d0d0d" : "#faf7f5"}
            border="1px solid"
            borderColor={isDark ? "#222222" : "#e2d8d4"}
            color={isDark ? "#f5f0ee" : "#1a1a1a"}
            p="var(--spacing-md)"
            _focus={{ borderColor: "#ca2d1e" }}
            borderRadius="var(--radius-md)"
            rows={3}
            mb="var(--spacing-sm)"
          />
          <Flex gap="var(--spacing-sm)">
            <Button
              size="sm"
              bg="#ca2d1e"
              color="#fff"
              _hover={{ bg: "#a12418" }}
              borderRadius="var(--radius-lg)"
              px="var(--spacing-md)"
              onClick={handleSave}
              loading={saving}
            >
              Guardar
            </Button>
            <Button
              size="sm"
              variant="outline"
              borderColor="#9a9a9a"
              color="#9a9a9a"
              _hover={{ borderColor: "#ca2d1e", color: "#ca2d1e" }}
              borderRadius="var(--radius-lg)"
              px="var(--spacing-md)"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </Flex>
        </Box>
      ) : (
        <Chakra.p
          fontFamily="var(--font-body)"
          fontSize="0.95rem"
          color={isDark ? "#9a9a9a" : "#6b6360"}
          lineHeight="1.6"
          mt="var(--spacing-sm)"
        >
          {review.comment}
        </Chakra.p>
      )}
    </Box>
  );
};

export default ReviewCard;
