// MUI Components
import Grid from "@mui/material/Grid";

// Styled Components
import {
  NoSessionsText,
  SessionCard,
  SessionListContainer,
  SessionsHeading,
  SessionTimeText,
  TimeBox,
} from "../styled/components/SessionList.styled";

// MUI Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Other
import type { SessionListItem } from "../types";

export default function SessionList({
  sessions,
  onSessionSelect,
}: {
  sessions: SessionListItem[];
  onSessionSelect: (sessionId: string) => void;
}) {
  return (
    <SessionListContainer>
      <SessionsHeading variant="h4">Select a session time</SessionsHeading>
      <Grid container spacing={2}>
        {sessions.length ? (
          sessions.map((session) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={session.id}>
              <SessionCard onClick={() => onSessionSelect(session.id)}>
                <TimeBox>
                  <AccessTimeIcon color="primary" />
                  <SessionTimeText variant="h5">{session.time}</SessionTimeText>
                </TimeBox>
              </SessionCard>
            </Grid>
          ))
        ) : (
          <NoSessionsText variant="h5">No available sessions</NoSessionsText>
        )}
      </Grid>
    </SessionListContainer>
  );
}
