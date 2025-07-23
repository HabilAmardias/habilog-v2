export function TimestampToDate(time: Date | string) {
    const date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}