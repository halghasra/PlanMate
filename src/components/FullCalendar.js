import React, { useState, useEffect } from "react";
import { ThemeProvider, Box, Button } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import theme from "../theme/theme";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import EventPopup from "./EventPopup";

export default function Calendar({ user}) {
    // State variable to store events
    const [events, setEvents] = useState([]);
    // State variable to control the popup
    const [isPopupOpen, setPopupOpen] = useState(false); 

    useEffect(() => {
      // Fetch events from Firestore
      const fetchEvents = async () => {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        // Map the events data and update the state
        const eventsData = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          start: doc.data().startDate, // specify the start property
          end: doc.data().endDate, // specify the end property
          ...doc.data(),
        }));
        setEvents(eventsData);
      };
  
      fetchEvents();
    }, []);

    // Function to handle date click events on the calendar
    const handleDateClick = () => {
      setPopupOpen(true);
    };

    // Function to handle event create on the calendar
    const handleEventCreate = async (eventData) => {
      // Destructure the eventData
      const { title, eventType, startDate, endDate, startTime, endTime, notes } = eventData;
      // Create a new event
      const event = {
        title,
        eventType,
        startDate,
        endDate,
        startTime,
        endTime,
        notes,
        userId: user.uid,
        createdAt: serverTimestamp(),
    };
    
    // Add the event to Firestore
    const docRef = await addDoc(collection(db, "events"), event);
    setEvents((prevEvents) => [
      ...prevEvents,
      { id: docRef.id, title, start: startDate, end: endDate, ...event },
    ]);
    // Close the popup
    setPopupOpen(false);
    };

    // Function to render event content
    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        );
    };

    return (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              height: "100hv",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "90%" }}>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={false}
                dateClick={handleDateClick}
                events={events}
                eventContent={renderEventContent}
              />
            </Box>
          </Box>
          <EventPopup
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            onSubmit={handleEventCreate}
          />
        </ThemeProvider>
      );
    }


