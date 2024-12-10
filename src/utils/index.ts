export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const apiUrl = process.env.REACT_APP_API_URL

export const cleanObject = (obj?: { [key: string]: unknown}) => {

  if(!obj) {
    return {}
  }

  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'
    const val = result[key];
    if (isVoid(val)) {
      delete result[key];
    }
  });
  return result;
};


// 在一个函数里， 参数传入对象本身 是不好的
// obj: object
// object 就要这种[键值对]的形式 { [key: string]: unknown }

let testObj: object
testObj = { name: 'Jacky' } // 赋值为 一般对象 =》 正确
testObj = () => { console.log('赋值为函数') } // 赋值为 函数 => 正确
testObj = new RegExp('') // 赋值为 正则 =》正确
console.log('测试 testObj:', testObj)
let testObj2: { [key: string]: unknown }
testObj2 = { name: 'Lau' }
// testObj2 = () => {}  // 报错：Type '() => void' is not assignable to type '{ [key: string]: unknown; }'. Index signature for type 'string' is missing in type '() => void'
console.log('测试 testObj2:', testObj2)