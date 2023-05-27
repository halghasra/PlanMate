import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton,
  LocalizationProvider,
  TextField,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import { useTheme } from "@mui/material/styles";
import firebase from "firebase";

const Calendar = () => {
  // Current date
  const [currentDate, setCurrentDate] = useState(new Date());
  // An array of selected dates
  const [selectedDates, setSelectedDates] = useState([]);
  // Boolean value to indicate whether the date range picker is open
  const [isRangePickerOpen, setIsRangePickerOpen] = useState(false);

  // event title
  const [eventTitle, setEventTitle] = useState("");

  // event description
  const [eventDescription, setEventDescription] = useState("");

  // using the main theme
  const theme = useTheme();

  const handleDateChange = (date) => {
    // set current date to the new date
    setCurrentDate(date);
  };

  const handleRangePickerOpenChange = (isOpen) => {
    // set the boolean value to the new value when the date range picker opens
    setIsRangePickerOpen(isOpen);
  };

  const handleSelectedDatesChange = (dates) => {
    // set the selected date array to a new value
    setSelectedDates(dates);
  };

  const handleEventTitleChange = (eventTitle) => {
    // set the event title valriable to a new value
    setEventTitle(eventTitle);
  };

  const handleEventDescriptionChange = (eventDescription) => {
    // set the event description to the new value
    setEventDescription(eventDescription);
  };

  const handleCreateEvent = () => {
    // ... this will be developed later ...
  }

  return (
    <Box>
      <Tabs variant="fullWidth" value={currentDate} onChange={handleDateChange}>
        <Tab label="Month" />
        <Tab label="Week" />
        <Tab label="Day" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        <DatePicker
          disablePast
          value={currentDate}
          onChange={handleDateChange}
          label="Select Date"
          style={{ width: 200 }}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Event Title"
          onChange={handleEventTitleChange}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Event Description"
          onChange={handleEventDescriptionChange}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreateEvent}>
          Create Event
        </Button>
      </Box>
    </Box>
  );
};

export default Calendar;