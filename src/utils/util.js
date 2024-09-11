/**
 * 时间戳
 * @param {*} timestamp  时间戳
 * @param timezone
 */
const timestampToTime = (timestamp) => {
  const language ='zh';
  // console.log("当前选择的语言", language);

  const offsetMap = {
    zh: 0 * 60 * 60 * 1000, // 中国，UTC+8，以毫秒为单位
    jp: 1 * 60 * 60 * 1000, // 日本，UTC+9，以毫秒为单位
  };

  let offset = offsetMap[language];
  if (offset === undefined) {
    // console.error("不支持的语言，使用默认的时区");
    offset = 8 * 60 * 60 * 1000; // 如果不支持的语言，默认使用中国UTC+8
  }

  // console.log("当前选择的语言offset", offset);

  // 将偏移量直接加到时间戳上
  const date = new Date(timestamp + offset);

  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

  return Y + M + D + h + m + s;
};


/**
 * 存储localStorage
 */
const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 设置cookie
 **/
function setCookie(name, value, day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date;
};

/**
 * 获取cookie
 **/
function getCookie(name) {
    let reg = RegExp(name + '=([^;]+)');
    let arr = document.cookie.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return '';
    }
};

/**
 * 删除cookie
 **/
function delCookie(name) {
    setCookie(name, null, -1);
};

/**
 * 导出
 **/
export {
    timestampToTime,
    setStore,
    getStore,
    removeStore,
    setCookie,
    getCookie,
    delCookie
}
