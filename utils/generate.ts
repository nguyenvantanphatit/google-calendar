import dayjs, { Dayjs } from "dayjs";

export const generateTimeOptions = () => {
    const options = [];
    let startTime = dayjs().startOf("day");

    for (let i = 0; i < 48; i++) {
        options.push(startTime.format("HH:mm"));
        startTime = startTime.add(30, "minute");
    }

    return options;
};

export const getMonth = (month: number = dayjs().month()): Dayjs[][] => {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });
    return daysMatrix;
};
