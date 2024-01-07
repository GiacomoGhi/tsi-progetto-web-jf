import React, { useEffect } from 'react'
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
import App from 'App'

function HomeView() {
  const imgPaths = [
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
  ]

  const fetchItems = async () => {
    const { apiClient } = App
    const res = await apiClient.users.paged({
      from: 1,
      to: 20
    })
    console.log(res)
  }

  useEffect(() => {
    fetchItems()
  }, [])

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
        <div
          id="carouselExampleAutoplaying"
          className="col-md-6 z-n1 carousel align-self-center slide carousel-fade"
          data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={imgPaths[0]} className="mx-auto d-block img-fluid" alt="Immagine esempio AR" />
            </div>
            {imgPaths.map((path, i) => {
              if (i !== 0)
                return (
                  <div className="carousel-item" key={i}>
                    <img src={path} className="mx-auto d-block img-fluid" alt="Immagine esempio AR" />
                  </div>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeView
