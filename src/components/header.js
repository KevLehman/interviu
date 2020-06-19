import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle }) => (
  <header
    style={{
      marginBottom: '1.45rem',
    }}
    className="bg-green-600"
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
      className="flex flex-row justify-between "
    >
      <div className="flex flex-col self-center">
        <h1 className="text-5xl leading-none">
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <p className="text-xs text-white text-questions">A single place for all your questions</p>
      </div>
      <div className="flex flex-col self-center">
        <div className="bg-green-600 inline-block rounded-t text-white font-semibold text-lg">
          <Link to="/">Questions</Link>
        </div>
        <div className="bg-green-600 inline-block rounded-t text-white font-semibold text-lg">
          <Link to="/reporting">Reporting</Link>
        </div>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
