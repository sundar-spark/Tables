import { CategoryTable } from "./Components/CategoryTable/CategoryTable";
import "./styles.css";
import {getCategoriesSortedMemoized} from "./Utils/traversalUtils";

export default function App() {
  const categories = getCategoriesSortedMemoized()
  return (
      <div className={'layout'}>
        <div className={'tablePage'}>
            {categories.map(category =>
                <div key={category.CategoryID} className={'tableContainer'}>
                    <CategoryTable category={category}/>
                </div>
            )}
        </div>
      </div>
  )
}
