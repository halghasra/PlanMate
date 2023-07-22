import React, { useState, useEffect } from "react";
import { ThemeProvider, Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import theme from "../theme/theme";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import EventPopup from "./EventPopup";
import { nanoid } from "nanoid";

export default function Calendar({ user }) {
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
        start: doc.data().start, // Change v3: use the start date directly from Firestore
        end: doc.data().end, // Same thing for the end date
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
    const {
      title,
      eventType,
      startDate,
      endDate,
      startTime,
      endTime,
      notes,
      isFullDay,
    } = eventData;

    let eventStart = startDate;
    let eventEnd = endDate;
    let groupId = nanoid(); // Generate a unique groupId for the event using nanoid

    if (isFullDay) {
      // If it's a full-day event, adjust the end date by adding one day
      const nextDay = new Date(endDate);
      nextDay.setDate(nextDay.getDate() + 1);
      eventEnd = nextDay.toISOString();
    } else if (!isFullDay && startTime && endTime) {
      // If both start time and end time are provided, it's a timed event
      eventStart = `${startDate}T${startTime}:00`;
      eventEnd = `${endDate}T${endTime}:00`;
    }

    // Create a new event
    const event = {
      title,
      start: eventStart,
      end: eventEnd,
      allDay: isFullDay,
      eventType,
      startTime,
      endTime,
      notes,
      groupId,
      userId: user.uid,
      createdAt: serverTimestamp(),
    };

    // Add the event to Firestore
    const docRef = await addDoc(collection(db, "events"), event);
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        id: docRef.id,
        title,
        start: eventStart,
        end: eventEnd,
        groupId,
        ...event,
      },
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
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            slotDuration="00:15" // Specify the duration of each slot
            slotMinTime="00:00:00" // Specify the minimum time to display in slots
            slotMaxTime="24:00:00" // Specify the maximum time to display in slots
            allDaySlot={false} // Disable all-day slot
            dateClick={handleDateClick}
            events={events}
            eventContent={renderEventContent}
            editable={true}
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