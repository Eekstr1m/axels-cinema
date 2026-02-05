import Avatar from "@mui/material/Avatar";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import Header from "../components/Header";

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

const profile = {
  name: "Olivia Carter",
  email: "olivia.carter@email.com",
  phone: "+1 (415) 555-2189",
  memberSince: "Sep 2022",
  avatarUrl: "https://placehold.co/200x200",
};

const stats = [
  { label: "Movies watched", value: "86", icon: <MovieCreationIcon /> },
  { label: "Seats booked", value: "214", icon: <EventSeatIcon /> },
  { label: "Total spent", value: "$1,234", icon: <CreditCardIcon /> },
];

export default function ProfilePage() {
  return (
    <PageContainer maxWidth="lg">
      <Header />
      <ProfileShell>
        <HeroCard elevation={0}>
          <HeroContent>
            <AvatarRing>
              <Avatar
                src={profile.avatarUrl}
                alt={profile.name}
                sx={{ width: 96, height: 96 }}
              />
            </AvatarRing>

            <HeroTextBlock>
              <HeroTitle variant="h3">{profile.name}</HeroTitle>
              <MetaRow>
                <span>
                  <CalendarTodayIcon /> Member since {profile.memberSince}
                </span>
              </MetaRow>
              <MetaRow>
                <span>
                  <EmailOutlinedIcon />
                  {profile.email}
                </span>
              </MetaRow>
              <MetaRow>
                <span>
                  <PhoneIphoneIcon />
                  {profile.phone}
                </span>
              </MetaRow>
            </HeroTextBlock>

            <HeroActions>
              <PrimaryActionButton variant="contained">
                Log Out
              </PrimaryActionButton>
            </HeroActions>
          </HeroContent>
        </HeroCard>

        <StatsGrid>
          {stats.map((stat) => (
            <StatCard key={stat.label}>
              {stat.icon}
              <StatLabel variant="body2">{stat.label}</StatLabel>
              <StatValue variant="h5">{stat.value}</StatValue>
            </StatCard>
          ))}
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
