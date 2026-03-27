import { Box, Flex } from "@chakra-ui/react";

const StarRating = ({ rating, onRate = null, size = "1rem" }) => {
  return (
    <Flex gap="2px">
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          key={star}
          fontSize={size}
          color={star <= rating ? "#ca2d1e" : "#9a9a9a"}
          cursor={onRate ? "pointer" : "default"}
          onClick={() => onRate && onRate(star)}
        >
          ★
        </Box>
      ))}
    </Flex>
  );
};

export default StarRating;
