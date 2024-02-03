import Feed from './components/feed'
import Header from './components/header'

const App = () => {
  return (
    <div className='container mx-auto px-4 md:px-0'>
      <div className="pt-12 pb-16">
        <Header />
      </div>
      <div className="grid md:grid-cols-2 gap-12 pb-8">
      <Feed url={'https://feeds.bbci.co.uk/news/rss.xml'} />
      <Feed url={'https://feeds.skynews.com/feeds/rss/home.xml'} />
      </div>
    </div>
  )
}

export default App
