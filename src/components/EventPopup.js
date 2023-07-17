import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, FormControlLabel, Box } from "@mui/material";

const EventPopup = ({ isOpen, onClose, onSubmit }) => {
    const [eventData, setEventData] = useState({
        title: "",
        eventType: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
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
            eventType: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            notes: "",
            isFullDay: false,
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
                        name="startTime"
                        label="Start Time"
                        type="time"
                        value={eventData.startTime}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        disabled={eventData.isFullDay} // Disable start time field if it's a full-day event
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
                        disabled={eventData.isFullDay} // Disable end time field if it's a full-day event
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
