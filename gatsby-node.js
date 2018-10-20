const path = require(`path`)

exports.onCreateNode = ({ node }) => {
    console.log(node.internal.type)
}

  
exports.createPages = ({ graphql, actions }) => {
    return new Promise((resolve, reject) => {
        graphql(`
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
        }
        `
        ).then(({data}) => {
            const { createPage } = actions;

            const create = (slug, facetData, facetValue, subFacetValue) => createPage({
                path: slug,
                component: path.resolve(`./src/pages/index.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: slug,
                    facets: [
                        facetData,
                        facetValue,
                        subFacetValue
                    ]
                },
            });

            const facetData = data.allDataJson.edges[0].node;

            console.log(JSON.stringify(facetData))
        
            const rootTitle = "All Topics";

            facetData.values.map(
                (facetValue, i) => (
                    [
                        create(`/${rootTitle}/${facetValue.title}`, facetData, facetValue, null),
                        facetValue.facets !== null ? 
                        facetValue.facets.map(
                            (subFacet, i) => 
                            subFacet.values.map(
                                (subFacetValue, i) =>
                                    create(
                                        `/${rootTitle}/${facetValue.title}/${subFacet.title}/${subFacetValue.title}`,
                                        facetData,
                                        facetValue,
                                        subFacetValue
                                    )
                            )
                        ) : null
                    ]
                )
            );
                                    
            resolve();
        })
    })
}