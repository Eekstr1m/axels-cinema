import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import {
  HeaderBox,
  HeaderPaper,
  HeaderTitle,
} from "../styled/components/Header.styled";

export default function Header() {
  return (
    <HeaderPaper elevation={0}>
      <HeaderBox>
        <LocalMoviesIcon sx={{ fontSize: 40 }} />
        <HeaderTitle variant="h4">Axels Cinema</HeaderTitle>
      </HeaderBox>
    </HeaderPaper>
  );
}
