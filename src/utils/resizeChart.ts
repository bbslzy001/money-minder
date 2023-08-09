import {EChartsType} from "echarts";

let windowListener: (() => void) | null = null;
let parentElementObserver: ResizeObserver | null = null;

const observe = (chart: EChartsType, parentElement: HTMLElement | null) => {
    // ������������ڱ仯
    window.addEventListener('resize', windowListener = () => {
        chart.resize();
    });
    // ���������Ӵ�С�仯
    if (parentElement) {
        parentElementObserver = observeElementResize(parentElement, () => {
            chart.resize();
        });
    }
}

/**
 * ����Ԫ�صĴ�С�仯, ���ڱ仯ʱִ�лص�����
 * @param element ��������Ԫ��
 * @param callback ��С�����仯ʱҪִ�еĻص�����
 */
const observeElementResize = (element: HTMLElement, callback: () => void) => {
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const {target} = entry;
            if (target === element) {
                callback();
            }
        }
    });
    resizeObserver.observe(element);
    return resizeObserver;
}

const unobserve = () => {
    if (windowListener) {
        window.removeEventListener('resize', windowListener);
    }
    if (parentElementObserver) {
        parentElementObserver.disconnect();
    }
}

export default {observe, unobserve};
