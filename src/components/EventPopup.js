import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Box,
} from "@mui/material";

const EventPopup = ({ isOpen, onClose, onSubmit }) => {
  // Initialise event data with default values:
  const currentDate = new Date().toISOString().slice(0, 16); // Get the current date and time in the format "YYYY-MM-DDThh:mm"
  const [eventData, setEventData] = useState({
    title: "",
    start: currentDate, // Set the current date and time as the default start date and time,
    end: "",
    allDay: false, // Set the allDay default value as false
    description: "",
    category: "",
    backgroundColor: "",
  });

  // Reset fields when the popup is opened
  useEffect(() => {
    if (isOpen) {
      setEventData((prevData) => ({
        title: "",
        start: currentDate,
        end: "",
        allDay: false,
        description: "",
        category: "",
        backgroundColor: "",
      }));
    }
  }, [isOpen]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle all day switch
  const handleAllDayToggle = () => {
    setEventData((prevData) => ({
      ...prevData,
      allDay: !prevData.allDay,
    }));
  };

  // Calculate end time based on start time and selected duration
  const handleEndTimeClick = (minutes) => {
    const start = new Date(eventData.start);
    const timeZoneOffset = start.getTimezoneOffset(); // Get the timezone offset in minutes
    const end = new Date(start.getTime() + (minutes - timeZoneOffset) * 60000) // Calculate end time by adding the minutes to the start time
    setEventData((prevData) => ({
      ...prevData,
      end: end.toISOString().slice(0, 16), // Convert the end time to the format "YYYY-MM-DDThh:mm"
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    onSubmit(eventData);
    onClose();
  };

  

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box sx={{ minWidth: 600 }}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          {/* Event title */}
          <Box sx={{ marginBottom: 2, marginTop: 2 }}>
            <TextField
              name="title"
              label="Title"
              value={eventData.title}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Box>
          {/* Event start */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              name="start"
              label="Start"
              type="datetime-local"
              value={eventData.start}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            {/* All Day switch */}
            <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    name="allDay"
                    checked={eventData.allDay}
                    onChange={handleAllDayToggle}
                  />
                }
                label="All Day"
              />
            </Box>
          </Box>
          {/* Event end */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              name="end"
              label="End"
              type="datetime-local"
              value={eventData.end}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            {/* Duration buttons */}
            {!eventData.allDay && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 2,
                }}
              >
                <Button onClick={() => handleEndTimeClick(15)}>15 minutes</Button>
                <Button onClick={() => handleEndTimeClick(30)}>30 minutes</Button>
                <Button onClick={() => handleEndTimeClick(45)}>45 minutes</Button>
                <Button onClick={() => handleEndTimeClick(60)}>1 hour</Button>
              </Box>
            )}
          </Box>
          {/* Event description */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              name="description"
              label="Description"
              multiline
              rows={4}
              value={eventData.description}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Box>
          {/* Event category */}
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={eventData.category}
                onChange={handleChange}
              >
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
                <MenuItem value="Event">Event</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Event background color */}
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Background Color</InputLabel>
              <Select
                name="backgroundColor"
                value={eventData.backgroundColor}
                onChange={handleChange}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="#f00">Red</MenuItem>
                <MenuItem value="#0f0">Green</MenuItem>
                <MenuItem value="#00f">Blue</MenuItem>
                {/* Add more color options here */}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EventPopup;
