const fillMissingDates = (datalist: any[], startDate: Date, endDate: Date): any[] => {
    // 创建一个以日期作为key，值默认为0的map对象
    let dataMap = new Map();
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        let dateStr = formatDate(d);  // 将日期字符串转换为 'yyyy-mm-dd'的格式
        dataMap.set(dateStr, 0);
    }

    // 更新datalist中存在的日期的值
    datalist.forEach(data => {
        let dateStr = data.txnDate.slice(0, 10);  // 将日期字符串转换为 'yyyy-mm-dd'的格式
        dataMap.set(dateStr, data.txnAmount);
    });

    // 将map对象转换为数组
    let result: any[] = [];
    dataMap.forEach((value, key) => {
        result.push({
            txnAmount: value,
            txnDate: key
        });
    });

    return result;
}

// 将日期字符串转换为 'yyyy-mm-dd'的格式
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

export {fillMissingDates};