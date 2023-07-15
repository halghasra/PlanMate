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
            <Box sx={{ minWidth: 600 }}>
            <DialogTitle>Create Event</DialogTitle>
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
                        name="eventType"
                        label="Event Type"
                        value={eventData.eventType}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        name="startDate"
                        label="Start Date"
                        type="date"
                        value={eventData.startDate}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        name="endDate"
                        label="End Date"
                        type="date"
                        value={eventData.endDate}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        name="startTime"
                        label="Start Time"
                        type="time"
                        value={eventData.startTime}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        name="endTime"
                        label="End Time"
                        type="time"
                        value={eventData.endTime}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
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
