import dynamic from "next/dynamic"
import Footer from "../components/Footer/Footer"
import { PostCard } from "../components/PostCard"

const isEven = (n: number) => n % 2 === 0
const Header = dynamic(() => import("../components/Header/Header"), {
  ssr: false,
  // eslint-disable-next-line
  loading: () => <div>Loading...</div>,
})

const Home = () => {
  return (
    <div className="px-4 pb-4 container mx-auto" style={{ maxWidth: "1200px" }}>
      <Header />
      <main>
        {[1, 2, 3, 4, 5, 6].map(n => (
          <PostCard key={n} left={isEven(n)} />
        ))}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home
