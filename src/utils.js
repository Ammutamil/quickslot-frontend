export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (time) => {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const groupAppointments = (appointments) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isSameDate = (d1, d2) =>
    new Date(d1).toDateString() === new Date(d2).toDateString();

  const grouped = {
    today: [],
    tomorrow: [],
    upcoming: [],
  };

  appointments.forEach((a) => {
    const apptDate = new Date(a.date);

    if (isSameDate(apptDate, today)) {
      grouped.today.push(a);
    } else if (isSameDate(apptDate, tomorrow)) {
      grouped.tomorrow.push(a);
    } else if (apptDate > tomorrow) {
      grouped.upcoming.push(a);
    }
  });

  grouped.today.sort((a, b) => a.time.localeCompare(b.time));
  grouped.tomorrow.sort((a, b) => a.time.localeCompare(b.time));
  grouped.upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

  return grouped;
};