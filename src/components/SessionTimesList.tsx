// Styled Components
import {
  SessionCard,
  SessionListContainer,
  SessionsHeading,
  SessionTimeText,
  TimeBox,
} from "../styled/components/SessionList.styled";

// MUI Components
import Box from "@mui/material/Box";

// MUI Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Other
import type { Session } from "../interfaces/sessions.interface";

export default function SessionTimesList({
  sessions,
  onSessionSelect,
}: {
  sessions: Session[] | null;
  onSessionSelect: (sessionId: string) => void;
}) {
  if (!sessions || sessions.length === 0) {
    return null;
  }

  return (
    <SessionListContainer>
      <SessionsHeading variant="h5">
        <AccessTimeIcon color="primary" />
        Select a session time
      </SessionsHeading>

      <Box display="flex" flexWrap="wrap" gap={2} columnGap={2} rowGap={2}>
        {sessions.map((session) => (
          <Box
            key={session._id}
            sx={{ width: { xs: "100%", sm: "48%", md: "31%" }, minWidth: 180 }}
          >
            <SessionCard onClick={() => onSessionSelect(session._id)}>
              <TimeBox>
                <AccessTimeIcon color="primary" />
                <SessionTimeText>{session.startTime}</SessionTimeText>
              </TimeBox>
            </SessionCard>
          </Box>
        ))}
      </Box>
    </SessionListContainer>
  );
}
