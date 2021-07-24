export default function enumrateDatesBetween(startDate, endDate) {
    let now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('M/D/YYYY'));
        now.add(1, 'days');
    }
    
    return dates;
}
