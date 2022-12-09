import { parseISO, formatDistanceToNow } from 'date-fns';
const TimeAgo = ({ timestamp }) => {
    let timAgo = "";
    if (timestamp) {
        const date = parseISO(timestamp);
        const timeperiod = formatDistanceToNow(date)
        timAgo = `${timeperiod} ago`
    }
    return (
        <span title={timestamp}>
            &nbsp;<i>{timAgo}</i>
        </span>
    )
}

export default TimeAgo