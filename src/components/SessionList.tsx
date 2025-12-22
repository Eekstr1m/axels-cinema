import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import Chip from "@mui/material/Chip";
import type { Session } from "../types";

export default function SessionList({
  sessions,
  onSessionSelect,
}: {
  sessions: Session[];
  onSessionSelect: (session: Session) => void;
}) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Select a session time
      </Typography>
      <Grid container spacing={2}>
        {sessions.map((session) => {
          const availableSeats = session.seats
            .flat()
            .filter((seat) => !seat.isBooked).length;
          const totalSeats = session.seats.flat().length;

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={session.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
                onClick={() => onSessionSelect(session)}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      gap: 1,
                    }}
                  >
                    <AccessTimeIcon color="primary" />
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {session.time}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <EventSeatIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Available seats: {availableSeats} з {totalSeats}
                    </Typography>
                  </Box>

                  <Chip
                    label={
                      availableSeats > 0
                        ? "Seats available"
                        : "No seats available"
                    }
                    size="small"
                    color={availableSeats > 0 ? "success" : "error"}
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
