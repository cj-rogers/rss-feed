import Feed from './components/feed'
import Header from './components/header'

const App = () => {
  const randomString = Math.random().toString(36).substring(2,7)

  return (
    <div className='max-w-[90%] mx-auto px-[2.5%]'>
      <div className="pt-12 pb-16">
        <Header />
      </div>
      <div className="grid md:grid-cols-2 gap-12 pb-8">
      <Feed url={`https://feeds.bbci.co.uk/news/rss.xml?nocache=${randomString}`} />
      <Feed url={`https://feeds.skynews.com/feeds/rss/home.xml?nocache=${randomString}`} />
      </div>
    </div>
  )
}

export default App
