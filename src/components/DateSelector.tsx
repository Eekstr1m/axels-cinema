import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { formatDate } from "../utils/utils";
import Grid from "@mui/material/Grid";

export default function DateSelector({
  dates,
  selectedDate,
  onDateSelect,
}: {
  dates: string[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Select a date
      </Typography>
      <Grid container sx={{ placeContent: "center" }} spacing={2}>
        {dates.map((date) => (
          <Chip
            key={date}
            label={formatDate(date)}
            onClick={() => onDateSelect(date)}
            color={selectedDate === date ? "primary" : "default"}
            variant={selectedDate === date ? "filled" : "outlined"}
            sx={{
              fontSize: "0.95rem",
              fontWeight: selectedDate === date ? 600 : 400,
              cursor: "pointer",
              "&:hover": {
                backgroundColor:
                  selectedDate === date ? "primary.dark" : "action.hover",
              },
            }}
          />
        ))}
      </Grid>
    </Box>
  );
}
