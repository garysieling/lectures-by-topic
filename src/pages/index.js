import React from 'react'

import Layout from '../components/layout'
import Video from '../components/video'
import { StaticQuery, Link, graphql } from "gatsby"
import { css } from "react-emotion"

const IndexPage = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        allCategoriesCsv {
          edges {
           node {
             topic
             category
           }
         }
       }
        allFile {
          edges {
            node {
              relativePath
              prettySize
              extension
              birthTime(fromNow: true)
            }
          }
        }
        site {
          siteMetadata {
            title
          }
        }
      }
    `
}
    render={data => (
      <div
        className={css`
          margin: 0 auto;
          max-width: 700px;
        `}
      >
        <Link to={`/`}>
          <h3
            className={css`
              display: inline-block;
              font-style: normal;
            `}
          >
            {data.site.siteMetadata.title}
          </h3>
          <div>
            Test
            <table>
              <thead>
                <tr>
                  <th>relativePath</th>
                  <th>prettySize</th>
                </tr>
              </thead>
              <tbody>
                {data.allCategoriesCsv.edges.map(({ node }, index) => (
                  <tr key={index}>
                    <td>{node.topic}</td>
                    <td>{node.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>relativePath</th>
                  <th>prettySize</th>
                  <th>extension</th>
                  <th>birthTime</th>
                </tr>
              </thead>
              <tbody>
                {data.allFile.edges.map(({ node }, index) => (
                  <tr key={index}>
                    <td>{node.relativePath}</td>
                    <td>{node.prettySize}</td>
                    <td>{node.extension}</td>
                    <td>{node.birthTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Link>
        <Link
          to={`/about/`}
          className={css`
            float: right;
          `}
        >
          About
        </Link>
        {children}
      </div>
    )}
  />
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default IndexPage
