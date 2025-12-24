import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { SessionListItem } from "../types";

export default function SessionList({
  sessions,
  onSessionSelect,
}: {
  sessions: SessionListItem[];
  selectedDate: string;
  onSessionSelect: (sessionId: string) => void;
}) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Select a session time
      </Typography>
      <Grid container spacing={2}>
        {sessions.map((session) => {
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
                onClick={() => onSessionSelect(session.id)}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <AccessTimeIcon color="primary" />
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {session.time}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
