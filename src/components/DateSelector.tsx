// Styled Components
import {
  DateChip,
  DateSelectorContainer,
  DatesGrid,
  DatesHeading,
} from "../styled/DateSelector.styled";

// Other
import { formatDate } from "../utils/utils";

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
    <DateSelectorContainer>
      <DatesHeading variant="h4">Select a date</DatesHeading>
      <DatesGrid container spacing={2}>
        {dates.map((date) => (
          <DateChip
            key={date}
            label={formatDate(date)}
            onClick={() => onDateSelect(date)}
            isSelected={selectedDate === date}
            color={selectedDate === date ? "primary" : "default"}
            variant={selectedDate === date ? "filled" : "outlined"}
          />
        ))}
      </DatesGrid>
    </DateSelectorContainer>
  );
}
