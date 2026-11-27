import { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import type { TrainingWithCustomer } from '../types';
import { getTrainings } from '../personaltrainerapi';

dayjs.locale('en-gb');
const localizer = dayjsLocalizer(dayjs);

type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
}

function TrainingCalendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [view, setView] = useState<View>(Views.MONTH);
    const [date, setDate] = useState(new Date());

    const toCalendarEvent = (training: TrainingWithCustomer): CalendarEvent => {
        const start = dayjs(training.date);
        const customerName = training.customer
            ? `${training.customer.firstname} ${training.customer.lastname}`
            : '';

        return {
            title: `${training.activity} / ${customerName}`,
            start: start.toDate(),
            end: start.add(training.duration, 'minute').toDate(),
        };
    }

    useEffect(() => {
        getTrainings()
            .then((data: TrainingWithCustomer[]) => setEvents(data.map(toCalendarEvent)))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ height: 700, marginTop: 10 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                view={view}
                onView={newView => setView(newView)}
                date={date}
                onNavigate={newDate => setDate(newDate)}
            />
        </div>
    );
}

export default TrainingCalendar;