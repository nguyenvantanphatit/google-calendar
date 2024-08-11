export const eventsData = [
    {
      id: "1",
      title: "Appointment",
      start: "2024-08-10T10:00:00",
      end: "2024-08-10T11:00:00",
      desc: "desc",
      url: "https://meet.google.com/hwn-gsgz-oqx",
      type: "appointment",
      classNames: ["appointment-event"],
    },
    {
      id: "2",
      title: "Event NextJs",
      start: "2024-08-11T14:00:00",
      end: "2024-08-11T15:00:00",
      desc: "desc",
      url: "https://meet.google.com/hwn-gsgz-oqx",
      type: "event",
      classNames: ["webinar-event"],
    },
    {
      id: "3",
      title: "Daily Meeting",
      start: "2024-08-11T14:00:00",
      end: "2024-08-11T15:00:00",
      desc: "desc",
      url: "https://meet.google.com/hwn-gsgz-oqx",
      rrule: {
        freq: "weekly",
        interval: 1,
        byweekday: ["mo"],
        dtstart: "2024-08-09T09:00:00",
        until: "2024-12-31"
      },
      type: "appointment",
      classNames: ["appointment-event"],
    },
    {
      id: "4",
      title: "Event ReactJs",
      start: "2024-08-15T13:00:00",
      end: "2024-08-15T14:00:00",
      desc: "desc",
      url: "https://meet.google.com/hwn-gsgz-oqx",
      rrule: {
        freq: "weekly",
        interval: 1,
        byweekday: ["fr"],
        dtstart: "2024-08-09T09:00:00",
        until: "2024-12-31"
      },
      type: "event",
      classNames: ["webinar-event"],
    },
    {
      id: "5",
      title: "Event NodeJs",
      start: "2024-08-14T14:00:00",
      end: "2024-08-14T15:00:00",
      desc: "desc",
      url: "https://meet.google.com/hwn-gsgz-oqx",
      type: "event",
      classNames: ["webinar-event"],
    },
  ];
  

export const daysOfWeek: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];