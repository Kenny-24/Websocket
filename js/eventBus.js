class EventBus {
  // private events: { [key: string]: Array<{ fn: Function; isOnce: boolean }> };
  constructor() {
    this.events = {};
  }
  static Instance() {
    //返回当前类的实例的单例
    if (!EventBus._instance) {
      Object.defineProperty(EventBus, "_instance", {
        value: new EventBus(),
      });
    }
    return EventBus._instance;
  }
  onEvent(type, fn, isOnce = false) {
    if (this.events[type] == null) {
      this.events[type] = [];
    }
    this.events[type].push({ fn, isOnce });
  }
  once(typeg, fn) {
    this.on(type, fn, true);
  }
  emitEvent(type, ...args) {
    const fnList = this.events[type];
    if (!fnList) return;
    this.events[type] = fnList.filter((item) => {
      const { fn, isOnce } = item;
      fn(...args);
      // 过滤掉isOnce为true的
      if (!isOnce) return true;
      return false;
    });
  }
  off(type, fn) {
    const fnList = this.events[type];
    if (!fn) {
      this.events[type] = [];
    } else {
      if (fnList) {
        this.events[type] = fnList.filter((item) => item.fn !== fn);
      }
    }
  }
}
export default EventBus.Instance();
