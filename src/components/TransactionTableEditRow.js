export default function TransactionTableEditRow({
  id,
  options,
  onEditDateChange,
  onEditValueChange,
  onEditTypeChange,
  onEditCategoryChange,
  onSaveEditTransaction,
  onEditTransaction,
}) {
  const handleOnSaveEditTransaction = (id) => {
    onSaveEditTransaction(id);
    onEditTransaction(-1);
  };

  return (
    <tr>
      <td>
        <input
          type="date"
          className="form-control"
          onChange={(e) => onEditDateChange(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          step="0.01"
          placeholder={20}
          className="form-control"
          onChange={(e) => onEditValueChange(Number(e.target.value))}
        />
      </td>
      <td>
        <select
          className="form-control"
          onChange={(e) => onEditTypeChange(e.target.value)}
        >
          <option value="Wydatek">Wydatek</option>
          <option value="Przychód">Przychód</option>
        </select>
      </td>
      <td>
        <input
          list="elistaKategorii"
          className="listaKategorii form-control"
          onChange={(e) => onEditCategoryChange(e.target.value)}
        />
        <datalist id="elistaKategorii">{options}</datalist>
      </td>
      <td>
        <button
          className="save btn btn-light"
          onClick={() => handleOnSaveEditTransaction(id)}
        >
          Zapisz
        </button>
      </td>
    </tr>
  );
}
