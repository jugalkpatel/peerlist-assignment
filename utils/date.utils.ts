export function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + "y";
  }

  interval = Math.floor(seconds / 2592000);

  if (interval > 1) {
    return interval + "mo";
  }

  interval = Math.floor(seconds / 86400);

  if (interval > 1) {
    return interval + "d";
  }

  interval = Math.floor(seconds / 3600);

  if (interval > 1) {
    return interval + "h";
  }

  interval = Math.floor(seconds / 60);

  if (interval > 1) {
    return interval + "m";
  }

  return Math.floor(seconds) + " s";
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  const formattedDateWithCommas = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(date);

  return formattedDateWithCommas.replace(/,/g, "");
}

export function getNoticePeriodText(days: number): string {
  if (days < 30) {
    return "Immediate";
  } else if (days < 45) {
    return `${days}d`;
  } else {
    const months = Math.floor(days / 30);
    return `${months}m`;
  }
}
