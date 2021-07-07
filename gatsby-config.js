module.exports = {
  siteMetadata: {
    title: `ESSENTIALS`,
    description: `美味しい食材と食事を追求するサイト`,
    lang: 'ja',
    siteUrl: 'https://serene-lamport-d7b0fc.netlify.app',
    locale: `ja_JP`,
    fbappid: `XXXXXXXXXXXXX`
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        // spaceId: process.env.CONTENTFUL_SPACE_ID,
        // accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        // host: process.env.CONTENTFUL_HOST,
        spaceId: "2ihjo3hjjkpp",
        accessToken: "92z0_kffVqvJnPNxR2JfVIkHcQNL77Ipp8H9PA0HpdU",
        host: "cdn.contentful.com",
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ESSENTIALS エッセンシャルズ`,
        short_name: `ESSENTIALS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#477294`,
        display: `standalone`,
        icon: `src/images/icon.png`
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-6EB0R3E2ZQ`,
        head: true,
        respectDNT: true,
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        createLinkInHead: true
      }
    }
  ],
};
