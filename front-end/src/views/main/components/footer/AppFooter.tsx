import React, { useState } from 'react'
import './AppFooter.style.scss'
import { Monogram } from 'assets'

function AppFooter() {
  const [isClicked, setIsClicked] = useState(false)

  const handleLogoClick = () => {
    setIsClicked(!isClicked)
  }

  return (
    <footer>
      <div className="container-fluid text-white rounded-top-4 footerStyle">
        <div className={`row ${isClicked ? 'clicked' : ''}`}>
          <div className="col-12 d-flex align-items-center footer-logo-column">
            {/* Logo a sinistra */}
            <img src={Monogram} alt="Logo" className="footer-logo" onClick={handleLogoClick} />

            <div className="mx-auto text-center">
              {/* Testo al centro orizzontalmente */}
              <h3 className="pt-3 footer-text">Developed By</h3>
              <ul className="list-unstyled footer-text">
                <li>Giacomo Ghinelli</li>
                <li>Fabio Tiralongo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
