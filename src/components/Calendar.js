import React, { useState, useRef } from "react";
import {
  Tabs,
  Tab,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref } from 'firebase/storage';

const Calendar = () => {
  // Current date
  const [currentDate, setCurrentDate] = useState(new Date());
  // event title
  const [eventTitle, setEventTitle] = useState('');
  // event description
  const [eventDescription, setEventDescription] = useState('');

  const handleDateChange = (date) => {
    // set current date to the new date
    setCurrentDate(date);
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

    // get the current user
    const user = auth.currentUser;

    // Create a new document in the events collection
    const ref = db.collection("events").doc(user.uid);

    // Create a new event object
    ref.set({
        title: eventTitle,
        description: eventDescription,
        date: currentDate,
    });
  };

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
        <TextField label="Event Title" onChange={handleEventTitleChange} />
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
