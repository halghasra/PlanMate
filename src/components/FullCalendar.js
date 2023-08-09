import React, { useState, useEffect } from "react";
import { ThemeProvider, Box, CircularProgress } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import theme from "../theme/theme";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import EventPopup from "./EventPopup";


const Calendar = ({ user }) => {
  // State variable to store events
  const [events, setEvents] = useState([]);
  // State variable to control the popup
  const [isPopupOpen, setPopupOpen] = useState(false);
  // State variable to store the selected event ID
  const [selectedEventId, setSelectedEventId] = useState(null);
  // State variable to store the loading state
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Initialise the user variable
    const userRef = auth.currentUser;
    const user = userRef ? userRef : null;
    // Check if the user is logged in
    if(!user) {
      console.log("User not logged in");
      setLoading(false);
      return;
    } else {
      console.log("User logged in ", auth.currentUser.uid);
    }

    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventData = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((event) => event.userId === user.uid);
      setEvents(eventData);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  // Function to handle event click on the calendar
  const handleEventClick = (clickInfo) => {
    setSelectedEventId(clickInfo.event.id); // store the event id
    setPopupOpen(true); // open the popup
  };

  // Function to handle event update on the calendar
  const handleEventUpdate = async (updatedEvent) => {
    console.log("handleEventUpdate called");
    // Find the index of the updated event in the events array
    const updatedIndex = events.findIndex(
      (event) => event.id === updatedEvent.id
    );

    console.log("Updated event index:", updatedIndex);
  
    if (updatedIndex !== -1) {
      console.log("Updating event in state");
      // Update the event in the events array
      const updatedEvents = [...events];
      updatedEvents[updatedIndex] = updatedEvent;
      setEvents(updatedEvents);
  
      console.log("Updated events array:", updatedEvents);
  
      // Update the event in Firestore
      const eventRef = doc(db, "events", updatedEvent.id);
      await updateDoc(eventRef, updatedEvent)
        .then(() => {
          console.log("Event updated in Firestore");
        })
        .catch((error) => {
          console.error("Error updating event in Firestore:", error);
        });
    }
  
    setSelectedEventId(updatedEvent.id);
  };

  // Function to handle event delete on the calendar
  const handleEventDelete = async (eventId) => {
    // Check if the user is allowed to delete the event
    const eventToDelete = events.find((event) => event.id === eventId);
    if (eventToDelete && eventToDelete.userId === user.uid) {
      // Remove the event from the events array
      const updatedEvents = events.filter((event) => event.id !== eventId);
      setEvents(updatedEvents);

      // then remove the event from Firestore
      const eventRef = doc(db, "events", eventId);
      await deleteDoc(eventRef);
    }
  };

  // Function to handle date click events on the calendar
  const handleDateClick = () => {
    setSelectedEventId(null); // Reset selected event ID when adding new events
    setPopupOpen(true);
  };

  // Function to handle the "Add a new event" button click
  const handleAddEventButtonClick = () => {
    setSelectedEventId(null); // Reset selected event ID when adding new events
    setPopupOpen(true);
  };

  // Function to handle event create on the calendar
  const handleEventCreate = async (eventData) => {
    // Add the event to Firestore
    const newEventRef = await addDoc(collection(db, "events"), {
      userId: user.uid,
      startStr: eventData.start,
      endStr: eventData.end,
      ...eventData,
    });

    // Update the state with the new event
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        id: newEventRef.id,
        userId: user.uid,
        startStr: eventData.start,
        endStr: eventData.end,
        ...eventData,
      },
    ]);

    // Close the popup
    setPopupOpen(false);
    setSelectedEventId(null);
  };

  // Function to render event content
  const renderEventContent = (eventInfo) => {
    return (
      <div
        onClick={() => {
          setSelectedEventId(eventInfo.event.id);
          setPopupOpen(true);
        }}
      >
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
            customButtons={{
              addEventButton: {
                text: "Add event",
                click: handleAddEventButtonClick,
              },
            }}
            headerToolbar={{
              left: "prev,next today addEventButton",
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
            selectable={true}
            dayMaxEvents={true}
            eventClick={handleEventClick}
          />
        </Box>
      </Box>
      <EventPopup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onSubmit={handleEventCreate}
        onUpdate={handleEventUpdate}
        onDelete={handleEventDelete}
        selectedEventId={selectedEventId}
      />
    </ThemeProvider>
  );
}

export default Calendar;