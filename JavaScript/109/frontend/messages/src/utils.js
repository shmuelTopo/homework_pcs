export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function getLastseenMessage(datetime) {

  if(String(datetime).toLowerCase() === 'online') {
    return 'Online'
  }
  
  const now = new Date();
  const date = new Date(datetime);
  const diff = now - date;

  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diff / 60000);
  const diffHours = Math.floor(diff / 3600000);
  const diffDays = Math.floor(diff / 86400000);
  const diffWeeks = Math.floor(diff / 604800000);
  const diffMonths = Math.floor(diff / 2628000000);
  const diffYears = Math.floor(diff / 31536000000);

  //if date is future return the string "Online"
  if (diffSeconds < 0) {
    return "Online";
  }


  if (diffSeconds < 60) {
    return 'Last Seen just now';
  } 
  else if (diffMinutes < 60) {
    return `Last Seen ${diffMinutes} minute${diffMinutes === 1 ? '': 's'} ago`;
  } 
  else if (diffHours < 24) {
    return `Last Seen ${diffHours} hour${diffHours === 1 ? '': 's'} ago`;
  }
  else if (diffDays < 7) {
    return `Last Seen ${diffDays} day${diffDays === 1 ? '': 's'} ago`;
  }
  else if (diffWeeks < 4) {
    return `Last Seen ${diffWeeks} week${diffWeeks === 1 ? '': 's'} ago`;
  }
  else if (diffMonths < 12) {
    return `Last Seen ${diffMonths} month${diffMonths === 1 ? '': 's'} ago`;
  }
  else {
    return `Last Seen ${diffYears} year${diffYears === 1 ? '': 's'} ago`;
  }
}

export function getMessageTimeDayOrDate(datetime) {
  // if date time is today return time
  const now = new Date();
  const date = new Date(datetime);
  const diff = now - date;
  const diffDays = Math.floor(diff / 86400000);
  
  const daysOfTheWekk = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (diffDays === 0 && date.getDay() === now.getDay()) {
    return date.toLocaleString([], { 
      hour: '2-digit', 
      minute: '2-digit',
    })
  } else if(diffDays < 7 && date.getDay() !== now.getDay()) {
    return daysOfTheWekk[date.getDay()];
  } else {
    return date.getDate();
  }

}
function getDatetime(secondsAgo, minutesAgo, hoursAgo, daysAgo, weeksAgo, monthsAgo, yearsAgo) {
  const now = new Date();
  const date = new Date(now.getTime() - secondsAgo * 1000 - minutesAgo * 60000 - hoursAgo * 3600000 - daysAgo * 86400000 - weeksAgo * 604800000 - monthsAgo * 2628000000 - yearsAgo * 31536000000);
  return date.toISOString();
}

