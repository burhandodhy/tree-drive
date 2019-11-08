import React, { Component } from 'react'

class Loader extends Component {
  render() {
    return (
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
}

export default Loader
