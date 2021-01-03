---
title: Notes on Making an 11ty (Eleventy?) Site From Scratch
date: 2020-11-28
---

1. Starter commands:

   1. `npm init -y`
   2. `npm install @11ty/eleventy`
   3. `.gitignore` file
   4. `mkdir src/_includes`

2. `.eleventy.js` config file:

```js
module.exports = (config) => {
  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    markdownTemplateEngine: 'njk', // add nunjucks syntax to markdown files
  };
};
```

3. `npm start` set to `npx eleventy --serve --quiet`
4. `mkdir _includes/layouts/` 'magic' directory
5. Set up `base.njk` boilerplate in `layouts`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>{{ title }}</title>
  </head>
  <body>
    {% block content %}{% endblock %}
  </body>
</html>
```

6. Set up `home.njk` layout:

```
{% extends "layouts/base.html" %}

{% block content %}
<article>
  <h1>{{ title }}</h1>
  {{ content | safe }}
</article>
{% endblock %}
```
