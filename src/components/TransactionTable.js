import { useState } from "react";
import TransactionTableEditRow from "./TransactionTableEditRow";
import TransactionTableRow from "./TransactionTableRow";

export default function TransactionTable({
  transactions,
  onDeleteTransaction,
  options,
  onEditDateChange,
  onEditValueChange,
  onEditTypeChange,
  onEditCategoryChange,
  onSaveEditTransaction,
}) {
  const [editableID, setEditableID] = useState(-1);

  let rows = transactions.map((transaction) => {
    if (transaction.id === editableID) {
      return (
        <TransactionTableEditRow
          key={transaction.id}
          id={transaction.id}
          options={options}
          onEditDateChange={onEditDateChange}
          onEditValueChange={onEditValueChange}
          onEditTypeChange={onEditTypeChange}
          onEditCategoryChange={onEditCategoryChange}
          onSaveEditTransaction={onSaveEditTransaction}
          onEditTransaction={setEditableID}
        />
      );
    } else {
      return (
        <TransactionTableRow
          key={transaction.id}
          id={transaction.id}
          date={transaction.date}
          value={transaction.value}
          type={transaction.type}
          category={transaction.category}
          onDeleteTransaction={onDeleteTransaction}
          onEditTransaction={setEditableID}
        />
      );
    }
  });

  return (
    <table className="table my-3">
      <thead>
        <tr>
          <th>Data</th>
          <th>Wartość</th>
          <th>Typ</th>
          <th>Kategoria</th>
          <th>Edytuj</th>
          <th>Usuń</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
