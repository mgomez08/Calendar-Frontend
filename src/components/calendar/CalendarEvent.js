import React from 'react'

export const CalendarEvent = ({ event }) => {
    const { title, user} = event;
    return (
        <div>
            <span>{ title }</span>
            <br />
            <strong>-{ user.name }</strong>
        </div>
    )
}
