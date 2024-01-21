import React, { useState, useRef } from 'react'
import './AppNavigationMenu.style.scss'
import { LogoBlu } from 'assets'
import { Link } from 'react-router-dom'

function AppNavigationMenu() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleLinkClick = () => {
    // Close the offcanvas when a link is clicked
    if (closeButtonRef.current && isOffcanvasOpen) {
      closeButtonRef.current.click()
    }
    setIsOffcanvasOpen(false)
  }

  const handleToggleClick = () => {
    // Toggle the offcanvas state when the toggle button is clicked
    setIsOffcanvasOpen(!isOffcanvasOpen)
  }

  return (
    <div className="container-fluid rounded-bottom-4 z-3 ps-5 navBar">
      <div className="row my-0 py-0 ">
        <div className="px-0">
          <nav className="navbar navbar-expand-md navbar-dark">
            <div className="container-lg mt-md-1">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://corsi.unibo.it/laurea/TecnologieSistemiInformatici">
                <img
                  id="logo"
                  src={LogoBlu}
                  className="img-fluid mx-2"
                  alt="Logo unibo - link per sito web TSI"
                  style={{ maxHeight: '80px' }}
                />
              </a>
              <button
                ref={closeButtonRef}
                id="closeButton"
                className="navbar-toggler navLink"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDarkNavbar"
                aria-controls="offcanvasDarkNavbar"
                aria-label="Toggle navigation"
                onClick={handleToggleClick}>
                <span className="navbar-toggler-icon img-fluid"></span>
              </button>
              <div
                className="offcanvas offcanvas-end text-bg-dark"
                tabIndex={-1}
                id="offcanvasDarkNavbar"
                aria-labelledby="offcanvasDarkNavbarLabel">
                <div className="offcanvas-header mb-2">
                  <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                    Menù
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
                </div>
                <div className="offcanvas-body" id="nav_bar">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item me-4 mb-1">
                      <Link to="/" className="p-3 nav-link text-white text-center" onClick={handleLinkClick}>
                        Home
                      </Link>
                    </li>
                    <li className="nav-item me-4 mb-1">
                      <Link to="/news" className="p-3 nav-link text-white text-center" onClick={handleLinkClick}>
                        News
                      </Link>
                    </li>
                    <li className="nav-item me-4 mb-1">
                      <Link to="/community" className="p-3 nav-link text-white text-center" onClick={handleLinkClick}>
                        Community
                      </Link>
                    </li>
                    <li className="nav-item me-4 mb-1">
                      <Link to="/profile" className="p-3 nav-link text-white text-center" onClick={handleLinkClick}>
                        Profile
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default AppNavigationMenu
