import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Search = (props) => {
  return (
    <div className={classNames("search", props.searchClassNames)}>
      {props.showIcon ? <i className={classNames("fas fa-search", props.iconClassNames)}></i> : null }
      <input className={classNames("search-input", props.inputClassNames)} placeholder={props.inputPlaceholder} />
    </div>
  );
}

Search.propTypes = {
  searchClassNames: PropTypes.array,
  inputClassNames: PropTypes.array,
  inputPlaceholder: PropTypes.string,
  iconClassNames: PropTypes.array,
  showIcon: PropTypes.bool
};

export default Search;
