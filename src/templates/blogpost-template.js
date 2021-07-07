import React from "react"
import ReactAudioPlayer from 'react-audio-player'
import { graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faFolderOpen } from "@fortawesome/free-regular-svg-icons"
import {
  faChevronLeft,
  faChevronRight,
  faCheckSquare
} from "@fortawesome/free-solid-svg-icons"

import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS } from "@contentful/rich-text-types"

import Seo from "../components/seo"

const descOptions = {
  renderText: text => {
    return text
  }
}

const options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2>
        <FontAwesomeIcon icon={faCheckSquare} />
        {children}
      </h2>
    ),  
    [BLOCKS.EMBEDDED_ASSET]: node => {
      if( node.data.target.gatsbyImageData ){
        return (
          <GatsbyImage
            image={node.data.target.gatsbyImageData}
            alt={
              node.data.target.description
              ? node.data.target.description
              : node.data.target.title
            }
          />
        )
      } else if( node.data.target.file.url ) {
        return (
          <ReactAudioPlayer
            src={node.data.target.file.url}
            autoPlay
            controls
          />
        )
      }        
    }
  }
}

const Prevlink = ({ status }) => {
  if (status) {
    return (
      <OutboundLink href={`/blog/post/${status.slug}/`} rel="prev" >
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>
          {status.title}
        </span>
      </OutboundLink>
    )
  } else {
    return null
  }
}

const Nextlink = ({ status }) => {
  if (status) {
    return (
      <OutboundLink href={`/blog/post/${status.slug}/`} rel="next" >
        <span>
          {status.title}
        </span>
        <FontAwesomeIcon icon={faChevronRight} />
      </OutboundLink>
    )
  } else {
    return null
  }
}

const Blogpost = ({ data, pageContext, location }) => {

  return (
    <Layout>
      <Seo
        pagetitle={data.contentfulBlogPost.title}
        pagedesc={`${renderRichText(
          data.contentfulBlogPost.content, descOptions
        )[0].props.children[0].slice(0, 70)}…`}
        pagepath={location.pathname}
        pageimg={`https:${data.contentfulBlogPost.eyecatch.file.url}`}
        pageimgw={data.contentfulBlogPost.eyecatch.file.details.image.width}
        pageimgh={data.contentfulBlogPost.eyecatch.file.details.image.height}
      />
      <div className="eyecatch">
        <figure>
          <GatsbyImage
            image={data.contentfulBlogPost.eyecatch.gatsbyImageData}
            alt={data.contentfulBlogPost.eyecatch.description}
            layout="fullWidth"
            style={{ width: "100%" }}
          />
        </figure>
      </div>

      <article className="content">
        <div className="container">
          <h1 className="bar">{data.contentfulBlogPost.title}</h1>

          <aside className="info">
            <time dateTime={data.contentfulBlogPost.publishDate}>
              <FontAwesomeIcon icon={faClock} />
              {data.contentfulBlogPost.publishDateJP}
            </time>

            <div className="cat">
              <FontAwesomeIcon icon={faFolderOpen} />
              <ul>
                {data.contentfulBlogPost.category.map( cat => (
                  <li className={cat.categorySlug} key={cat.id}>
                    <OutboundLink href={`/cat/${cat.categorySlug}/`}>
                      {cat.category}
                    </OutboundLink>                   
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="postbody">
            {renderRichText( data.contentfulBlogPost.content, options )}
          </div>

          <ul className="postlink">
            <li className="prev">
              <Prevlink status={pageContext.next} />
              
            </li>
            <li className="next">
              <Nextlink status={pageContext.previous} />
            </li>
          </ul>

        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      publishDate
      publishDateJP:publishDate(formatString: "YYYY年MM月DD日")
      category {
        category
        categorySlug
        id
      }
      eyecatch {
        gatsbyImageData
        file {
          url
          details {
            image {
              width
              height
            }
          }
        }
        description
      }
      content {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData
          }
          description
          title
          file {
            url
          }
        }
      }
    }
  }
`

export default Blogpost