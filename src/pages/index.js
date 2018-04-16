import React from 'react'
import Link from 'gatsby-link'
import cx from 'classnames'
import config from '../config'
import '../scss/index.scss'

const DEFAULT_LEFT = {
  motion: 0,
  about: 33.33,
  stills: 66.66
}

const EXPANDED_LEFT = {
  motion: 0,
  about: 25,
  stills: 50
}

export default class Index extends React.Component {
  state = {
    panels: [
      {
        title: 'motion',
        left: 0,
        leftExpanded: 0,
        alpha: 0
      },
      {
        title: 'about',
        left: 33.33,
        leftExpanded: 25,
        alpha: 0
      },
      {
        title: 'stills',
        left: 66.66,
        leftExpanded: 50,
        alpha: 0
      }
    ],
    expanded: null
  }

  render() {
    let { expanded, panels } = this.state

    return (
      <div className="home container">
        <div className="panels">
          {panels.map((p, index) => {
            let isExpanded = index === expanded
            let classes = cx(p.title, {
              expanded: isExpanded,
              darken: !isExpanded && expanded !== null && p.title !== 'about',
              grayen:
                expanded !== null && expanded !== index && p.title === 'about'
            })

            return (
              <section
                key={index}
                className={classes}
                style={{
                  left: isExpanded
                    ? EXPANDED_LEFT[p.title] + '%'
                    : DEFAULT_LEFT[p.title] + '%',
                  width: isExpanded ? '50%' : '33.33%'
                }}
              >
                <Link
                  to={p.title}
                  onClick={this._handleOnClick.bind(this)}
                  onMouseEnter={this._handleMouseEnter.bind(this, index)}
                  onMouseLeave={this._handleMouseLeave.bind(this, index)}
                >
                  {p.title}
                </Link>

                <div className="slides" />
              </section>
            )
          })}
        </div>
      </div>
    )
  }

  _handleOnClick = e => {
    DEFAULT_LEFT['about'] = 33.33
    this.setState({ expanded: null })
  }

  _handleMouseEnter = (index, e) => {
    if (index === 0) {
      DEFAULT_LEFT['about'] = 50
    } else if (index === 2) {
      DEFAULT_LEFT['about'] = 16.66
    }

    this.setState({
      expanded: index
    })
  }

  _handleMouseLeave = (index, e) => {
    if (index === 0) {
      DEFAULT_LEFT['about'] = 33.33
    } else if (index === 2) {
      DEFAULT_LEFT['about'] = 33.33
    }

    this.setState({ expanded: null })
  }
}

export const query = graphql`
  query IndexQuery {
    blog: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
      filter: { frontmatter: { section: { eq: "blog" } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            cover_image {
              publicURL
              childImageSharp {
                sizes(maxWidth: 1240) {
                  srcSet
                }
              }
            }
            section
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    projects: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
      filter: { frontmatter: { section: { eq: "project" } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            cover_image {
              publicURL
              childImageSharp {
                sizes(maxWidth: 1240) {
                  srcSet
                }
              }
            }
            section
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
