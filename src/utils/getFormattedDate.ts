// Helper function to format date
export function getFormattedDate(dateAndTime: string) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const localDate = new Date(dateAndTime);

    if (localDate.toString() === 'Invalid Date') {
        return 'Invalid Date';
    }

    const dayOfWeek = days[localDate.getDay()];
    const month = months[localDate.getMonth()];
    const day = localDate.getDate();
    const hours = localDate.getHours().toString().padStart(2, '0');
    const minutes = localDate.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${dayOfWeek}, ${month} ${day}, ${hours}:${minutes}`;

    return formattedDate;
}
