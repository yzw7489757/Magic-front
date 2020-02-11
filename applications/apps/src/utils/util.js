export function colorList() {
  // 92种颜色
  // 颜色列表
  const color = ['#1890FF', '#c213ad', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#FFD00F', '#FF789D'];

  // 8
  const schemeAccent = d3.scaleOrdinal(d3.schemeAccent);
  const schemeDark2 = d3.scaleOrdinal(d3.schemeDark2);
  const schemePastel2 = d3.scaleOrdinal(d3.schemePastel2);
  const schemeSet2 = d3.scaleOrdinal(d3.schemeSet2);
  for (let i = 0; i < 8; i++) {
    color.push(schemeAccent(i));
    color.push(schemeDark2(i));
    color.push(schemePastel2(i));
    color.push(schemeSet2(i));
  }

  // 9
  const schemeSet1 = d3.scaleOrdinal(d3.schemeSet1);
  const schemePastel1 = d3.scaleOrdinal(d3.schemePastel1);
  for (let i = 0; i < 9; i++) {
    color.push(schemeSet1(i));
    color.push(schemePastel1(i));
  }

  // 10
  const schemeCategory10 = d3.scaleOrdinal(d3.schemeCategory10);
  for (let i = 0; i < 10; i++) {
    color.push(schemeCategory10(i));
  }

  // 12
  const schemePaired = d3.scaleOrdinal(d3.schemePaired);
  const schemeSet3 = d3.scaleOrdinal(d3.schemeSet3);
  for (let i = 0; i < 12; i++) {
    color.push(schemePaired(i));
    color.push(schemeSet3(i));
  }

  return color;
}

/**
 * FormatTime
 *
 * @export
 * @param {*} time
 * @param {*} cFormat
 * @returns
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
}
