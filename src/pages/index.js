import React from 'react'

import Layout from '../components/layout'
import Video from '../components/video'
import { StaticQuery, Link, graphql } from "gatsby"
import { css } from "react-emotion"

const Facet = ({title, values}) => 
  <div>
    <h1>{title}</h1>
      <ul>
      {values.map(({ title, facets }, index) => (
        <li>
          <Link to={`/${title}`} key={index}>
            {title}
          </Link>
          {
            facets !== null ? 
              facets.map(
                (subFacet) => 
                  <div>
                    {subFacet.title}
                    <ul>
                      {
                        subFacet.values.map(
                          ({title}) => <li>{title}</li>)
                      }
                    </ul>
                  </div>
            ) : null
          }
        </li>
      ))} 
    </ul>
  </div>

const IndexPage = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {    
        allDataJson {
          edges {
            node {
              values {
                title
                facets {
                  title
                  values {
                    title
                  }
                }
              }
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
          <h3
            className={css`
              display: inline-block;
              font-style: normal;
            `}
          >
            {data.site.siteMetadata.title}
          </h3>
          <div>
            <Facet 
              title="All Topics"
              values={data.allDataJson.edges[0].node.values} />
          </div>
        {children}
      </div>
    )}
  />
)

export default IndexPage
