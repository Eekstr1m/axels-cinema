// MUI Components
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

// Styled Components
import {
  SeatsAvailabilityChip,
  SeatsAvailabilityText,
  SeatsBox,
  SessionCard,
  SessionListContainer,
  SessionsHeading,
  SessionTimeText,
  TimeBox,
} from "../styled/SessionList.styled";

// MUI Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventSeatIcon from "@mui/icons-material/EventSeat";

// Other
import type { Session } from "../types";

export default function SessionList({
  sessions,
  onSessionSelect,
}: {
  sessions: Session[];
  onSessionSelect: (session: Session) => void;
}) {
  return (
    <SessionListContainer>
      <SessionsHeading variant="h4">Select a session time</SessionsHeading>
      <Grid container spacing={2}>
        {sessions.map((session) => {
          const availableSeats = session.seats
            .flat()
            .filter((seat) => !seat.isBooked).length;
          const totalSeats = session.seats.flat().length;

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={session.id}>
              <SessionCard onClick={() => onSessionSelect(session)}>
                <CardContent>
                  <TimeBox>
                    <AccessTimeIcon color="primary" />
                    <SessionTimeText variant="h5">
                      {session.time}
                    </SessionTimeText>
                  </TimeBox>

                  <SeatsBox>
                    <EventSeatIcon fontSize="small" />
                    <SeatsAvailabilityText variant="body2">
                      Available seats: {availableSeats} з {totalSeats}
                    </SeatsAvailabilityText>
                  </SeatsBox>

                  <SeatsAvailabilityChip
                    label={
                      availableSeats > 0
                        ? "Seats available"
                        : "No seats available"
                    }
                    size="small"
                    color={availableSeats > 0 ? "success" : "error"}
                  />
                </CardContent>
              </SessionCard>
            </Grid>
          );
        })}
      </Grid>
    </SessionListContainer>
  );
}
