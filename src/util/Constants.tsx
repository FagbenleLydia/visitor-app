import { format, subDays } from "date-fns";

export const purposeArray = [
  "PERSONAL_MEETING",
  "FORMAL_MEETING",
  "JOB_INTERVIEW",
  "AUDIT_PURPOSE",
  "SERVICE_PROVIDER",
  "VENDOR",
];

export const staff = [
  {
    id: 1,
    EmployeeName: "Olajumoke Adesanya",
  },
  {
    id: 2,
    EmployeeName: "Jitama Ibrahim",
  },
  {
    id: 3,
    EmployeeName: "Saidat Ibrahim",
  },
  {
    id: 4,
    EmployeeName: "Chukwuma Irozuru",
  },
  {
    id: 5,
    EmployeeName: "Fatima Dikko",
  },
  {
    id: 6,
    EmployeeName: "Ndifreke Peter",
  },
  {
    id: 7,
    EmployeeName: "Chinonso Ichoku",
  },
  {
    id: 8,
    EmployeeName: "Adetula Olanrewaju",
  },
  {
    id: 9,
    EmployeeName: "Oriyomi Adepitan",
  },
  {
    id: 10,
    EmployeeName: "Olufemi Osinowo",
  },
  {
    id: 11,
    EmployeeName: "Usman Adio",
  },
  {
    id: 12,
    EmployeeName: "Abdulrahman Olaiya",
  },
  {
    id: 13,
    EmployeeName: "Nathaniel Obaseki",
  },
  {
    id: 14,
    EmployeeName: "Michael Eleyowo",
  },
  {
    id: 15,
    EmployeeName: "Olowosusi Koseemani",
  },
  {
    id: 16,
    EmployeeName: "Ridwan Mustapha",
  },
  {
    id: 17,
    EmployeeName: "Desmond Ajimuda",
  },
  {
    id: 18,
    EmployeeName: "Moyosore Nwoye",
  },
  {
    id: 19,
    EmployeeName: "Oluwasegun Akinnagbe",
  },
  {
    id: 20,
    EmployeeName: "Oladipo Alabede",
  },
  {
    id: 21,
    EmployeeName: "Endurance Erhaboh",
  },
  {
    id: 22,
    EmployeeName: "Ibukun Adedeji",
  },
  {
    id: 23,
    EmployeeName: "Darlington Nwadiugwu",
  },
  {
    id: 24,
    EmployeeName: "Timothy Oyeola",
  },
  {
    id: 25,
    EmployeeName: "Alexandra Obiawolo",
  },
  {
    id: 26,
    EmployeeName: "Isaac Ozioma",
  },
  {
    id: 27,
    EmployeeName: "John Omeiza",
  },
  {
    id: 28,
    EmployeeName: "Hassan Pelumi Ogundipe",
  },
  {
    id: 29,
    EmployeeName: "Busayomi Okunola",
  },
  {
    id: 30,
    EmployeeName: "Celestine Onyejiuwa",
  },
  {
    id: 31,
    EmployeeName: "Paul Okeoghene Igbigbisie",
  },
  {
    id: 32,
    EmployeeName: "Emmanuel Okpunor",
  },
  {
    id: 33,
    EmployeeName: "David Oladapo",
  },
  {
    id: 34,
    EmployeeName: "Ilemobayo Ayejuni",
  },
  {
    id: 35,
    EmployeeName: "Stephen Olakunle",
  },
  {
    id: 36,
    EmployeeName: "Oyekolade Oyediran",
  },
  {
    id: 37,
    EmployeeName: "David Erigbe",
  },
  {
    id: 38,
    EmployeeName: "Lydia Damilola Fagbenle ",
  },
  {
    id: 39,
    EmployeeName: "Chimezuo Raymond Ajaegbu ",
  },
  {
    id: 40,
    EmployeeName: "Hamod Yunus ",
  },
  {
    id: 41,
    EmployeeName: "Victor Akpovero",
  },
  {
    id: 42,
    EmployeeName: "Faithfulness Oyateru",
  },
  {
    id: 43,
    EmployeeName: "Michael Afolabi",
  },
  {
    id: 44,
    EmployeeName: "Seyi Ajadi ",
  },
  {
    id: 45,
    EmployeeName: "Joan Oluwafemi Rotimi",
  },
  {
    id: 46,
    EmployeeName: "Samuel Anugwara",
  },
  {
    id: 47,
    EmployeeName: "Dolapo Adeleye",
  },
  {
    id: 48,
    EmployeeName: "Naomi Windapo",
  },
  {
    id: 49,
    EmployeeName: "Damilola Adeyi",
  },
  {
    id: 50,
    EmployeeName: "Femi Yanga ",
  },
  {
    id: 51,
    EmployeeName: "Habib Muhammad",
  },
];
export const time = ["30 mins", "1 hour", "1hr 30mins", "2 hours", "2+ hour"];
export const dateList = [
  {
    label: "All time",
    value: "",
  },
  {
    label: "Today",
    value: `${format(new Date(), "yyyy-MM-dd")},${format(
      new Date(),
      "yyyy-MM-dd"
    )}`,
  },
  {
    label: "Last 7 days",
    value: `${format(subDays(new Date(), 7), "yyyy-MM-dd")},${format(
      new Date(),
      "yyyy-MM-dd"
    )}`,
  },
  {
    label: "This month",
    value: `${format(new Date(), "yyyy-MM-01")},${format(
      new Date(),
      "yyyy-MM-dd"
    )}`,
  },
  {
    label: "Last 90 days",
    value: `${format(subDays(new Date(), 90), "yyyy-MM-dd")},${format(
      new Date(),
      "yyyy-MM-dd"
    )}`,
  },
  {
    label: "Select date range",
    value: "date-range",
  },
];

export const StatusOut = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Out",
    value: "out",
  },
];
