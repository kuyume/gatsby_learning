import React from "react"
import { graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

import Seo from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons"

const Blog = ({ data, location, pageContext }) => (
  <Layout>
    <Seo
      pagetitle="ブログ"
      pagedesc="ESSENTIALSのブログです"
      pagepath={location.pathname}
      // blogimg={`https:${data.allContentfulBlogPost.eyecatch.file.url}`}
      // pageimgw={data.allContentfulBlogPost.eyecatch.file.details.image.width}
      // pageimgw={data.allContentfulBlogPost.eyecatch.file.details.image.width}
    />
    <section className="content bloglist">
      <div className="container">
        <h1 className="bar">RECENT POSTS</h1>

        <div className="posts">
          {data.allContentfulBlogPost.edges.map(({ node }) => (
            <article className="post" key={node.id}>
            <OutboundLink href={`/blog/post/${node.slug}/`}>
            <figure>
              <GatsbyImage
                image={node.eyecatch.gatsbyImageData}
                alt={node.eyecatch.description}
                style={{ height: "100%" }}
              />
            </figure>
            <h3>{node.title}</h3>
            </OutboundLink>
          </article>
          ))}        
        </div>

        <ul className="pagenation">
          {!pageContext.isFirst && (
            <li className="prev">
              <OutboundLink
                href={
                  pageContext.currentPage === 2
                  ? `/blog/`
                  : `/blog/${pageContext.currentPage - 1}/`
                }
                rel="prev"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>前のページ</span>
              </OutboundLink>
            </li>
          )}
          {!pageContext.isLast && (
            <li className="next">
              <OutboundLink
                href={
                  `/blog/${pageContext.currentPage + 1}/`
                }
                rel="next"
              >
                <span>次のページ</span>
                <FontAwesomeIcon icon={faChevronRight} />
              </OutboundLink>
            </li>
          )}
        </ul>
      </div>
    </section>
  </Layout>
)

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allContentfulBlogPost (
      sort: { order: DESC, fields: publishDate }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          title
          id
          slug
          eyecatch {
            gatsbyImageData
            description
          }
        }
      }
    }
  }
`


export default Blog