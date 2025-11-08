import './global.css'
import { CoffeeList } from './components/CoffeeList/coffeeList'

export default function App() {
    return (
        <div
            className="site"
        >
            <div
                className="hero"
            />
            <main className="panel">
                <CoffeeList />
            </main>
        </div>
    )
}
