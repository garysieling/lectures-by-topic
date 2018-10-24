import React from "react";

import "semantic-ui-react";
//import Layout from '../components/layout'
//import Video from '../components/video'
import { StaticQuery, Link, graphql } from "gatsby";
import { css } from "react-emotion";
import { Helmet } from "react-helmet";
import _ from "lodash";

/*
<div class="ui list">
  <div class="item">
    <div class="header">New York City</div>
    A lovely city
  </div>
  <div class="item">
    <div class="header">Chicago</div>
    Also quite a lovely city
  </div>
  <div class="item">
    <div class="header">Los Angeles</div>
    Sometimes can be a lovely city
  </div>
  <div class="item">
    <div class="header">San Francisco</div>
    What a lovely city
  </div>
</div>

*/

const Facet = (facetData) => 
  <div>
    <h1>{facetData.title}</h1>
    <div class="ui list">
      {
        facetData.values.map((facetValue, i) => (
          <div class="item" key={i}>
            <Link to={`/${facetData.title}/${facetValue.title}`}>
              {facetValue.title}
            </Link>
            {
              facetValue.facets !== null ? 
                facetValue.facets.map(
                  (subFacet, i) => 
                    <div>
                      <div key={i}>
                        {subFacet.title}
                        <div class="list">
                          {
                            _.take(
                              subFacet.values, 
                              11
                            ).map(
                              (subFacetValue, i) => 
                                i >= (
                                  10
                                ) ? (
                                  <div class="item" key={i}>
                                    <Link to={`/${facetData.title}/${facetValue.title}#${subFacet.title}=all`}>
                                      More...
                                    </Link>
                                  </div>
                                ) : (
                                  <div class="item" key={i}>
                                    <Link to={`/${facetData.title}/${facetValue.title}/${subFacet.title}/${subFacetValue.title}`}>
                                      {subFacetValue.title}
                                    </Link>
                                  </div>
                                )
                              )
                          }
                        </div>
                      </div>
                      <div>
                        Video 1
                        Video 2
                        Video 3
                        Video 4
                      </div>
                    </div>
                  ) : null
              }
            </div>
          )
        )
      } 
    </div>
  </div>;

const IndexPage = ({ children, pageContext }) => (
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
      render={(data) => (
        <div
          className="ui container"
        >
            <script type="in/Login"></script>
            <h3 className="">
              {data.site.siteMetadata.title}
            </h3>
            <div>
              <Facet 
                title="All Topics"
                values={[pageContext.facets[1]]} />
            </div>
          {children}
        </div>
      )}
    />
  </div>
);

export default IndexPage;
