// Utils to construct a cell, row, column and table.
import * as React from "react";
import {getDropDownItemsForCell} from "../../Utils/traversalUtils";

export function generateRowFromCells(cells) {
    let prevRow = cells[0].RowWiseDisplayOrder, tableRows = [[]], rowCounter = 0;
    const isCollection = cells[0].IsCollection;
    cells.forEach((cell, index) => {

        const cellElement = constructCell(cell)
        tableRows[rowCounter].push(cellElement)

        const nextCell = cells[index+1];
        if(nextCell) {
            if(!(nextCell.RowWiseDisplayOrder === prevRow)) {
                if(rowCounter!=0 && rowCounter!=1 && isCollection) {
                    tableRows[rowCounter].push(constructDeleteButton(prevRow))
                }
                rowCounter++;
                tableRows[rowCounter] = [];
                prevRow = nextCell.RowWiseDisplayOrder;
            }
        }
        if(!nextCell && isCollection && rowCounter!=1) {
            tableRows[rowCounter].push(constructDeleteButton(prevRow))
        }
    })
    return tableRows;
}

function constructDeleteButton(row) {
    return (
        <td data-row={row} data-action={'delete'}  className={'deleteButton'}>
            &#128465; Delete
        </td>
    )
}
function constructCell(cell) {
    const isHeader = cell.IsHeader === "Y";
    let content;
    switch (cell.InputID) {
        case 1 : {
            content = getTextInputCell(cell)
            break
        }

        case 2 : {
            if(typeof cell.Name == "string") {
                content = getTextInputCell(cell)
            }
            else {
                content = getNumpadCell(cell)
            }
            break
        }

        case 3 : {
            content = getDropDownCell(cell)
            break
        }

        case 7 : {
            content = getNormalCell(cell)
            break
        }

        default: {
            content = getNormalCell(cell)
            break
        }
    }
    return isHeader ? <th key={cell.ItemID} className={'cell'}>{content}</th> : <td key={cell.ItemID} className={'cell'}>{content}</td>
}

function getTextInputCell(cell) {
    return (
        <input data-cell={JSON.stringify(cell)} type="text" defaultValue= {cell.Value}/>
    )
}

function getNumpadCell(cell) {
    return (
        <input data-cell={JSON.stringify(cell)} type="number" defaultValue= {cell.Name}/>
    )
}

function getNormalCell(cell) {
    return <div data-cell={JSON.stringify(cell)} >{cell.Name}</div>
}

function getDropDownCell(cell) {
    const dropDownItems = getDropDownItemsForCell(cell);
    return (
        <select data-cell={JSON.stringify(cell)}>
            {dropDownItems.map(item => {
                return(
                    <option data-item={JSON.stringify(item)} selected={cell.Value == item.DropDownValueID}>{item.ListItemName}</option>
                )
            })}
        </select>
    )
}