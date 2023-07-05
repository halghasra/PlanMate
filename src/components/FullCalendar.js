import React from "react";
import { ThemeProvider } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import theme from "../theme/theme";
import { Box } from "@mui/system";

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
            <Box sx={{ height: '100%', width: "calc(100vw - 240px)" }}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              weekends={false}
              dateClick={(e) => handleDateClick(e)}
              events={[
                { title: "event 1", date: "2021-05-07" },
                { title: "event 2", date: "2021-05-17" }
              ]}
              eventContent={renderEventContent}
            />
            </Box>
        </ThemeProvider>
      );
}



