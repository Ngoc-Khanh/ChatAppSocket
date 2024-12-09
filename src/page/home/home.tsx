import { SearchBar } from "./components/search-bar"
import { FilterSection } from "./components/filter-section"
import FriendList from "./components/friend-list"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Friends</h1>
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <aside>
          <FilterSection />
        </aside>
        <main>
          <SearchBar />
          <FriendList />
        </main>
      </div>
    </div>
  )
}