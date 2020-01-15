import { parseTime } from '@/utils/util';
import { channel } from './list';

const timeFormat = (type, startTime, endTime) => {
  if (!startTime) {
    switch (type) {
      case 1:
        startTime = new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000 * 31;
        endTime = new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000;
        break;
      case 2:
        startTime = new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000 * 7 * 12;
        endTime = new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000;
        break;
      case 3:
        startTime = new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000 * 30 * 12;
        endTime = new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000;
        break;
      default:
        break;
    }
  }
  let start = parseTime(startTime, '{y}-{m}-{d}').split('-');
  let end = parseTime(endTime, '{y}-{m}-{d}').split('-');
  switch (type) {
    case 1:
      return [new Date(start[0], start[1] - 1, start[2]), new Date(end[0], end[1] - 1, end[2])];
    case 2:
      return [new Date(start[0], start[1] - 1, start[2]), new Date(end[0], end[1] - 1, end[2])];
    case 3:
      return [new Date(start[0], start[1] - 1, start[2]), new Date(end[0], end[1] - 1, end[2])];
    default:
      break;
  }
};
export default (type = 1, group = false, startTime, endTime, min = 100000, max) => {
  let arr = [];
  let day = timeFormat(type, startTime, endTime);
  if (group) {
    arr = channel[dataType].map(item => {
      let _val = min;
      return {
        name: item.name,
        dataList: day.map(element => {
          _val += parseFloat(min * (Math.random() - 0.3).toFixed(2));
          return {
            date: parseTime(Date.parse(element), '{y}-{m}-{d}'),
            value: (max && Math.max(min / 10, _val)) > max ? max : Math.max(min / 10, _val),
          };
        }),
      };
    });
  } else {
    let value = min;
    day.forEach(element => {
      arr.push({
        date: parseTime(Date.parse(element), '{y}-{m}-{d}'),
        value: max && value > max ? max : Math.max(value, 0),
      });
      value += parseFloat(min * (Math.random() - 0.3).toFixed(2));
    });
  }

  return arr;
};
