/**
 * @author Kuitos
 * @since 2019-05-15
 */
import { getMountedApps } from 'single-spa';

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isConstructable(fn: () => void | FunctionConstructor) {
  const constructableFunctionRegex = /^function\b\s[A-Z].*/;
  const classRegex = /^class\b/;

  // 有 prototype 并且 prototype 上有定义一系列非 constructor 属性，则可以认为是一个构造函数
  return (
    (fn.prototype && Object.getOwnPropertyNames(fn.prototype).filter(k => k !== 'constructor').length) ||
    constructableFunctionRegex.test(fn.toString()) ||
    classRegex.test(fn.toString())
  );
}

export function appStatusObtain():string[] {
  const allMountedApps = getMountedApps();
  console.log('allMountedApps: ', allMountedApps);
  return getMountedApps();
}
