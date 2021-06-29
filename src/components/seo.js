import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ pagetitle, pagedesc, pagepath, pageimg, pageimgw, pageimgh, blogimg }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          lang
          description
          siteUrl
          locale
          fbappid
        }
      }
    }
  `)

  const title = pagetitle
    ? `${pagetitle} | ${data.site.siteMetadata.title}` : data.site.siteMetadata.title

  const description = pagedesc || data.site.siteMetadata.description

  const url = pagepath
   ? `${data.site.siteMetadata.siteUrl}${pagepath}` : data.site.siteMetadata.siteUrl

  const imgurl = pageimg
    ? `${data.site.siteMetadata.siteUrl}${pageimg}`
    : blogimg || `${data.site.siteMetadata.siteUrl}/thumb.jpg`
    
  const imgw = pageimgw || 1280
  const imgh = pageimgh || 640

  return (
    <Helmet>
      <html lang={data.site.siteMetadata.lang} />
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={data.site.siteMetadata.locale} />
      <meta property="fb:app_id" content={data.site.siteMetadata.fbappid} />

      <meta property="og:image" content={imgurl} />
      <meta property="og:image:width" content={imgw} />
      <meta property="og:image:height" content={imgh} />

      <meta property="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}

export default Seo
