import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ElementPlus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(store).use(router).use(ElementPlus, {size: 'default', zIndex: 2000, locale: zhCn}).mount('#app')


// ���ڽ�� el-table �� ResizeObserver loop limit exceeded ����
type DebounceFunction = (...args: any[]) => void;

const debounce = (fn: DebounceFunction, delay: number): DebounceFunction => {
    let timer: number | null = null;
    return function (this: ThisParameterType<DebounceFunction>, ...args: any[]): void {
        const context = this;
        clearTimeout(timer as number | undefined);
        timer = window.setTimeout(function (this: ThisParameterType<DebounceFunction>) {
            fn.apply(context, args);
        }, delay);
    };
};

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void) {
        const debouncedCallback = debounce(callback, 16);
        super(debouncedCallback);
    }
};