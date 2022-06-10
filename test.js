const obj = {
  kasjdksad: "on",
  lkasdklasj: "on",
  lkaskdjdslaj: "aaaa",
  kaljd: "aasdsad",
  aksjdjdasjoie: "on",
};

const items = Object.entries(obj);
const filtered = items.filter((item) => item[1] === "on");
const filteredNames = new Map(filtered);
const finalData = Array(...filteredNames.keys());
console.log(finalData);
