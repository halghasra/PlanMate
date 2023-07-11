import React from "react";
import { ThemeProvider } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import theme from "../theme/theme";
import { Box, Button, CircularProgress } from "@mui/material";

export default function Calendar() {
    const handleDateClick = (arg) => {
        alert(arg.dateStr);
    };

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
              height: "100hv", // Subtract the height of the header
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
                dateClick={(e) => handleDateClick(e)}
                events={[
                  { title: "event 1", date: "2021-05-07" },
                  { title: "event 2", date: "2021-05-17" },
                ]}
                eventContent={renderEventContent}
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button variant="contained" color="primary" sx={{ mx: 1 }}>
                  Button 1
                </Button>
                <Button variant="contained" color="secondary" sx={{ mx: 1 }}>
                  Button 2
                </Button>
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      );
    }


