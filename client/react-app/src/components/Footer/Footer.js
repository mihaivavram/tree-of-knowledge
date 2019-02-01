import React, { Component } from 'react';
import './Footer.css';


class Footer extends Component {
  render() {
    return (
        <footer className="bg-dark page-footer font-small">
          <div className="footer-copyright text-center text-white py-3">
              © 2019 Copyright: Mihai Avram & Nikolaus Parulian
          </div>
        </footer>
    );
  }
}

export default Footer;
