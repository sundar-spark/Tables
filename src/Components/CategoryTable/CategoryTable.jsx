import * as React from "react";
import {getAllItemsForACategory, getDropDownValueIdFromValue} from "../../Utils/traversalUtils";
import {generateRowFromCells} from "./tableUtils";
import {useState} from "react";

export function CategoryTable(props) {
  let { category } = props;

  const [cells, setCells] = useState(getAllItemsForACategory.bind(this, category.CategoryID));
  const [tableRows, setTableRows] = useState(generateRowFromCells.bind(this, cells))
  const isCollection = cells[0].IsCollection;
  function onTableChange(event) {
      const newValue = event.target.value;
      const cellId = JSON.parse(event.target.dataset.cell).ItemID;
      const index = cells.findIndex(cell => cell.ItemID === cellId)
      const updatedData = [...cells];
      if(updatedData[index].InputID != 3) {
          updatedData[index] = {...updatedData[index], Name: newValue}
          setCells(updatedData);
          setTableRows(generateRowFromCells(updatedData))
      }
      else {
          updatedData[index] = {...updatedData[index], Value: getDropDownValueIdFromValue(newValue)}
          setCells(updatedData);
          setTableRows(generateRowFromCells(updatedData))
      }
  }

  function addNewRow() {
      const lastRowNumber = cells[cells.length - 1].RowWiseDisplayOrder
      let lastRowCells = []
      for(let i = cells.length - 1; i > 0; i--) {
          if(cells[i].RowWiseDisplayOrder === lastRowNumber) {
              let newCell = JSON.parse(JSON.stringify(cells[i]));
              newCell.RowWiseDisplayOrder = newCell.RowWiseDisplayOrder + 1
              newCell.ItemID = newCell.ItemID * 7
              lastRowCells.unshift(newCell)
          }
          else {
              break;
          }
      }
      const updatedCells = [...cells, ...lastRowCells]
      setCells(updatedCells)
      setTableRows(generateRowFromCells(updatedCells))
  }

  return (
    <table onChange={onTableChange} className={'table'} >
      <caption>{category.CategoryName}</caption>
      <tbody>
      {tableRows.map((row, index) => (
          <tr key={`${index}-${tableRows[index][0].RowWiseDisplayOrder}`}>
              {row.map(cell => cell)}
          </tr>
      ))}
      {
          isCollection ?
              <tr>
                  <td className={'cell addRow'} onClick={addNewRow} >
                      &#x271A; Add new row
                  </td>
              </tr>
              :
              <></>
      }
      </tbody>
    </table>
  );
}
