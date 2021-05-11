export function updateLocalStorageData(dataObject = {}, mode = "set") {
  if (mode == "set") {
    for (const item in dataObject) {
      localStorage.setItem(item, dataObject[item]);
    }
  } else if (mode == "remove") {
    for (const item in dataObject) {
      localStorage.removeItem(item);
    }
  }
}
