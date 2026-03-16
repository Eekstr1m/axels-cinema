import { useNavigate } from "react-router";
import {
  NotFoundBanner,
  NotFoundButton,
  NotFoundContent,
  NotFoundSubtitle,
  NotFoundTitle,
} from "../styled/components/NotFoundException.styled";
import MovieOffIcon from "@mui/icons-material/SearchOff";

export default function NotFoundException({
  icon = <MovieOffIcon />,
  title = "Page",
  subtitle = "The page you're looking for doesn't exist or was removed.",
}) {
  const navigate = useNavigate();

  return (
    <NotFoundBanner>
      <NotFoundContent>
        {icon}
        <NotFoundTitle>{title} not found</NotFoundTitle>
        <NotFoundSubtitle>{subtitle}</NotFoundSubtitle>
        <NotFoundButton onClick={() => navigate("/")}>
          ← Back to Movies
        </NotFoundButton>
      </NotFoundContent>
    </NotFoundBanner>
  );
}
