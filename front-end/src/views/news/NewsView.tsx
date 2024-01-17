import React, { useState, useEffect } from 'react'
import { ArticleDto } from 'infrastructure/api-client/dto/article.dto'

/*
function NewsView() {
  return <h1>Ciao</h1>
}

export default NewsView
*/

const NewsView: React.FC = () => {
  const [newsList, setNewsList] = useState<ArticleDto[]>([])

  useEffect(() => {
    // Funzione per caricare le prime 10 news dal backend
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news') // Sostituisci con il percorso effettivo del tuo backend
        if (response.ok) {
          const data = await response.json()
          setNewsList(data.slice(0, 10)) // Prendi solo le prime 10 news
        } else {
          console.error('Errore durante il recupero delle news.')
        }
      } catch (error) {
        console.error('Errore durante la richiesta delle news:', error)
      }
    }

    // Chiamata alla funzione per recuperare le news
    fetchNews()
  }, []) // L'array vuoto assicura che useEffect venga eseguito solo al mount

  return (
    <div className="news-container">
      {newsList.map(news => (
        <div key={news.id} className="news-item">
          <h2>{news.title}</h2>
          <p>{news.description.substring(0, 100)}...</p>
          <img src={`data:image/png;base64,${Buffer.from(news.image).toString('base64')}`} alt="News" />
          <a href={`/news/${news.id}`}>Leggi tutto...</a>
        </div>
      ))}
    </div>
  )
}

export default NewsView
