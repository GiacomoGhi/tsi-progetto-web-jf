import React from 'react'
import './AppNavigationMenu.style.scss'
import { LogoBlu } from 'assets'
import { Link } from 'react-router-dom'

function AppNavigationMenu() {
  //TODO
  // Qui si può applicare il codice per far scomparire il menu
  // quando si scrolla in basso
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
                  style={{ maxHeight: '100px' }}
                />
              </a>
              <button
                className="navbar-toggler navLink"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDarkNavbar"
                aria-controls="offcanvasDarkNavbar"
                aria-label="Toggle navigation">
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
                      <Link to="/" className="p-3 nav-link text-white text-center">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item me-4 mb-1">
                      <Link to="/" className="p-3 nav-link text-white text-center">
                        Impara
                      </Link>
                    </li>
                    <li className="nav-item me-4 mb-1">
                      <Link to="/" className="p-3 nav-link text-white text-center">
                        Iscriviti
                      </Link>
                    </li>
                    <li className="nav-item me-4 mb-1">
                      <Link to="/" className="p-3 nav-link text-white text-center">
                        Bacheca
                      </Link>
                    </li>
                    <li className="nav-item me-4 mb-1">
                      <Link to="/" className="p-3 nav-link text-white text-center">
                        Novità
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
