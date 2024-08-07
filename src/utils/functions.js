export const convertDateFormat = (inputDate) => {
  if (inputDate) {
    const [day, month, year] = inputDate.split('/');
    return `${year}-${month}-${day}`;
  }
  return inputDate;
};

export const fetchUserDevice = () => {
  var userAgent = navigator.userAgent;
  var operatingSystem = 'Unknown';

  if (/Windows/.test(userAgent)) {
    operatingSystem = 'Windows';
  } else if (/Macintosh/.test(userAgent)) {
    operatingSystem = 'Macintosh';
  } else if (/Android/.test(userAgent)) {
    operatingSystem = 'Android';
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    operatingSystem = 'iOS';
  } else if (/Linux/.test(userAgent)) {
    operatingSystem = 'Linux';
  } else {
    operatingSystem = 'Unknown Device';
  }

  return operatingSystem;
};
