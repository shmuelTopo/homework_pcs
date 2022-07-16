export const SERVER_PORT = 8000;

export function dateFormater(datetime) {
  // if date time is today return time
  const now = new Date();
  const date = new Date(datetime);
  const diff = now - date;
  const diffDays = Math.floor(diff / 86400000);
  
  const daysOfTheWekk = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (diffDays === 0 && date.getDay() === now.getDay()) {
    return date.toLocaleString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  } else if(diffDays < 7 && date.getDay() !== now.getDay()) {
    return daysOfTheWekk[date.getDay()];
  } else {
    return date.getDate();
  }

}