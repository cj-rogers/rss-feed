import { XMLParser } from 'fast-xml-parser'
import { useEffect, useState } from 'react'
import { formatDistance } from 'date-fns/formatDistance'
import { formatRelative } from 'date-fns/formatRelative'

const DEFAULT_ARTICLE_LENGTH = 10

type TProps = {
  url: string
}

type TImage = {
  url: string,
  title: string,
  link: string,
}

type TArticle = {
  guid: string,
  link: string,
  title: string,
  description: string,
  pubDate: Date,
}[]

function formatTimestamp (timestamp: Date) {
  return formatDistance(timestamp, new Date(), {
    addSuffix: true
  })
}

const Feed = ({ url }: TProps) => {
  const parser = new XMLParser()
  const URL = `https://worker-raspy-mode-79fc.cj-rogers.workers.dev/?${url}`
  const [title, setTitle] = useState('')
  const [updated, setUpdated] = useState<Date>(new Date())
  const [image, setImage] = useState<TImage>({
    url: '',
    title: '',
    link: '',
  })
  const [articles, setArticles] = useState<TArticle>([])
  const [articlesShown, setArticlesShown] = useState(DEFAULT_ARTICLE_LENGTH)
  
  useEffect(() => {
    const fetchArticles = async () => {
      const xmlString = await fetch(URL).then(res => res.text())
      const { rss } = parser.parse(xmlString)
      const feed = rss?.channel
      setTitle(feed?.title)
      setUpdated(feed?.lastBuildDate)
      setImage(feed?.image)
      setArticles(feed?.item)
    }
    fetchArticles()
  }, [])

  function updateArticlesShown () {
    if (articlesShown + DEFAULT_ARTICLE_LENGTH < articles.length) {
      return setArticlesShown(articlesShown + DEFAULT_ARTICLE_LENGTH)
    }

    setArticlesShown(articles.length)
  }

  if (articles.length === 0) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <div>
      <div className='sticky top-0 bg-white/90 h-24 flex flex-col gap-2 justify-center'>
        <a href={image.link} className='flex gap-4 items-center' target='_blank' rel='noreferrer'>
          <img className='w-24 h-auto' src={image.url} alt={image.title} />
          <h2 className='text-base font-semibold text-pretty text-gray-900'>{title}</h2>
        </a>
        <time className='text-xs'>Updated: {formatRelative(updated, new Date())}</time>
      </div>
      <div className='divide-y divide-gray-200'>
        {articles.slice(0, articlesShown).map((article) => (
          <a key={article.guid} href={article.guid} className='block group py-2 mt-2' target='_blank' rel='noreferrer'>
            <h3 className='text-base font-semibold text-pretty text-gray-900 mb-2 leading-6 group-hover:underline'>{article.title}</h3>
            <p className='text-sm text-pretty text-gray-500 line-clamp-3 leading-6'>{article.description}</p>
            <time dateTime={article.pubDate.toString()} className='block text-xs text-right text-gray-500'>{formatTimestamp(article.pubDate)}</time>
          </a>
        ))}
        {articles.length > articlesShown
          ? 
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mx-auto mt-2" onClick={updateArticlesShown}>
            <span>Show more</span>
          </button> 
         : null
        }
        
      </div>
    </div>
  )
}

export default Feed
