'use strict';

const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (eleventyConfig) => {
  // collections
  eleventyConfig.addCollection('posts', (collectionApi) => {
    return collectionApi.getFilteredByGlob('src/posts/*.md').reverse();
  });

  // plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // filters
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

  // passthroughs
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
