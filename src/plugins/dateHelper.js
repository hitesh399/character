
export default class DateTimeHelper {
    constructor(d) {
        if (d) {
            d = d.replace(' ', 'T')
            if (d.lastIndexOf('Z') === -1) {
                d = d + 'Z'
            }
            this.date = new Date(d)
        }
    }
    format(format) {
        return dateFormat(this.date, format)
    }
    agoFrom(from) {
        if (!(from instanceof Date)) {
            new Error('Param 1 should be instance of Date')
        }
        return timeAgo(this.date, from)
    }
    ago() {
        return this.agoFrom(new Date())
    }
}

export function dateFormat(date, format) {
    if (!format)
        format = "dd/MM/yyyy";

    const matchedChrs = format.match(/\{.+\}/g)
    if (matchedChrs) {
        matchedChrs.forEach((char, index) => {
            format = format.replace(char, '{' + index + '}')
        })
    }


    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    format = format.replace("MM", month.toString().padStart(2, "0"));

    if (format.indexOf("yyyy") > -1)
        format = format.replace("yyyy", year.toString());
    else if (format.indexOf("yy") > -1)
        format = format.replace("yy", year.toString().substr(2, 2));

    format = format.replace("dd", date.getDate().toString().padStart(2, "0"));

    var hours = date.getHours();
    if (format.indexOf("t") > -1) {
        if (hours > 11)
            format = format.replace("t", "pm")
        else
            format = format.replace("t", "am")
    }
    if (format.indexOf("HH") > -1)
        format = format.replace("HH", hours.toString().padStart(2, "0"));
    if (format.indexOf("hh") > -1) {
        if (hours > 12) hours - 12;
        if (hours == 0) hours = 12;
        format = format.replace("hh", hours.toString().padStart(2, "0"));
    }
    if (format.indexOf("mm") > -1)
        format = format.replace("mm", date.getMinutes().toString().padStart(2, "0"));
    if (format.indexOf("ss") > -1)
        format = format.replace("ss", date.getSeconds().toString().padStart(2, "0"));
    if (matchedChrs) {
        matchedChrs.forEach((char, index) => {
            format = format.replace('{' + index + '}', char.replace('{', '').replace('}', ''))
        })
    }
    return format;
}

export function timeAgo(dateParam, today = new Date()) {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();
    const yearDiff = today.getFullYear() - date.getFullYear();

    if (seconds < 5) {
        return 'now';
    } else if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 90) {
        return 'about a minute ago';
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (isToday) {
        return 'Today at ' + dateFormat(date, 'hh:mmt'); // Today at 10:20
    } else if (isYesterday) {
        return 'Yesterday at ' + dateFormat(date, 'hh:mmt'); // Yesterday at 10:20
    } else if (isThisYear) {
        // return getFormattedDate(date, false, true); // 10. January at 10:20
        return dateFormat(date, 'dd/MM/yyyy {at} hh:mmt')
    } else if (yearDiff <= 3) {
        return `${yearDiff} Years ago`
    }

    return dateFormat(date, 'dd/MM/yyyy {at} hh:mmt') // 10. January 2017. at 10:20
}
