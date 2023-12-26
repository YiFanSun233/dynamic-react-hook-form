export const ValidatorFormats = [
  { label: 'URL地址', value: 'url' },
  { label: '邮箱格式', value: 'email' },
  { label: '数字格式', value: 'number' },
  { label: '整数格式', value: 'integer' },
  { label: '身份证格式', value: 'idcard' },
  { label: '手机号格式', value: 'phone' },
  { label: '货币格式', value: 'money' },
  { label: '中文格式', value: 'zh' },
  { label: '日期格式', value: 'date' },
  { label: '邮编格式', value: 'zip' },
]

export type RulesType = 'url' | 'email' | 'number' | 'integer' | 'idcard' | 'phone' | 'money' | 'zh' | 'date' | 'zip'

export default {
  url: new RegExp(
    // protocol identifier
    '^(?:(?:(?:https?|ftp|rtmp):)?//)' +
    // user:pass authentication
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    // IP address exclusion - private & local networks
    // Reference: https://www.arin.net/knowledge/address_filters.html

    // filter 10.*.*.* and 127.*.*.* addresses
    '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
    // filter 169.254.*.* and 192.168.*.*
    '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
    // filter 172.16.0.0 - 172.31.255.255
    // TODO: add test to validate that it invalidates address in 16-31 range
    '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broadcast addresses
    // (first & last IP address of each class)

    // filter 1. part for 1-223
    '(?:22[0-3]|2[01]\\d|[1-9]\\d?|1\\d\\d)' +
    // filter 2. and 3. part for 0-255
    '(?:\\.(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})){2}' +
    // filter 4. part for 1-254
    '(?:\\.(?:25[0-4]|2[0-4]\\d|1\\d\\d|[1-9]\\d?))' +
    '|' +
    // host name
    '(?:(?:[a-z\\u00a1-\\uffff0-9_]-*)*[a-z\\u00a1-\\uffff0-9_]+)' +
    // domain name
    '(?:\\.(?:[a-z\\u00a1-\\uffff0-9_]-*)*[a-z\\u00a1-\\uffff0-9_]+)*' +
    // TLD identifier
    '(?:\\.(?:[a-z\\u00a1-\\uffff_]{2,}))' +
    ')' +
    // port number
    '(?::\\d{2,5})?' +
    // resource path
    '(?:/?\\S*)?$'
  ),
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,

  ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,

  ipv4: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/,

  number: /^[+-]?\d+(\.\d+)?$/,

  integer: /^[+-]?\d+$/,

  qq: /^(\+?[1-9]\d*|0)$/,

  phone: /^\d{3}-\d{8}$|^\d{4}-\d{7}$|^\d{11}$/,

  idcard: /^\d{15}$|^\d{17}(\d|x|X)$/,

  money:
    /^([\u0024\u00A2\u00A3\u00A4\u20AC\u00A5\u20B1\u20B9\uFFE5]\s*)(\d+,?)+(\.\d+)?\s*$/,

  zh: /^[\u4e00-\u9fa5]+$/,

  date: /^[0-9]+[./-][0-9]+[./-][0-9]+\s*(?:[0-9]+\s*:\s*[0-9]+\s*:\s*[0-9]+)?$/,

  zip: /^[0-9]{6}$/,
}