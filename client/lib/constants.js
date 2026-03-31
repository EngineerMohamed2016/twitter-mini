const days = Array.from({ length: 31 }, (_, i) => i + 1);

const months = [
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
    "December"
];

const monthsMappingObject = {};
months.forEach((month, i) => monthsMappingObject[month] = i + 1);

const years = Array.from({ length: 2026 - 1979 }, (_, i) => 1980 + i);

const dateFields = { days, months, years };

export { monthsMappingObject, dateFields }

