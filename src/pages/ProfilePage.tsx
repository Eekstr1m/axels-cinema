import { useEffect } from "react";
import { useNavigate } from "react-router";

// Components
import { CenteredLoading, Header } from "../components";

// Redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { loadUserData, logoutUser } from "../redux/authSlice";

// MUI Components
import Avatar from "@mui/material/Avatar";

// MUI Icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";

// Styled Components
import {
  AvatarRing,
  BookingItem,
  BookingMeta,
  BookingTitle,
  ContentGrid,
  HeroActions,
  HeroCard,
  HeroContent,
  HeroTextBlock,
  HeroTitle,
  InfoCard,
  MetaRow,
  PageContainer,
  ProfileShell,
  SectionTitle,
  StatCard,
  StatLabel,
  StatValue,
  StatsGrid,
  PrimaryActionButton,
} from "../styled/pages/ProfilePage.styled";

// Other
import { parseDate } from "../utils/utils";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    if (!user || !user.userId) {
      dispatch(loadUserData());
    }
  }, [dispatch, user, user?.userId]);

  if (!user || !user.userId) return <CenteredLoading />;

  const onLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <PageContainer maxWidth="lg">
      <Header />
      <ProfileShell>
        <HeroCard elevation={0}>
          <HeroContent>
            <AvatarRing>
              <Avatar
                src={"https://placehold.co/200x200"}
                alt={user.fullName}
                sx={{ width: 96, height: 96 }}
              />
            </AvatarRing>

            <HeroTextBlock>
              <HeroTitle variant="h3">{user.fullName}</HeroTitle>
              <MetaRow>
                <span>
                  <CalendarTodayIcon /> Member since{" "}
                  {user.createdAt && parseDate(user.createdAt).longDateYear}
                </span>
              </MetaRow>
              <MetaRow>
                <span>
                  <EmailOutlinedIcon />
                  {user.email}
                </span>
              </MetaRow>
              <MetaRow>
                <span>
                  <PhoneIphoneIcon />
                  {user.phone}
                </span>
              </MetaRow>
            </HeroTextBlock>

            <HeroActions>
              <PrimaryActionButton onClick={onLogout} variant="contained">
                Log Out
              </PrimaryActionButton>
            </HeroActions>
          </HeroContent>
        </HeroCard>

        <StatsGrid>
          <StatCard>
            <MovieCreationIcon />
            <StatLabel variant="body2">Movies watched</StatLabel>
            <StatValue variant="h5">{user.totalMoviesBooked}</StatValue>
          </StatCard>
          <StatCard>
            <EventSeatIcon />
            <StatLabel variant="body2">Seats booked</StatLabel>
            <StatValue variant="h5">{user.totalSeatsBooked}</StatValue>
          </StatCard>
          <StatCard>
            <CreditCardIcon />
            <StatLabel variant="body2">Total spent</StatLabel>
            <StatValue variant="h5">${user.totalMoneySpent}</StatValue>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <InfoCard elevation={0}>
            <SectionTitle variant="h6">
              <ConfirmationNumberOutlinedIcon /> Upcoming session
            </SectionTitle>
            <BookingItem>
              <BookingTitle variant="subtitle1">
                Neon City Chronicles
              </BookingTitle>
              <BookingMeta>
                <span>
                  <CalendarTodayIcon /> Feb 8, 2026
                </span>
                <span>
                  <AccessTimeIcon /> 20:15
                </span>
                <span>
                  <EventSeatIcon /> D07, D08
                </span>
              </BookingMeta>
            </BookingItem>
          </InfoCard>
        </ContentGrid>
      </ProfileShell>
    </PageContainer>
  );
}
