export function getWordInflection(quantity: number, wordsInflection: string[]) {
  return wordsInflection[
    quantity % 10 == 1 && quantity % 100 != 11
      ? 0
      : quantity % 10 >= 2 && quantity % 10 <= 4 && (quantity % 100 < 10 || quantity % 100 >= 20)
        ? 1
        : 2
    ];
}
