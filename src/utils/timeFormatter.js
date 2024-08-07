export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM' || modifier === 'pm') {
    hours = parseInt(hours, 10) + 12;
  }
  if (hours.length === 1) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
};

export const convertDateToTime = (date) => {
  const time = date.slice(11);
  return convertTime12to24(time);
};

export const convertTime24to12 = (time) => {
  const [hours, minutes] = time.split(':');
  const timeObj = new Date();
  timeObj.setHours(hours);
  timeObj.setMinutes(minutes);
  const ampm = timeObj.getHours() >= 12 ? 'pm' : 'am';
  let hours12 = timeObj.getHours() % 12;
  hours12 = hours12 ? hours12 : 12; // convert 0 to 12
  return `${hours12}:${minutes} ${ampm}`;
};

export const formatHours = (hours) => {
  // Split the hours into integer and fractional parts
  var integerPart = Math.floor(hours);
  var fractionalPart = hours - integerPart;

  var result = integerPart + ' hours';

  // Check if there are any minutes to include
  if (fractionalPart > 0) {
    var minutes = Math.round(fractionalPart * 60); // Round minutes to the nearest whole number
    result += ' and ' + minutes + ' mins';
  }

  return result;
};

export const calculateHoursBetween24HourFormatTimes = (startTime, endTime) => {
  // Parse start time
  var startSplit = startTime.split(':');
  var startHours = parseInt(startSplit[0]);
  var startMinutes = parseInt(startSplit[1]);

  // Parse end time
  var endSplit = endTime.split(':');
  var endHours = parseInt(endSplit[0]);
  var endMinutes = parseInt(endSplit[1]);

  // Calculate total minutes for start and end time
  var totalStartMinutes = startHours * 60 + startMinutes;
  var totalEndMinutes = endHours * 60 + endMinutes;

  // Calculate the time difference in minutes
  var differenceMinutes = totalEndMinutes - totalStartMinutes;

  // Convert minutes to hours and minutes
  var differenceHours = Math.floor(differenceMinutes / 60);
  var remainingMinutes = differenceMinutes % 60;

  return `${differenceHours} hours and ${remainingMinutes} minutes`;
};
