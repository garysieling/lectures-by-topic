require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Videos',
    siteUrl: 'https://www.findlectures.com'

  },
  plugins: [
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    //`gatsby-plugin-preact`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GOOGLE_TAG_MANAGER_ID,
  
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,
  
        // Specify optional GTM environment details.
        gtmAuth: process.env.GOOGLE_TAG_MANAGER_AUTH,
        gtmPreview: process.env.GOOGLE_TAG_MANAGER_PREVIEW,
      },
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: process.env.SENTRY_DSN,
        // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
        config: {
          environment: process.env.environment
        }
      },
    },
    /*{
      resolve: `@andrew-codes/gatsby-plugin-elasticlunr-search`,
      options: {
          // Fields to index
          fields: [
              'title'
          ],
          // How to resolve each field's value for a supported node type
          resolvers: {
              // For any node of type MarkdownRemark, list how to resolve the fields' values
              MarkdownRemark: {
                  title: node => node.frontmatter.title,
                  keywords: node => node.frontmatter.keywords,
              },
          },
      },
    },*/
    `gatsby-plugin-accessibilityjs`,
    `gatsby-plugin-eslint`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-netlify`, // make sure to put last in the array
  ],
}
