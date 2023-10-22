export function extractTimeFromDate(date: Date): string {
  if (!(date instanceof Date)) {
    return "";
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const timeString = `${hours}:${minutes}`;

  return timeString;
}

export function formatDateAndTime(inputDate: Date) {
  if (!(inputDate instanceof Date)) {
    return null;
  }

  const day = inputDate.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[inputDate.getMonth()];
  const hours = inputDate.getHours().toString().padStart(2, "0");
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");

  return `${day} ${month}, ${hours}:${minutes}`;
}

export function formatMoney(number: number): string {
  if (typeof number !== "number") {
    return "";
  }

  const numberString = number.toString();

  if (numberString.length < 2) {
    return `0.0${numberString}`;
  } else {
    const lastTwoDigits = numberString.slice(-2);

    const formattedNumber = `${numberString.slice(0, -2)}.${lastTwoDigits}`;
    return formattedNumber;
  }
}
