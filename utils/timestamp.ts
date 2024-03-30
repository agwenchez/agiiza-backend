function parseDate(val: number): string {
    return (val < 10) ? "0" + val : val.toString();
}

export const getTimestamp = (): string => {
    const dateString: string = new Date().toLocaleString("en-us", { timeZone: "Africa/Nairobi" });
    const dateObject: Date = new Date(dateString);
    const month: string = parseDate(dateObject.getMonth() + 1);
    const day: string = parseDate(dateObject.getDate());
    const hour: string = parseDate(dateObject.getHours());
    const minute: string = parseDate(dateObject.getMinutes());
    const second: string = parseDate(dateObject.getSeconds());

    return `${dateObject.getFullYear()}${month}${day}${hour}${minute}${second}`;
}
