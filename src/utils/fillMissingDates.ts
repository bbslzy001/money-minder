const fillMissingDates = (datalist: any[], startDate: Date, endDate: Date): any[] => {
    // ����һ����������Ϊkey��ֵĬ��Ϊ0��map����
    let dataMap = new Map();
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        let dateStr = formatDate(d);  // �������ַ���ת��Ϊ 'yyyy-mm-dd'�ĸ�ʽ
        dataMap.set(dateStr, 0);
    }

    // ����datalist�д��ڵ����ڵ�ֵ
    datalist.forEach(data => {
        let dateStr = data.txnDate.slice(0, 10);  // �������ַ���ת��Ϊ 'yyyy-mm-dd'�ĸ�ʽ
        dataMap.set(dateStr, data.txnAmount);
    });

    // ��map����ת��Ϊ����
    let result: any[] = [];
    dataMap.forEach((value, key) => {
        result.push({
            txnAmount: value,
            txnDate: key
        });
    });

    return result;
}

// �������ַ���ת��Ϊ 'yyyy-mm-dd'�ĸ�ʽ
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

export {fillMissingDates};