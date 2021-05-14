export function shuffle<T>(array: T[]) {
  let currentIndex: number = array.length;
  let randomIndex: number;
  let temporaryValue: T;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
