import React from 'react'
import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  CreatingARWebsiteWithARJS,
  ARBodySystems,
  AugmentedReality,
  Ikea2,
  Industry40,
  Learning,
  Localize,
  Manutenzione,
  RemoteSupport,
  Scarpe
} from 'assets'

function HomeView() {
  const imgPaths = [
    CreatingARWebsiteWithARJS,
    AugmentedReality,
    Ikea2,
    Industry40,
    Learning,
    Localize,
    Manutenzione,
    RemoteSupport,
    Scarpe,
    ARBodySystems // Aggiunto ARBodySystems alla fine dell'array
  ]

  return (
    <div className="container-lg pt-4 px-4" id="claim">
      <div className="row text-center text-black">
        <h1 className="">Realtà Aumentata</h1>
        <h2 className="py-4 px-4">Veloce Introduzione all'uso della Realtà Aumentata nelle Applicazioni Web</h2>
      </div>
      <div className="row pb-5" id="homepage">
        <div className="col-md-6 py-4 justify-content-center text-black">
          <p className="">Da qui potrai:</p>
          <ul>
            <li>Capire cos'è la Realtà Aumentata</li>
            <li className="py-4">Come implementarla nella tua applicazione Web</li>
            <li>Conoscere tutti i fans del corso di laurea di TSI</li>
            <li className="py-4">Iscriverti come fan sfegatato del corso di laurea più figo di tutti</li>
          </ul>
        </div>
        <div className="col-md-6 z-n1">
          <Carousel>
            {imgPaths.map((path, i) => (
              <Carousel.Item key={i}>
                <img
                  className="d-block w-100"
                  src={path}
                  alt={`Immagine esempio AR ${i}`}
                  style={{ height: '300px' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Contenuto specifico per ARBodySystems */}
      {imgPaths.includes(ARBodySystems) && (
        <div className="row pb-5" id="ar-medical">
          <div className="col-md-6">
            <img
              src={ARBodySystems}
              className="mx-auto d-block img-fluid"
              alt="AR Body Systems Medical"
              style={{ height: '300px' }}
            />
          </div>
          <div className="col-md-6 py-4 text-black">
            <h3>Applicazioni della Realtà Aumentata nella Diagnostica Medica</h3>
            <p>
              La Realtà Aumentata (AR) offre un'ampia gamma di applicazioni nella diagnostica medica, rivoluzionando il
              modo in cui vengono effettuate le diagnosi e gestite le operazioni. Attraverso l'utilizzo di dispositivi
              AR, i medici possono visualizzare dati cruciali in tempo reale, migliorando la precisione delle diagnosi e
              semplificando le procedure mediche complesse.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomeView
