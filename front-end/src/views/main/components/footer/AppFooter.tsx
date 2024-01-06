import React from 'react'
import './AppFooter.style.scss'
function AppFooter() {
  return (
    <footer>
      <div className="container-fluid text-white text-center rounded-top-4 footerStyle">
        <div className="row">
          <div className="col-12">
            <h3 className="pt-3">Developed By</h3>
            <ul className="list-unstyled">
              <li>Giacomo Ghinelli</li>
              <li className="py-1">Fabio Tiralongo</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
