import NotFoundException from "./NotFoundException";

import EventIcon from "@mui/icons-material/Event";
import EventBusyIcon from "@mui/icons-material/EventBusy";

// Styled Components
import {
  DateCard,
  DateCardDay,
  DateCardMonth,
  DateCardWeekday,
  DateSelectorContainer,
  DatesHeading,
  DatesHeadingText,
  DatesScrollContainer,
} from "../styled/components/DateSelector.styled";

// MUI Icons
import { parseDate } from "../utils/utils";

// Other

export default function DateSelector({
  dates,
  selectedDate,
  onDateSelect,
}: {
  dates: string[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}) {
  if (!dates || dates.length === 0) {
    return (
      <NotFoundException
        icon={<EventBusyIcon />}
        title="Sessions"
        subtitle="No available sessions for this movie at the moment."
      />
    );
  }

  return (
    <DateSelectorContainer>
      <DatesHeading>
        <EventIcon />
        <DatesHeadingText>Select a date</DatesHeadingText>
      </DatesHeading>

      <DatesScrollContainer>
        {dates.map((date) => {
          const isSelected = selectedDate === date;
          const { day, weekday, month } = parseDate(date);

          return (
            <DateCard
              key={date}
              isSelected={isSelected}
              onClick={() => onDateSelect(date)}
              elevation={isSelected ? 8 : 2}
            >
              <DateCardWeekday isSelected={isSelected}>
                {weekday}
              </DateCardWeekday>

              <DateCardDay isSelected={isSelected}>{day}</DateCardDay>

              <DateCardMonth isSelected={isSelected}>{month}</DateCardMonth>
            </DateCard>
          );
        })}
      </DatesScrollContainer>
    </DateSelectorContainer>
  );
}
