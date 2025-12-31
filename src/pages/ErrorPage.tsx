import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ErrorPage() {
  const errorMessage = useSelector(
    (state: RootState) => state.cinema.errorMessage
  );

  return (
    <Box>
      <Typography variant="h4" color="error" align="center" mt={4}>
        {errorMessage ||
          "An unexpected error occurred. Please try again later."}
      </Typography>
    </Box>
  );
}
