/**
 * A popup component for creating, editing, and deleting events.
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the popup is open or not.
 * @param {function} props.onClose - Function to close the popup.
 * @param {function} props.onSubmit - Function to submit the form data for creating a new event.
 * @param {function} props.onUpdate - Function to submit the form data for updating an existing event.
 * @param {function} props.onDelete - Function to delete an existing event.
 * @param {string} props.selectedEventId - The ID of the selected event for editing or deleting.
 * @param {Object} props.eventData - The data of the selected event for editing.
 * @param {string} props.selectedStartDate - The start date of the selected event.
 * @param {string} props.selectedEndDate - The end date of the selected event.
 * @returns {JSX.Element} - The EventPopup component.
 */
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
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const EventPopup = ({
  isOpen,
  onClose,
  onSubmit,
  onUpdate,
  onDelete,
  selectedEventId,
  eventData: initialEventData,
  selectedStartDate,
  selectedEndDate,
}) => {
  // Determine if it's a new event
  const isNewEvent = !selectedEventId;
  // Initialise event data with default values or use the initialEventData if it is passed as a prop:
  const [eventData, setEventData] = useState(
    initialEventData || {
      title: "",
      start: "",
      end: "",
      allDay: false,
      description: "",
      category: "",
      backgroundColor: "",
    }
  );

  // useEffect is refactored into smalled blocks of code,
  // this is the first useEffect block, it will activate if the user clicks on the "Add Event" button. it will reset 'eventData' and set the 'start' date to the current date
  useEffect(() => {
    if (isNewEvent) {
      const currentDate = new Date().toLocaleString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).replace(/ /, "T");
      
      console.log("currentDate:", currentDate);

      setEventData({
        title: "",
        start: currentDate,
        end: "",
        allDay: false,
        description: "",
        category: "",
        backgroundColor: "",
      });
    }
  }, [isNewEvent]);

  // this is the second useEffect block, it will activate when the user selects dates from the calendar. It will preload the 'start' and 'end' time with the selection, and toggle the 'allDay' switch based on the view
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const allDay = !selectedStartDate.includes("T");
      setEventData((prevData) => ({
        ...prevData,
        start: selectedStartDate,
        end: selectedEndDate,
        allDay: allDay,
      }));
    }
  }, [selectedStartDate, selectedEndDate]);

  // this is the third useEffect block, it will activate if the user selects an existing event for editing. it will load the event data for editing
  useEffect(() => {
    // If the popup is open and there is a selected event id, it means the user has clicked on an existing event, so fetch the event data from Firestore
    if (isOpen && selectedEventId) {
      const fetchEventDetails = async () => {
        const eventDoc = doc(db, "events", selectedEventId);
        const eventSnapshot = await getDoc(eventDoc);
        // If the event exists, set the event data
        if (eventSnapshot.exists()) {
          const eventDataFromFirestore = eventSnapshot.data();
          setEventData(eventDataFromFirestore);
        }
      };
      fetchEventDetails();
      // If the popup is open and there is no selected event id, it means the user has closed the popup, so reset the event data
    } else if (isOpen && !isNewEvent && initialEventData) {
      setEventData(initialEventData);
    }
  }, [isOpen, selectedEventId, isNewEvent, initialEventData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Additional validation for start and end dates
    if (name === "start" || name === "end") {
      // Prevent setting start date after end date
      const fieldName = name === "start" ? "Start" : "End";
      const selectedDate = new Date(value);
      const startDate = new Date(eventData.start);

      if (name === "end" && selectedDate < startDate) {
        // Prevent setting end date before start date
        return;
      }
    }

    const newValue = name === "allDay" ? value === "true" : value;

    setEventData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  // Handle delete button click
  const handleDelete = () => {
    onDelete(selectedEventId); // Pass the event id to the parent component for deletion
    onClose();
  };

  // Calculate start and end times for all day events
  const calculateAllDayTimes = (date) => {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1); // Set end time to the next day
    end.setMilliseconds(end.getMilliseconds() - 1); // Set end time to the last millisecond of the day
    return {
      start: start.toISOString().slice(0, 16),
      end: end.toISOString().slice(0, 16),
    };
  };

  // Toggle all day switch
  const handleAllDayToggle = () => {
    const allDay = !eventData.allDay;
    if (allDay) {
      // Calculate all day start and end times
      const { start, end } = calculateAllDayTimes(eventData.start);
      setEventData((prevData) => ({
        ...prevData,
        allDay,
        start,
        end,
      }));
    } else {
      // Calculate start and end times for non-all day events
      const start = new Date(eventData.start);
      const end = new Date(eventData.end);
      setEventData((prevData) => ({
        ...prevData,
        allDay,
        start: start.toISOString().slice(0, 16),
        end: end.toISOString().slice(0, 16),
      }));
    }
  };

  // Calculate end time based on start time and selected duration
  const handleEndTimeClick = (minutes) => {
    const start = new Date(eventData.start);
    const timeZoneOffset = start.getTimezoneOffset(); // Get the timezone offset in minutes
    const end = new Date(start.getTime() + (minutes - timeZoneOffset) * 60000); // Calculate end time by adding the minutes to the start time
    setEventData((prevData) => ({
      ...prevData,
      end: end.toISOString().slice(0, 16), // Convert the end time to the format "YYYY-MM-DDThh:mm"
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (selectedEventId) {
      onUpdate({ ...eventData, id: selectedEventId }); // Call the onUpdate function for updating
    } else {
      onSubmit(eventData); // Call the onSubmit function for creating
    }
    onClose(); // Close the popup
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box sx={{ minWidth: 600 }}>
      <DialogTitle>{selectedEventId ? "Edit Event" : "Add Event"}</DialogTitle>
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
          {/* Event start */}
          <Box sx={{ marginBottom: 2 }}>
            {eventData.allDay ? (
              <TextField
                name="start"
                label="Start Date"
                type="date"
                value={eventData.start}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            ) : (
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
            )}
          </Box>

          {/* Event end */}
          <Box sx={{ marginBottom: 2 }}>
            {eventData.allDay ? (
              <TextField
                name="end"
                label="End Date"
                type="date"
                value={eventData.end.slice(0, 10)}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                inputProps={{
                  min: eventData.end.slice(0, 10), // Prevent end time from being before start time
                }}
              />
            ) : (
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
                inputProps={{
                  min: eventData.start, // Prevent end time from being before start time
                }}
              />
            )}
            {/* Duration buttons */}
            {!eventData.allDay && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 2,
                }}
              >
                <Button onClick={() => handleEndTimeClick(15)}>
                  15 minutes
                </Button>
                <Button onClick={() => handleEndTimeClick(30)}>
                  30 minutes
                </Button>
                <Button onClick={() => handleEndTimeClick(45)}>
                  45 minutes
                </Button>
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
                <MenuItem value="#8969FE">Purple</MenuItem>
                <MenuItem value="#FE6994">Red</MenuItem>
                <MenuItem value="#69FE89">Green</MenuItem>
                <MenuItem value="#6994FE">Blue</MenuItem>
                <MenuItem value="#DEFE69">Yellow</MenuItem>
                <MenuItem value="#69FED3">Cyan</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          {selectedEventId && <Button onClick={handleDelete}>Delete</Button>}
          <Button onClick={handleSubmit}>
            {selectedEventId ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EventPopup;
