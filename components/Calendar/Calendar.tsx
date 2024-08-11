"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import dayjs, { Dayjs } from "dayjs";
import Modal from "@/components/Modal/Modal";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { generateTimeOptions, getMonth } from "@/utils/generate";
import { daysOfWeek, eventsData } from "@/utils/eventsData";
import { Event } from "@/lib/event";
dayjs.extend(utc);
dayjs.extend(timezone);

const CalendarPage = () => {
    const timezone = "Asia/Singapore";
    const [calendarView, setCalendarView] = useState<string>("dayGridMonth");
    const [events, setEvents] = useState<Event[]>(eventsData)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [newEvent, setNewEvent] = useState<Event>({
        id: "",
        title: "",
        start: "",
        end: "",
        url: "",
        desc: "",
        type: "",
        classNames: [],
        rrule: undefined,
        duration: "",
    });
    const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
    const calendarRef = useRef<FullCalendar>(null);
    const [copySuccess, setCopySuccess] = useState<string>('');
    const [currentDate, setCurrentDate] = useState(new Date())
    const [daySelected, setDaySelected] = useState<Dayjs | null>(null);
    const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(dayjs().month());
    const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
    const timeOptions = generateTimeOptions();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const handleViewChange = (view: string) => {
        setCalendarView(view);
        const calendarApi = calendarRef.current?.getApi();
        calendarApi?.changeView(view);
    };

    const handleDateClick = (arg: any) => {
        setNewEvent({ ...newEvent, start: arg.dateStr, end: arg.dateStr });
        setModalIsOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleDateChange = (date: Dayjs | string) => {
        const startDateTime = dayjs(date).toISOString();
        const endDateTime = dayjs(date).add(30, "minute").toISOString();
        setNewEvent({ ...newEvent, start: startDateTime, end: endDateTime });
    };

    const handleAddEvent = () => {
        const eventToAdd: Event = {
            id: Date.now().toString(),
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            type: newEvent.type,
            desc: newEvent.desc,
            url: "https://meet.google.com/hwn-gsgz-oqx",
            rrule: isChecked ? {
                freq: 'weekly',
                interval: 1,
                byweekday: selectedDays.map(day => day.toLowerCase().substring(0, 2)),
                dtstart: newEvent.start,
            } : undefined,
            duration: "01:00",
            classNames: newEvent.type === "appointment" ? ['appointment-event'] : ['webinar-event'],
        };
        setEvents([...events, eventToAdd]);
        setModalIsOpen(false);
    };

    const handleEventClick = (info: any) => {
        info.jsEvent.preventDefault();
        const clickedEvent = events.find((event) => event.id === info.event.id);
        if (clickedEvent) {
            setHoveredEvent(clickedEvent);
        }
    };
   
    const nextMonth = () => {
        let updatedCurrentDate = new Date(currentDate);
        updatedCurrentDate.setMonth(updatedCurrentDate.getMonth() + 1);
        setCurrentDate(updatedCurrentDate);
        setCurrentMonthIdx(updatedCurrentDate.getMonth());
    }

    const prevMonth = () => {
        let updatedCurrentDate = new Date(currentDate);
        updatedCurrentDate.setMonth(updatedCurrentDate.getMonth() - 1);
        setCurrentDate(updatedCurrentDate);
        setCurrentMonthIdx(updatedCurrentDate.getMonth());
    }
    
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);

    const getDayClass = (day: Dayjs) => {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected?.format(format);
        if (nowDay === currDay) {
            return "bg-[#0F4C81]";
        } else if (currDay === slcDay) {
            return "bg-[#5684AE]";
        } else {
            return "";
        }
    };

    const handleTimeChange = (field: any, value: any) => {
        const newTime = dayjs(`${dayjs(newEvent.start).format("YYYY-MM-DD")}T${value}`).toISOString();
        setNewEvent((prevEvent) => ({
            ...prevEvent,
            [field]: newTime,
        }));
    };

    const upcomingEvents = events.filter((event) => {
        if (daySelected) {
            return dayjs(event.start).isSame(daySelected, "day");
        }
        return dayjs(event.start).isAfter(dayjs());
    });


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleDaySelection = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };
    
    const handleCopy = () => {
        if (hoveredEvent && hoveredEvent.url) {
            navigator.clipboard.writeText(hoveredEvent.url)
                .then(() => setCopySuccess('Copied!'))
                .catch(() => setCopySuccess('Failed to copy!'));
        } else {
            setCopySuccess('No URL to copy!');
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:p-10 gap-4">
                <div className="w-full md:w-1/4 bg-white">
                    <div className='p-4'>
                        <header className="flex justify-center items-center">
                            <div className='flex items-center justify-between gap-3'>
                                <li className="date list-none text-2xl"
                                    onClick={() => nextMonth()}>
                                    <div className="date-cell">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.0001 17.9996L8.99988 11.9994L15.0037 5.99561" stroke="#5684AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="my-path"></path>
                                        </svg>
                                    </div>
                                </li>
                                <p className="text-[#5684AE] text-xl font-bold">
                                    {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
                                        "MMMM YYYY"
                                    )}
                                </p>
                                <li className="date list-none text-2xl"
                                    onClick={() => prevMonth()}>
                                    <div className="date-cell">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.00378 5.99561L15.004 11.9959L9.00024 17.9996" stroke="#5684AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="my-path"></path>
                                        </svg>
                                    </div>
                                </li>
                            </div>
                        </header>
                        <div className="grid grid-cols-7 grid-rows-7">
                            {currentMonth[0].map((day, i) => (
                                <span key={i} className="text-sm py-1 text-center">
                                    {day.format("dd").charAt(0)}
                                </span>
                            ))}
                            {currentMonth.map((row, i) => (
                                <>
                                    {row.map((day, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setDaySelected(day);
                                            }}
                                        >
                                            <span className={`rounded-full px-2 py-0.5 ${getDayClass(day)}`}>{day.format("D")}</span>
                                        </button>
                                    ))}
                                </>
                            ))}
                        </div>
                    </div>
                    <div className='border border-b-2 my-8 w-full'></div>
                    <div className='p-4'>
                        <div className='flex items-center justify-between'>
                            <h2 className="font-manrope text-3xl leading-tight text-[#0F4C81] font-bold mb-1.5">Upcoming Events</h2>
                            <button type='button' className='py-2.5 px-3 text-sm bg-[#0F4C81] text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500'>View All</button>
                        </div>
                        <p className="text-lg font-normal text-gray-500 mb-8">{`Today, ${dayjs().format('D MMM')}`}</p>
                        <div className="flex gap-5 flex-col">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map(event => (
                                    <div
                                        key={event.id}
                                        className={`relative rounded-xl ${event.type === 'event' ? 'bg-[#F9BE81]' : 'bg-[#FFE4C8]'} p-4 before:absolute before:bg-[#0F4C81] before:w-2 before:h-full before:left-0 before:top-0 before:rounded-s-xl`}
                                    >
                                        <div>
                                            <div className='flex items-center justify-between'>
                                                <div>
                                                    <p className="text-xl font-medium text-[#0F4C81]"> {event.title} </p>
                                                    <p className="text-base font-medium text-[#5684AE]">{dayjs(event.start).tz(timezone).format('h:mm A')} - {dayjs(event.end).tz(timezone).format('h:mm A')} GMT+8</p>
                                                </div>
                                                <div className='bg-white p-4 rounded-full hover:bg-[#0F4C81] hover:text-[#0F4C81]'>
                                                    <a href={event.url} className="" target="_blank" rel="noopener noreferrer">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2 10C2 7.17157 2 5.75736 2.87868 4.87868C3.75736 4 5.17157 4 8 4H11C13.8284 4 15.2426 4 16.1213 4.87868C17 5.75736 17 7.17157 17 10V14C17 16.8284 17 18.2426 16.1213 19.1213C15.2426 20 13.8284 20 11 20H8C5.17157 20 3.75736 20 2.87868 19.1213C2 18.2426 2 16.8284 2 14V10Z" stroke="black" stroke-width="null" className="my-path"></path>
                                                            <path d="M18.8531 8.20273L17 9.49989V15.4999L18.8531 16.797C20.2334 17.7633 20.9236 18.2464 21.4618 17.9662C22 17.686 22 16.8435 22 15.1586V9.8412C22 8.15625 22 7.31377 21.4618 7.03356C20.9236 6.75335 20.2334 7.23648 18.8531 8.20273Z" stroke="black" stroke-width="null" stroke-linecap="round" className="my-path"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        {event.type === 'event' && (
                                            <div className="flex items-center mt-2 space-x-2">
                                                <img
                                                    src="https://pagedone.io/asset/uploads/1714988283.png"
                                                    alt="Client Avatar"
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <a href={`/client-profile/${event.id}`} className="text-blue-500 underline">
                                                    View Client Profile
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="116" height="121" viewBox="0 0 116 121" fill="none">
                                    <path d="M0.206909 63.57C0.206909 31.7659 25.987 6.12817 57.6487 6.12817C89.2631 6.12817 115.079 31.7541 115.079 63.57C115.079 77.0648 110.43 89.4805 102.627 99.2755C91.8719 112.853 75.4363 121 57.6487 121C39.7426 121 23.4018 112.794 12.6582 99.2755C4.85538 89.4805 0.206909 77.0648 0.206909 63.57Z" fill="#EEF2FF" />
                                    <path d="M72.7942 0.600875L72.7942 0.600762L72.7836 0.599331C72.3256 0.537722 71.8622 0.5 71.3948 0.5H22.1643C17.1256 0.5 13.0403 4.56385 13.0403 9.58544V107.286C13.0403 112.308 17.1256 116.372 22.1643 116.372H93.1214C98.1725 116.372 102.245 112.308 102.245 107.286V29.4482C102.245 28.7591 102.17 28.0815 102.019 27.4162L102.019 27.416C101.615 25.6459 100.67 24.0014 99.2941 22.7574C99.2939 22.7572 99.2937 22.757 99.2934 22.7568L77.5462 2.89705C77.5461 2.89692 77.5459 2.89679 77.5458 2.89665C76.2103 1.66765 74.5591 0.876968 72.7942 0.600875Z" fill="white" stroke="#E5E7EB" />
                                    <circle cx="60.2069" cy="61" r="21.0256" fill="#EEF2FF" />
                                    <path d="M74.6786 46.1412L74.6783 46.1409C66.5737 38.0485 53.4531 38.0481 45.36 46.1412C37.2552 54.2341 37.2551 67.3666 45.3597 75.4596C53.4529 83.5649 66.5739 83.5645 74.6786 75.4599C82.7716 67.3669 82.7716 54.2342 74.6786 46.1412ZM79.4694 41.3508C90.2101 52.0918 90.2101 69.5093 79.4694 80.2502C68.7166 90.9914 51.3104 90.9915 40.5576 80.2504C29.8166 69.5095 29.8166 52.0916 40.5576 41.3506C51.3104 30.6096 68.7166 30.6097 79.4694 41.3508Z" stroke="#E5E7EB" />
                                    <path d="M83.2471 89.5237L76.8609 83.1309C78.9391 81.5058 80.8156 79.6106 82.345 77.6546L88.7306 84.0468L83.2471 89.5237Z" stroke="#E5E7EB" />
                                    <path d="M104.591 94.4971L104.59 94.4969L92.7346 82.653C92.7342 82.6525 92.7337 82.652 92.7332 82.6515C91.6965 81.6018 90.0076 81.6058 88.9629 82.6505L89.3089 82.9965L88.9629 82.6505L81.8573 89.7561C80.8213 90.7921 80.8248 92.4783 81.8549 93.5229L81.8573 93.5253L93.7157 105.384C96.713 108.381 101.593 108.381 104.591 105.384C107.6 102.375 107.6 97.5062 104.591 94.4971Z" fill="#A5B4FC" stroke="#818CF8" />
                                    <path d="M62.5493 65.6714C62.0645 65.6714 61.6626 65.2694 61.6626 64.7729C61.6626 62.7866 58.6595 62.7866 58.6595 64.7729C58.6595 65.2694 58.2576 65.6714 57.761 65.6714C57.2762 65.6714 56.8743 65.2694 56.8743 64.7729C56.8743 60.422 63.4478 60.4338 63.4478 64.7729C63.4478 65.2694 63.0458 65.6714 62.5493 65.6714Z" fill="#4F46E5" />
                                    <path d="M70.1752 58.0694H66.4628C65.9662 58.0694 65.5642 57.6675 65.5642 57.1709C65.5642 56.6862 65.9662 56.2842 66.4628 56.2842H70.1752C70.6717 56.2842 71.0737 56.6862 71.0737 57.1709C71.0737 57.6675 70.6717 58.0694 70.1752 58.0694Z" fill="#4F46E5" />
                                    <path d="M53.8596 58.0693H50.1472C49.6506 58.0693 49.2487 57.6673 49.2487 57.1708C49.2487 56.686 49.6506 56.2841 50.1472 56.2841H53.8596C54.3443 56.2841 54.7463 56.686 54.7463 57.1708C54.7463 57.6673 54.3443 58.0693 53.8596 58.0693Z" fill="#4F46E5" />
                                    <rect x="28.9248" y="16.3846" width="30.7692" height="2.05128" rx="1.02564" fill="#4F46E5" />
                                    <rect x="28.9248" y="100.487" width="41.0256" height="4.10256" rx="2.05128" fill="#A5B4FC" />
                                    <rect x="28.9248" y="22.5385" width="10.2564" height="2.05128" rx="1.02564" fill="#4F46E5" />
                                    <circle cx="42.2582" cy="23.5641" r="1.02564" fill="#4F46E5" />
                                    <circle cx="46.3607" cy="23.5641" r="1.02564" fill="#4F46E5" />
                                    <circle cx="50.4633" cy="23.5641" r="1.02564" fill="#4F46E5" />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-3/4">
                    <div className="absolute md:right-5 md:top-[5.5rem] mt-2 right-0 md:px-10 px-4">
                        <select
                            className="py-2 px-2.5 rounded-lg bg-[#5684AE] text-white text-sm font-medium"
                            value={calendarView}
                            onChange={(e) => handleViewChange(e.target.value)}
                        >
                            <option value="dayGridDay" className="bg-[#5684AE] text-white">
                                Day
                            </option>
                            <option value="timeGridWeek" className="bg-[#5684AE] text-white">
                                Week
                            </option>
                            <option value="dayGridMonth" className="bg-[#5684AE] text-white">
                                Month
                            </option>
                        </select>
                    </div>
                    <div className='bg-white py-10'>
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
                            initialView={calendarView}
                            events={events}
                            eventClick={handleEventClick}
                            dateClick={handleDateClick}
                            height="auto"
                            eventContent={(events) => {
                                return (
                                    <div className="ml-4">
                                        {events.event.title}
                                    </div>
                                );
                            }}
                        />
                    </div>
                    {hoveredEvent && (
                        <Modal
                            showCloseButton
                            visibleModal={Boolean(hoveredEvent)}
                            wrapperClassName="!w-[340px] md:!w-[700px]"
                            contentClassName="!min-h-[0]"
                            onClose={() => setHoveredEvent(null)}
                        >
                            <div>
                                <div className="flex items-center justify-center gap-4">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#5684AE" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 20.0024V15.0024M8 20.0024C8 20.5547 8.44772 21.0024 9 21.0024H15C15.5523 21.0024 16 20.5547 16 20.0024M8 20.0024H3C2.44772 20.0024 2 19.5547 2 19.0024V15.0024C2 13.3456 3.34315 12.0024 5 12.0024C6.65685 12.0024 8 13.3456 8 15.0024M16 20.0024V15.0024M16 20.0024H21C21.5523 20.0024 22 19.5547 22 19.0024V15.0024C22 13.3456 20.6569 12.0024 19 12.0024C17.3431 12.0024 16 13.3456 16 15.0024M16 15.0024C16 13.3456 14.6569 12.0024 13 12.0024H11C9.34315 12.0024 8 13.3456 8 15.0024M15 6.00244C15 7.6593 13.6569 9.00244 12 9.00244C10.3431 9.00244 9 7.6593 9 6.00244C9 4.34559 10.3431 3.00244 12 3.00244C13.6569 3.00244 15 4.34559 15 6.00244ZM6.5 7.50244C6.5 8.33087 5.82843 9.00244 5 9.00244C4.17157 9.00244 3.5 8.33087 3.5 7.50244C3.5 6.67401 4.17157 6.00244 5 6.00244C5.82843 6.00244 6.5 6.67401 6.5 7.50244ZM20.5 7.50244C20.5 8.33087 19.8284 9.00244 19 9.00244C18.1716 9.00244 17.5 8.33087 17.5 7.50244C17.5 6.67401 18.1716 6.00244 19 6.00244C19.8284 6.00244 20.5 6.67401 20.5 7.50244Z" stroke="black" stroke-width="null" className="my-path"></path>
                                    </svg>
                                    <span className="text-[#5684AE] font-bold text-2xl">Information {hoveredEvent.type}</span>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl bg-white">
                                <span className="text-[#5684AE] font-bold text-2xl">{hoveredEvent.title}</span>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <p className="text-base font-medium text-gray-900">
                                            {dayjs(hoveredEvent.start).tz(timezone).format('h:mm A')} - {dayjs(hoveredEvent.end).tz(timezone).format('h:mm A')} GMT+8
                                        </p>
                                    </div>
                                </div>
                                <p className="text-base font-normal text-gray-600 mb-4">{hoveredEvent.desc}</p>
                                <div className="flex items-center justify-start gap-2 flex-col md:flex-row">
                                    <a href={hoveredEvent.url} target="_blank" rel="noopener noreferrer">
                                        <p className="flex gap-2">{hoveredEvent.url}
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 10C2 7.17157 2 5.75736 2.87868 4.87868C3.75736 4 5.17157 4 8 4H11C13.8284 4 15.2426 4 16.1213 4.87868C17 5.75736 17 7.17157 17 10V14C17 16.8284 17 18.2426 16.1213 19.1213C15.2426 20 13.8284 20 11 20H8C5.17157 20 3.75736 20 2.87868 19.1213C2 18.2426 2 16.8284 2 14V10Z" stroke="black" stroke-width="null" className="my-path"></path>
                                                <path d="M18.8531 8.20273L17 9.49989V15.4999L18.8531 16.797C20.2334 17.7633 20.9236 18.2464 21.4618 17.9662C22 17.686 22 16.8435 22 15.1586V9.8412C22 8.15625 22 7.31377 21.4618 7.03356C20.9236 6.75335 20.2334 7.23648 18.8531 8.20273Z" stroke="black" stroke-width="null" stroke-linecap="round" className="my-path"></path>
                                            </svg></p>
                                    </a>
                                    <button onClick={handleCopy} className="py-2 pr-3 pl-1.5 rounded-md flex items-center gap-1.5 text-xs font-medium text-[#5684AE] bg-indigo-50 transition-all duration-300 hover:bg-indigo-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M6 10C4.11438 10 3.17157 10 2.58579 9.41421C2 8.82843 2 7.88562 2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6M6 10C7.88562 10 8.82843 10 9.41421 9.41421C10 8.82843 10 7.88562 10 6M6 10C6 11.8856 6 12.8284 6.58579 13.4142C7.17157 14 8.11438 14 10 14C11.8856 14 12.8284 14 13.4142 13.4142C14 12.8284 14 11.8856 14 10C14 8.11438 14 7.17157 13.4142 6.58579C12.8284 6 11.8856 6 10 6" stroke="#5684AE" stroke-width="1.6" />
                                        </svg>
                                        Copy
                                        {copySuccess && <p className="text-green-500">{copySuccess}</p>}
                                    </button>
                                </div>
                                <div className="flex items-center justify-end pt-5 gap-4">
                                    <button type="button"
                                        onClick={() => setHoveredEvent(null)}
                                        className="w-1/2 text-center p-1.5 py-2 border border-gray-200 rounded-md text-xs font-medium close-modal-button transition-all duration-300 hover:bg-gray-100 hover:border-gray-100"
                                        data-pd-overlay="#modalBox-2" data-modal-target="modalBox-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    )}
                    <Modal
                        showCloseButton
                        visibleModal={modalIsOpen}
                        wrapperClassName="!w-[340px] md:!w-[1000px]"
                        contentClassName="!min-h-[0]"
                        onClose={() => setModalIsOpen(false)}
                    >
                        <div>
                            <div className="flex items-center justify-center gap-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#5684AE" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 20.0024V15.0024M8 20.0024C8 20.5547 8.44772 21.0024 9 21.0024H15C15.5523 21.0024 16 20.5547 16 20.0024M8 20.0024H3C2.44772 20.0024 2 19.5547 2 19.0024V15.0024C2 13.3456 3.34315 12.0024 5 12.0024C6.65685 12.0024 8 13.3456 8 15.0024M16 20.0024V15.0024M16 20.0024H21C21.5523 20.0024 22 19.5547 22 19.0024V15.0024C22 13.3456 20.6569 12.0024 19 12.0024C17.3431 12.0024 16 13.3456 16 15.0024M16 15.0024C16 13.3456 14.6569 12.0024 13 12.0024H11C9.34315 12.0024 8 13.3456 8 15.0024M15 6.00244C15 7.6593 13.6569 9.00244 12 9.00244C10.3431 9.00244 9 7.6593 9 6.00244C9 4.34559 10.3431 3.00244 12 3.00244C13.6569 3.00244 15 4.34559 15 6.00244ZM6.5 7.50244C6.5 8.33087 5.82843 9.00244 5 9.00244C4.17157 9.00244 3.5 8.33087 3.5 7.50244C3.5 6.67401 4.17157 6.00244 5 6.00244C5.82843 6.00244 6.5 6.67401 6.5 7.50244ZM20.5 7.50244C20.5 8.33087 19.8284 9.00244 19 9.00244C18.1716 9.00244 17.5 8.33087 17.5 7.50244C17.5 6.67401 18.1716 6.00244 19 6.00244C19.8284 6.00244 20.5 6.67401 20.5 7.50244Z" stroke="black" stroke-width="null" className="my-path"></path>
                                </svg>
                                <span className="text-[#5684AE] font-bold text-2xl">Event Modal</span>
                            </div>
                        </div>
                        <form>
                            <div className="grid">
                                <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
                                    <div className="w-full flex-col justify-start items-start gap-2 flex">
                                        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                            <label htmlFor="title" className="flex gap-1 items-center text-base font-medium leading-relaxed">
                                                Name Event
                                            </label>
                                            <input
                                                id="title"
                                                name="title"
                                                value={newEvent.title}
                                                onChange={handleInputChange}
                                                type="text"
                                                className="w-full focus:outline-none text-lg font-normal leading-relaxed px-5 py-1 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                placeholder="Name Event"
                                            />
                                        </div>
                                        <div className="w-full justify-start items-start gap-7 flex sm:flex-row flex-col">
                                            <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                                <label htmlFor="date" className="flex gap-1 items-center text-base font-medium leading-relaxed">
                                                    Date
                                                </label>
                                                <input
                                                    id="date"
                                                    type="date"
                                                    value={dayjs(newEvent.start).format("YYYY-MM-DD")}
                                                    onChange={(e) => handleDateChange(e.target.value)}
                                                    className="w-full focus:outline-none text-lg font-normal leading-relaxed px-5 py-1 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                />
                                            </div>
                                            <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                                <label htmlFor="start-time" className="flex gap-1 items-center text-base font-medium leading-relaxed">
                                                    Time Start
                                                </label>
                                                <select
                                                    id="start-time"
                                                    name="start"
                                                    value={dayjs(newEvent.start).format("HH:mm")}
                                                    onChange={(e) => handleTimeChange("start", e.target.value)}
                                                    className="w-full focus:outline-none text-lg font-normal leading-relaxed px-5 py-2 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                >
                                                    {timeOptions.map((time) => (
                                                        <option key={time} value={time}>
                                                            {time}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                                <label htmlFor="end-time" className="flex gap-1 items-center text-base font-medium leading-relaxed">
                                                    Time End
                                                </label>
                                                <select
                                                    id="end-time"
                                                    name="end"
                                                    value={dayjs(newEvent.end).format("HH:mm")}
                                                    onChange={(e) => handleTimeChange("end", e.target.value)}
                                                    className="w-full focus:outline-none text-lg font-normal leading-relaxed px-5 py-2 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                >
                                                    {timeOptions.map((time) => (
                                                        <option key={time} value={time}>
                                                            {time}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                            <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                                <label htmlFor="recurring" className="flex gap-1 items-center text-base font-medium leading-relaxed">
                                                    Recurring Event
                                                </label>
                                                <div className="flex">
                                                    <input
                                                        id="recurring"
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                        className="w-5 h-5 border cursor-pointer rounded-md mr-2"
                                                    />
                                                    <label htmlFor="recurring" className="text-sm cursor-pointer">
                                                        Yes
                                                    </label>
                                                </div>
                                            </div>
                                            {isChecked && (
                                                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                                                    {daysOfWeek.map((day, index) => (
                                                        <div key={index} className="flex items-center">
                                                            <input
                                                                id={`day-${day}`}
                                                                type="checkbox"
                                                                checked={selectedDays.includes(day)}
                                                                onChange={() => handleDaySelection(day)}
                                                                className="w-5 h-5 border cursor-pointer rounded-md mr-2"
                                                            />
                                                            <label htmlFor={`day-${day}`} className="text-sm font-normal cursor-pointer">
                                                                {day}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-full justify-start items-start gap-7 flex sm:flex-row flex-col">
                                            <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                                <label htmlFor="google-meet" className="flex gap-1 items-center text-base font-medium leading-relaxed">
                                                    Link Google Meet
                                                </label>
                                                <input
                                                    id="google-meet"
                                                    type="text"
                                                    value="https://meet.google.com/hwn-gsgz-oqx"
                                                    disabled
                                                    className="w-full focus:outline-none text-lg font-normal leading-relaxed px-5 py-1 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                    placeholder="Google Meet Link"
                                                />
                                            </div>
                                            <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                                <label htmlFor="event-type" className="flex gap-1 items-center text-base font-medium leading-relaxed">
                                                    Type Event
                                                </label>
                                                <select
                                                    id="event-type"
                                                    name="type"
                                                    value={newEvent.type}
                                                    onChange={handleInputChange}
                                                    className="w-full focus:outline-none text-lg font-normal leading-relaxed px-5 py-2 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                >
                                                    <option value="event">Event</option>
                                                    <option value="appointment">Appointment</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-full justify-start items-start gap-7 flex sm:flex-row flex-col">
                                            <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                                <label htmlFor="desc" className="flex gap-1 items-center text-base font-medium leading-relaxed">
                                                    Description
                                                </label>
                                                <input
                                                    id="desc"
                                                    name="desc"
                                                    value={newEvent.desc}
                                                    onChange={handleInputChange}
                                                    type="text"
                                                    className="w-full focus:outline-none text-lg font-normal leading-relaxed px-5 py-1 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                    placeholder="Description"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center pt-5 gap-4 w-full">
                                            <button
                                                type="button"
                                                onClick={() => setModalIsOpen(false)}
                                                className="w-full text-center p-1.5 py-2 border border-gray-200 rounded-md text-xs font-medium close-modal-button transition-all duration-300 hover:bg-gray-100 hover:border-gray-100"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleAddEvent}
                                                className="w-full text-center p-1.5 py-2 rounded-md bg-[#5684AE] text-white text-xs font-medium close-modal-button transition-all duration-300 hover:bg-[#9CB3C5] hover:border-[#9CB3C5]"
                                            >
                                                Save Event
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </Modal>
                </div>
            </div>
        </>
    );
}

export default CalendarPage;
