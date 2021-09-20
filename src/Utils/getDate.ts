const getDate = (date: Date) => {
  const UTC = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const UTC9Time = new Date(UTC + KR_TIME_DIFF);

  const YYYY = UTC9Time.getFullYear();
  const MM = UTC9Time.getMonth() + 1;
  const DD = UTC9Time.getDate();

  return `${YYYY}-${MM.toString().padStart(2, '0')}-${DD.toString().padStart(2, '0')}`;
};

export default getDate;
