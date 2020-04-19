export const initPages = (pagesCount: number, page: number) => {
  let showPagesCount = 4;
  showPagesCount = pagesCount < showPagesCount ? pagesCount : showPagesCount;
  let pages = [];

  let middleOne = Math.ceil(showPagesCount / 2);
  middleOne = page >= middleOne ? page : middleOne;

  let lastOne = middleOne + Math.floor(showPagesCount / 2);
  lastOne = lastOne >= pagesCount ? pagesCount : lastOne;

  const firstOne = lastOne - showPagesCount + 1;

  for (let i = firstOne; i <= lastOne; i++) {
    pages.push(i);
  }

  return pages;
};
