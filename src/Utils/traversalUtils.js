import {data} from "../TableData/data";
import {memoize} from "./memoize";

function getCategoryWiseItems() {
    const items = data.Item;
    let categoryWiseItems = {}, categoryWiseItemsSorted = {}
    items.forEach(item => {
        if(!categoryWiseItems[item.CategoryID]) {
            categoryWiseItems[item.CategoryID] = []
        }
        categoryWiseItems[item.CategoryID].push(item)
    })
    const sortedCategories = getCategoriesSortedMemoized()
    sortedCategories.forEach( ({CategoryID}) => {
        categoryWiseItemsSorted[CategoryID] = categoryWiseItems[CategoryID].sort(itemComparator)
    })
    return categoryWiseItemsSorted;
}
export const getCategoryWiseItemsMemoized = memoize(getCategoryWiseItems)

export function getAllItemsForACategory(categoryId){
    const categoryWiseItems = getCategoryWiseItemsMemoized()
    return categoryWiseItems[categoryId]
}

function getCategoriesSorted() {
    const categories = data.Category;
    return categories.sort(categoryComparator)
}
export const getCategoriesSortedMemoized = memoize(getCategoriesSorted)
function categoryComparator(categoryA, categoryB) {
    return categoryA.DisplayOrder - categoryB.DisplayOrder;
}

function itemComparator(itemA, itemB) {
    if (itemA.RowWiseDisplayOrder === itemB.RowWiseDisplayOrder) {
        return itemA.ColumnWiseDisplayOrder - itemB.ColumnWiseDisplayOrder;
    }
    return itemA.RowWiseDisplayOrder - itemB.RowWiseDisplayOrder;
}

function dropDownItemsComparator(itemA, itemB) {
    return itemA.DisplayOrder - itemB.DisplayOrder
}

export function getDropDownItemsForCell(cell) {
    let dropDownItems = data.ItemData;
    return dropDownItems.filter(item => item.DropDownID === cell.DropDownID)
        .sort(dropDownItemsComparator)
}

export function getDropDownValueIdFromValue(value) {
    let dropDownItems = data.ItemData;
    let index = dropDownItems.findIndex(item => item.ListItemName === value)
    return dropDownItems[index].DropDownValueID;
}