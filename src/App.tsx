import { CoffeeList } from './components/CoffeeList/coffeeList'
import './global.css'

export default function App() {
    return (
        <div className="site">
            <div className="hero" />
            <main className="panel">
                <CoffeeList />
            </main>
        </div>
    )
}
