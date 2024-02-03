import Feed from "./feed"
import Time from "./time"

const Layout = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4 px-4 pb-4 min-h-screen">
      <div className="order-2 md:order-1">
        <Feed url={'https://feeds.bbci.co.uk/news/rss.xml'} />
      </div>
      <div className="order-1 md:order-2">
        <Time />
      </div>
      <div className="order-3 md:order-3">
        <Feed url={'https://feeds.skynews.com/feeds/rss/home.xml'} />
      </div>
    </div>
  )
}

export default Layout
