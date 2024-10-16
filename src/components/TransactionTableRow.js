export default function TransactionTableRow({
  id,
  date,
  value,
  type,
  category,
  onDeleteTransaction,
  onEditTransaction,
}) {
  return (
    <tr>
      <td>{date}</td>
      <td>{value}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>
        <button
          onClick={() => onEditTransaction(id)}
          type="button"
          className="btn btn-light"
        >
          Edytuj
        </button>
      </td>
      <td>
        <button
          onClick={() => onDeleteTransaction(id)}
          type="button"
          className="btn btn-light"
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
