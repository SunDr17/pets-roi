export function isSvg(src: string) {
  return src.split('.').pop() === 'svg';
}
