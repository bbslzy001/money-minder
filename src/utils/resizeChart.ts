import {EChartsType} from "echarts";

let windowListener: (() => void) | null = null;
let parentElementObserver: ResizeObserver | null = null;

const observe = (chart: EChartsType, parentElement: HTMLElement | null) => {
    // 监听浏览器窗口变化
    window.addEventListener('resize', windowListener = () => {
        chart.resize();
    });
    // 监听父盒子大小变化
    if (parentElement) {
        parentElementObserver = observeElementResize(parentElement, () => {
            chart.resize();
        });
    }
}

/**
 * 监听元素的大小变化, 并在变化时执行回调函数
 * @param element 待监听的元素
 * @param callback 大小发生变化时要执行的回调函数
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
