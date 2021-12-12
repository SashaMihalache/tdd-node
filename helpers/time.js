// time.js

const convertToUTC = (str) => {
  const date = new Date(str);

  const timestamp = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );

  return new Date(timestamp);
};

// parse date with timezone offset from office

module.exports = { convertToUTC };
