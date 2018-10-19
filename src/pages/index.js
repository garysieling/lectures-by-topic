import React from 'react'

//import Layout from '../components/layout'
//import Video from '../components/video'
import { StaticQuery, Link, graphql } from "gatsby"
import { css } from "react-emotion"
import { Helmet } from "react-helmet"

const Facet = ({title, values}) => 
  <div>
    <h1>{title}</h1>
      <ul>
      {values.map(({ title, facets }, i) => (
        <li key={i}>
          <Link to={`/${title}`}>
            {title}
          </Link>
          {
            facets !== null ? 
              facets.map(
                (subFacet, i) => 
                  <div key={i}>
                    {subFacet.title}
                    <ul>
                      {
                        subFacet.values.map(
                          ({title, i}) => 
                            <li key={i}>{title}</li>
                        )
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
  <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Gary</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <script type="text/javascript" src="//platform.linkedin.com/in.js">{`
            api_key:   ${process.env.LINKEDIN_API_KEY}
        `}</script>

    </Helmet>
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
            <script type="in/Login"></script>
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
  </div>
)

export default IndexPage
