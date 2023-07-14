import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import theme from "../theme/theme";
import { Box } from "@mui/material";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Calendar({ user}) {
    // State variable to store events
    const [events, setEvents] = useState([]);

    useEffect(() => {
      // Fetch events from Firestore
      const fetchEvents = async () => {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        // Map the events data and update the state
        const eventsData = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      };
  
      fetchEvents();
    }, []);

    // Function to handle date click events on the calendar
    const handleDateClick = async (arg) => {
      // Prompt user to enter event title
      const title = prompt("Enter event title:");
      if (title) {
        // Create the event object with all the necessary data
        const event = {
          title,
          date: arg.dateStr,
          userId: user.uid, // here we're associating the events with the logged on user
          createdAt: serverTimestamp(), // And adding the timestamp for the event creation
        };
        // add the event to the Firestore collection
        const docRef = await addDoc(collection(db, "events"), event);
        // Update the state with the new event by spreading the existing events and adding the new event
        setEvents((prevEvents) => [
          ...prevEvents,
          { id: docRef.id, ...event },
        ]);
      }
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
        </ThemeProvider>
      );
    }


