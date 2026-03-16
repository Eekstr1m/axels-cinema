import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
  HeaderBox,
  HeaderBrand,
  HeaderPaper,
  HeaderTitle,
  HeaderActionButton,
} from "../styled/components/Header.styled";

export default function Header({
  renderProfileButton = false,
}: {
  renderProfileButton?: boolean;
}) {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const handleAuthNavigation = () => {
    navigate(accessToken ? "/profile" : "/login");
  };

  return (
    <HeaderPaper elevation={0}>
      <HeaderBox renderProfileButton={renderProfileButton}>
        <HeaderBrand>
          <LocalMoviesIcon sx={{ fontSize: 40 }} />
          <HeaderTitle variant="h4" href="/">
            Axels Cinema
          </HeaderTitle>
        </HeaderBrand>
        {renderProfileButton && (
          <HeaderActionButton variant="outlined" onClick={handleAuthNavigation}>
            {accessToken ? "Profile" : "Login"}
          </HeaderActionButton>
        )}
      </HeaderBox>
    </HeaderPaper>
  );
}
