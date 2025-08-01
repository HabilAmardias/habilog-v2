export function TimestampToDate(time: Date | string) {
    const date = new Date(time);
    return date.toLocaleDateString("id-ID")
}