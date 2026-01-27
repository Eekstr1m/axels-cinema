import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../redux/store";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";

import {
  BackButton,
  ErrorContainer,
  ErrorContent,
  ErrorHeading,
} from "../styled/pages/ErrorPage.styled";

export default function ErrorPage() {
  const navigate = useNavigate();
  const errorMessage = useSelector(
    (state: RootState) => state.cinema.errorMessage,
  );

  return (
    <ErrorContainer>
      <ErrorContent>
        <ErrorOutlineIcon />

        <ErrorHeading variant="h3">Oops! Something Went Wrong</ErrorHeading>

        <Box>
          <Typography variant="h6">
            {errorMessage ||
              "An unexpected error occurred. Please try again later."}
          </Typography>
        </Box>

        <BackButton
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </BackButton>
      </ErrorContent>
    </ErrorContainer>
  );
}
