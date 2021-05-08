  // 防抖函数,在delay时间内下一张图片加载完成会取消定时器，即不会执行func
  // 在delay时间内下一张图片未加载完成就会执行timer，即执行func函数

  export function debounce(func, delay) {
      let timer = null;
      return function(...arg) {
          if (timer)
              clearTimeout(timer);
          timer = setTimeout(() => {
              func.apply(this, arg)
          }, delay);
      }
  }