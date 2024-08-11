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

Mô tả trường:

id: id cho sự kiện.
title: Tên sự kiện.
start: Ngày và giờ bắt đầu.
end: Ngày và giờ kết thúc.
desc: Mô tả sự kiện (tùy chọn).
url: URL goolge meet cho sự kiện.
type: Loại sự kiện (ví dụ: "cuộc hẹn", "sự kiện").
classNames: Mảng tên lớp dùng cho mục đích tạo kiểu (tùy chọn).
rrule: Quy tắc lặp lại cho các sự kiện lặp lại.
freq: Sự kiện lặp lại hàng tuần.
interval: Khoảng thời gian giữa các lần xảy ra sự kiện.
byweekday: Chỉ định những ngày trong tuần mà sự kiện diễn ra.
dtstart: Chỉ định ngày và giờ bắt đầu của sự kiện xảy ra lần đầu tiên.
until: Chỉ định ngày và giờ kết thúc của chiến dịch.

# 2:

URL: https://google-calendar-interview.vercel.app/

# 3:

URL github: https://github.com/nguyenvantanphatit/google-calendar

# 4:

- Tích hợp và tùy chỉnh FullCalendar.
- Xử lý các sự kiện định kỳ bằng rrule của FullCalendar.
- Quản lý trạng thái tương tác với các sự kiện.

# 5:

- Cải thiện giao diện và trải nghiệm người dùng để tương tác tốt hơn với các sự kiện.
- Cải thiện các sự kiện định kỳ thêm nhiều tuỳ chọn hơn và đủ trường hợp hơn.
- Triển khai lọc sự kiện, nhắc nhở, thông báo qua Gmail và chia sẻ liên kết lời mời.
