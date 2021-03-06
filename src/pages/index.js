import React from "react";

//import Layout from '../components/layout'
//import Video from '../components/video'
import { StaticQuery, Link, graphql } from "gatsby";
import { css } from "react-emotion";
import { Helmet } from "react-helmet";
import _ from "lodash";

const Facet = (facetData) => 
  <div>
    <h1>{facetData.title}</h1>
    {
      facetData.values.map((facetValue, i) => (
        <div key={i}>
          <Link to={`/${facetData.title}/${facetValue.title}`}>
            {facetValue.title}
          </Link>
          {
            facetValue.facets !== null ? 
              facetValue.facets.map(
                (subFacet, i) => 
                  <div key={i}>
                    {subFacet.title}
                    <div>
                      {
                        _.take(subFacet.values, 11).map(
                          (subFacetValue, i) => 
                            i >= 10 ? (
                              <div key={i}>
                                <Link to={`/${facetData.title}/${facetValue.title}`}>
                                  More...
                                </Link>
                              </div>
                            ) : (
                              <div key={i}>
                                <Link to={`/${facetData.title}/${facetValue.title}/${subFacet.title}/${subFacetValue.title}`}>
                                  {subFacetValue.title}
                                </Link>
                              </div>
                            )
                          )
                      }
                    </div>
                  </div>
                ) : null
            }
          </div>
        )
      )
    } 
  </div>;

const IndexPage = ({ children }) => (
  <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Gary</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css" />
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.js" />
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
);

export default IndexPage;
