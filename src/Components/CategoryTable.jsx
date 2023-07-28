import * as React from "react";
import { getAllItemsForACategory } from "../Utils/traversalUtils";

var x = {
  CategoryID: 1394,
  CategoryName: "Category 5",
  IsCollection: false,
  DisplayOrder: 5,
  CategoryIsActive: true
};

export function CategoryTable(props) {
  let { category } = props;
  category = category || x;
  const categoryWiseItems = getAllItemsForACategory(category.CategoryID);
  return (
    <table>
      <tbody>
        <caption>{category.CategoryName}</caption>
      </tbody>
    </table>
  );
}
