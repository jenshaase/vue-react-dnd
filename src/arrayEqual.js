export default function (a, b) {
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    let equal = true
    for (var i = 0; i < a.length; i++) {
      equal = equal && a[i] === b[i]
    }
    return equal
  } else {
    return a === b
  }
}
