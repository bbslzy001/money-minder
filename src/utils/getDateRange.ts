import {endOfDay, endOfMonth, endOfWeek, endOfYear, format, startOfDay, startOfMonth, startOfWeek, startOfYear, subDays, subMonths, subYears} from 'date-fns';

const getDateRange = (type: 'day' | 'week' | 'month' | 'year' | 'all') => {
    let now = new Date();
    let startDate, endDate, currentDate;

    switch (type) {
        case 'day':
            startDate = [format(subDays(startOfDay(now), 1), 'yyyy-MM-dd HH:mm:ss'), format(startOfDay(now), 'yyyy-MM-dd HH:mm:ss')];
            endDate = [format(endOfDay(subDays(now, 1)), 'yyyy-MM-dd HH:mm:ss'), format(endOfDay(now), 'yyyy-MM-dd HH:mm:ss')];
            currentDate = [format(now, 'dd日'), format(now, 'yyyy年MM月')];
            break;
        case 'week':
            startDate = [format(startOfWeek(now, {weekStartsOn: 1}), 'yyyy-MM-dd HH:mm:ss'), format(startOfWeek(now, {weekStartsOn: 1}), 'yyyy-MM-dd HH:mm:ss')];
            endDate = [format(endOfWeek(now, {weekStartsOn: 1}), 'yyyy-MM-dd HH:mm:ss'), format(endOfWeek(now, {weekStartsOn: 1}), 'yyyy-MM-dd HH:mm:ss')];
            currentDate = [format(startOfWeek(now, {weekStartsOn: 1}), 'dd日') + '-' + format(endOfWeek(now, {weekStartsOn: 1}), 'dd日'), format(now, 'yyyy年MM月')];
            break;
        case 'month':
            startDate = [format(startOfMonth(subMonths(now, 1)), 'yyyy-MM-dd HH:mm:ss'), format(startOfMonth(now), 'yyyy-MM-dd HH:mm:ss')];
            endDate = [format(endOfMonth(subMonths(now, 1)), 'yyyy-MM-dd HH:mm:ss'), format(endOfMonth(now), 'yyyy-MM-dd HH:mm:ss')];
            currentDate = [format(now, 'MM月'), format(now, 'yyyy年')];
            break;
        case 'year':
            startDate = [format(startOfYear(subYears(now, 1)), 'yyyy-MM-dd HH:mm:ss'), format(startOfYear(now), 'yyyy-MM-dd HH:mm:ss')];
            endDate = [format(endOfYear(subYears(now, 1)), 'yyyy-MM-dd HH:mm:ss'), format(endOfYear(now), 'yyyy-MM-dd HH:mm:ss')];
            currentDate = [format(now, 'yyyy年'), ''];
            break;
        case 'all':
            startDate = ['', ''];
            endDate = ['', ''];
            currentDate = ['', ''];
            break;
    }

    return {startDate, endDate, currentDate};
}

export {getDateRange};