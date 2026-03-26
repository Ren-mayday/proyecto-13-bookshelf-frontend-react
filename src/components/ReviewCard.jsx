import { Box, Flex, Button, chakra as Chakra } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import useAuth from "../hooks/useAuth";

const ReviewCard = ({ review, onDelete }) => {
  const { colorMode } = useColorMode();
  const { user } = useAuth();

  const isOwner = user && (user.id === review.user?._id || user.role === "admin");

  return (
    <Box
      bg={colorMode === "dark" ? "#1a1a1a" : "#f0eae7"}
      borderRadius="var(--radius-lg)"
      p="var(--spacing-md)"
      border="1px solid"
      borderColor={colorMode === "dark" ? "#222222" : "#e2d8d4"}
    >
      <Flex justify="space-between" align="flex-start" mb="var(--spacing-sm)">
        <Box>
          <Chakra.p
            fontFamily="var(--font-body)"
            fontWeight="700"
            color={colorMode === "dark" ? "#f5f0ee" : "#1a1a1a"}
            mb="2px"
          >
            {review.user?.userName || "Usuario"}
          </Chakra.p>
          <Flex gap="2px">
            {[1, 2, 3, 4, 5].map((star) => (
              <Box key={star} fontSize="1rem" color={star <= review.rating ? "#ca2d1e" : "#9a9a9a"}>
                ★
              </Box>
            ))}
          </Flex>
        </Box>

        {isOwner && (
          <Button
            size="sm"
            bg="#ca2d1e"
            color="#fff"
            _hover={{ bg: "#a12418" }}
            borderRadius="var(--radius-lg)"
            onClick={() => onDelete(review._id)}
          >
            Eliminar
          </Button>
        )}
      </Flex>

      <Chakra.p
        fontFamily="var(--font-body)"
        fontSize="0.95rem"
        color={colorMode === "dark" ? "#9a9a9a" : "#6b6360"}
        lineHeight="1.6"
      >
        {review.comment}
      </Chakra.p>
    </Box>
  );
};

export default ReviewCard;
