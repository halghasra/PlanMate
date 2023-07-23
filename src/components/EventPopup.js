import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

const EventPopup = ({ isOpen, onClose, onSubmit }) => {
  const [eventData, setEventData] = useState({
    title: "",
    start: "",
    end: "",
    notes: "",
    isFullDay: false, // added isFullDay flag to the state to give the option to the user to select if the event is a full-day event or not
  });

  useEffect(() => {
    if (isOpen) {
      setEventData((prevData) => ({
        ...prevData,
        isFullDay: false, // Reset the isFullDay flag when the popup is opened
      }));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // added function to handle the checkbox change event
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    // Remove the isFullDay flag from the eventData object
    const { isFullDay, ...eventDataWithoutIsFullDay } = eventData;
    const event = {
      ...eventDataWithoutIsFullDay,
      isFullDay,
    };
    onSubmit(event);
    setEventData({
      title: "",
      start: "",
      end: "",
      notes: "",
      isFullDay: false,
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box sx={{ minWidth: 600 }}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
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
          </Box>
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
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isFullDay"
                  checked={eventData.isFullDay}
                  onChange={handleCheckboxChange}
                />
              }
              label="Full-day event"
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              name="notes"
              label="Notes"
              multiline
              rows={4}
              value={eventData.notes}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
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
