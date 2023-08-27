export const truncateAddr = (str: string) => {
  if (str) {
    const list = str.split("");
    const first = list.slice(0, 6);
    const last = list.slice(list.length - 6, list.length);
    return `${first.join("")}...${last.join("")}`;
  }
};
