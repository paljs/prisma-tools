import { ModelFragment } from '../../generated';

export const initPages = (pagesCount: number, page: number) => {
  let showPagesCount = 4;
  showPagesCount = pagesCount < showPagesCount ? pagesCount : showPagesCount;
  const pages = [];

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

export const getDisplayName = (value: any, model: ModelFragment) => {
  const values: string[] = [];
  model.displayFields.forEach((item) => {
    const splitItem = item.split('.');
    if (splitItem.length === 1) {
      values.push(value[splitItem[0]]);
    } else {
      let nameValue: any = { ...value };
      splitItem.forEach((field) => {
        nameValue = nameValue[field];
      });
      values.push(nameValue);
    }
  });
  return values.join(' ');
};
