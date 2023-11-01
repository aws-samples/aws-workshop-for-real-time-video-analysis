import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


export const TimeFilter = (props) => {

    return (
        <div className="filter">
            <label className="filter_date"><b>Start Date: </b></label>
            <DateTimePicker onChange={props.onStartTimeChange} value={props.startTime} />
            <label className="filter_date"><b>End Date: </b></label>
            <DateTimePicker onChange={props.onEndTimeChange} value={props.endTime} />
        </div>
    )
}