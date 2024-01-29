import React from "react";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

const TaskCalendar: React.FC = () => {
  return (
    <>
      <Calendar usageStatistics={false} />
    </>
  );
};

export default TaskCalendar;
