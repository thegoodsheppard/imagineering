'use strict';

const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const CleanCSS = require('clean-css');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addFilter('cssmin', (code) => {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addFilter('gregFilter', (collectionItem) => {
    const postData = collectionItem.map(
      ({
        date,
        url,
        frontMatter,
        fileSlug,
        data: { title, nav, vars, excerpt },
      }) => {
        return { date, url, frontMatter, fileSlug, title, excerpt, nav, vars };
      }
    );
    return JSON.stringify(postData, null, 2);
  });
  eleventyConfig.addFilter('serializePosts', (value) => {
    const postData = value.map((post) => {
      return {
        date: post.date,
        url: post.url,
        data: {
          title: post.data.title,
          excerpt: post.data.excerpt,
        },
      };
    });
    return JSON.stringify(
      {
        collections: {
          post: postData,
        },
      },
      null,
      2
    );
  });
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/every-layout');
  return {
    dir: {
      input: 'src',
    },
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
};
