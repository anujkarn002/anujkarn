const path = require('path');

module.exports = {
  siteMetadata: {
    siteTitle: 'Anuj Karn',
    siteDescription: 'This is my personal space. I post blogs, codes and tutorials and memes too.',
    siteImage: '/banner.png',
    siteUrl: 'https://anujkarn.com.np/',
    pathPrefix: '/',
    siteLanguage: 'en',
    ogLanguage: `en_US`,
    author: 'Anuj Karn',
    authorDescription: 'Hey there! How are you?',
    avatar: '/avatar.jpg',
    twitterSite: 'https://twitter.com/anujkarn002', // website account on twitter
    twitterCreator: 'https://twitter.com/anujkarn002', // creator account on twitter
    social: [
      {
        icon: `at`,
        url: `mailto:hello@anujkarn.com.np`
      },
      {
        icon: `twitter`,
        url: `https://twitter.com/anujkarn002`
      },
      {
        icon: `github`,
        url: `https://github.com/anujkarn002`
      },
      {
        icon: `instagram`,
        url: `https://instagram.com/anujkarn002`
      },
      {
        icon: `linkedin`,
        url: `https://linkedin.com/in/anujkarn002`
      },
      {
        icon: `facebook`,
        url: `https://facebook.com/anujkarn002`
      }
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, `static`, `media`),
        name: 'media'
      }
    },
    {
      resolve: 'gatsby-theme-chronoblog',
      options: {
        uiText: {
          // ui text fot translate
          feedShowMoreButton: 'show more',
          feedSearchPlaceholder: 'search',
          cardReadMoreButton: 'read more →',
          allTagsButton: 'all tags'
        },
        feedItems: {
          // global settings for feed items
          limit: 50,
          yearSeparator: true,
          yearSeparatorSkipFirst: true,
          contentTypes: {
            links: {
              beforeTitle: '🔗 '
            }
          }
        },
        feedSearch: {
          symbol: '🔍'
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Anuj Karn`,
        short_name: `aK`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#3a5f7d`,
        display: `standalone`,
        icon: `src/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-143822123-1'
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        publicPath: `admin`,
        modulePath: path.join(__dirname, `src`, `netlifycms`, 'cms.js')
      }
    },
    'gatsby-plugin-netlify' 
  ]
};
