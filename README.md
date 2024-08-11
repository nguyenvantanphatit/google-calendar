# 1

```json
[
  {
    "id": "1",
    "title": "Appointment",
    "start": "2024-08-10T10:00:00",
    "end": "2024-08-10T11:00:00",
    "desc": "desc",
    "url": "https://meet.google.com/hwn-gsgz-oqx",
    "type": "appointment",
    "classNames": ["appointment-event"]
  },
  {
    "id": "2",
    "title": "Event NextJs",
    "start": "2024-08-11T14:00:00",
    "end": "2024-08-11T15:00:00",
    "desc": "desc",
    "url": "https://meet.google.com/hwn-gsgz-oqx",
    "type": "event",
    "classNames": ["webinar-event"]
  },
  {
    "id": "3",
    "title": "Daily Meeting",
    "start": "2024-08-11T14:00:00",
    "end": "2024-08-11T15:00:00",
    "desc": "desc",
    "url": "https://meet.google.com/hwn-gsgz-oqx",
    "rrule": {
      "freq": "weekly",
      "interval": 1,
      "byweekday": ["mo"],
      "dtstart": "2024-08-09T09:00:00",
      "until": "2024-12-31"
    },
    "type": "appointment",
    "classNames": ["appointment-event"]
  },
  {
    "id": "4",
    "title": "Event ReactJs",
    "start": "2024-08-15T13:00:00",
    "end": "2024-08-15T14:00:00",
    "desc": "desc",
    "url": "https://meet.google.com/hwn-gsgz-oqx",
    "rrule": {
      "freq": "weekly",
      "interval": 1,
      "byweekday": ["fr"],
      "dtstart": "2024-08-09T09:00:00",
      "until": "2024-12-31"
    },
    "type": "event",
    "classNames": ["webinar-event"]
  }
]
```

- id: Unique identifier for each event.
- title: Title the event.
- start: Start date and time.
- end: End date and time.
- desc: Description of the event.
- url: URL goolge meet.
- type: Type of event (e.g., "appointment" or "event").
- classNames: CSS class names for styling
- rrule: Recurrence rule.
- freq: Frequency of recurrence.
- interval: Interval between occurrences.
- byweekday: Days of the week on which the event occurs.
- dtstart: Start date and time for the recurrence.
- until: End date for the recurrence.

# 2:

URL: https://google-calendar-interview.vercel.app/

# 3:

URL github: https://github.com/nguyenvantanphatit/google-calendar

# 4:

- Integrate and customize FullCalendar.

# 5:

- Improve the user interface and experience for better event interaction.
- Enhance recurring events with more options and comprehensive scenarios.
- Implement event filtering, reminders, notifications via Gmail, and invite link sharing.
