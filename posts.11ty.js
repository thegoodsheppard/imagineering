'use strict';

module.exports = function ({ collections }) {
  data: {
    title: 'All The Posts';
    layout: 'layouts/posts.njk';
  }
  // console.log(JSON.stringify(collections));
  return `<ul>
    ${collections.post.map((post) => {
      return `<li>
      <a href="${post.url}"
      ${JSON.stringify(post)}
      </a>
      </li>`;
    })}
  </ul>`;
};
