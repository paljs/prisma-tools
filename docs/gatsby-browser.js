/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import './src/styles/normalize.css';

/**
 *
 * @desc - a function to jump to the correct scroll position
 * @param {Object} location -
 * @param {Number} [mainNavHeight] - the height of any persistent nav -> document.querySelector(`nav`)
 */
function scrollToAnchor(location) {
  if (location && location.hash) {
    const item = document.querySelector(`${location.hash}`);
    item.scrollIntoView();
  }

  return true;
}

export const onRouteUpdate = ({ location }) => scrollToAnchor(location);
