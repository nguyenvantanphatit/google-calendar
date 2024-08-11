import CalendarPage from '@/components/Calendar/Calendar'
import React from 'react'
export const metadata: Metadata = {
  title: "Google Calendar",
  description: "Google Calendar Interview",
  openGraph: {
    title: "Google Calendar",
    description: "Google Calendar Interview",
    url: "https://google-calendar-interview.vercel.app",
    siteName: 'Google Calendar', 
    type: "website",
    locale: 'en_SG', 
    images: [
      {
        url: 'https://res.cloudinary.com/dq49gyq1g/image/upload/v1720057490/aqfvydnqjwbzhoniyio9.png',
        width: 850,
        height: 650,
        alt: 'Google Calendar Interview'
      }
    ]
  },
};

export default function App() {

  return (
    <CalendarPage />
  )
}
