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

  export function formatDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
      };
      for (let k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
              let str = o[k] + '';
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
          }
      }
      return fmt;
  };

  function padLeftZero(str) {
      return ('00' + str).substr(str.length);
  };