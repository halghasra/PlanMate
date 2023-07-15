import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";

const EventPopup = ({ isOpen, onClose, onSubmit }) => {
    const [eventData, setEventData] = useState({
        title: "",
        eventType: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        notes: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(eventData);
        setEventData({
            title: "",
            eventType: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            notes: "",
        });
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        name="title"
                        label="Title"
                        value={eventData.title}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        name="eventType"
                        label="Event Type"
                        value={eventData.eventType}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        name="startDate"
                        label="Start Date"
                        type="date"
                        value={eventData.startDate}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        name="endDate"
                        label="End Date"
                        type="date"
                        value={eventData.endDate}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        name="startTime"
                        label="Start Time"
                        type="time"
                        value={eventData.startTime}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        name="endTime"
                        label="End Time"
                        type="time"
                        value={eventData.endTime}
                        onChange={handleChange}
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
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EventPopup;
