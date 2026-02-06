import CircularProgress from "@mui/material/CircularProgress";
import { CenteredLoadingContainer } from "../../styled/components/common/CenteredLoading.styled";

export default function CenteredLoading() {
  return (
    <CenteredLoadingContainer>
      <CircularProgress />
    </CenteredLoadingContainer>
  );
}
