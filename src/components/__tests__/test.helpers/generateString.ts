const generateString = (stringLength: number) => {
  let str = '';
  for (let i = 0; i < stringLength; i++) {
    str += 'a';
  }
  return str;
};

export { generateString };
