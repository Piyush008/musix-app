export const pxToRem = (px) => {
  const remValue = (px * 100) / (1080 + 1024 + 512);
  return `${remValue}rem`;
};

export const pxToRemSm = (px) => {
  const remValue = (px * 100) / (375 + 507 + 187.5);
  return `${remValue}rem`;
};

export const pxToRemMd = (px) => {
  const remValue = (px * 100) / (768 + 1024 + 384);
  return `${remValue}rem`;
};

export const pxToRemLg = (px) => {
  const remValue = (px * 100) / (1024 + 507 + 253.5);
  return `${remValue}rem`;
};

export const pxToRemXl = (px) => {
  const remValue = (px * 100) / (1440 + 596 + 298);
  return `${remValue}rem`;
};
const funcArr = (px) => [
  pxToRemSm(px),
  pxToRemMd(px),
  pxToRemLg(px),
  pxToRemXl(px),
];

export const pxToAll = (px, defaultValue = 2) => {
  const a = funcArr(px).slice(0, defaultValue);
  a.push(pxToRem(px));
  return a;
};
