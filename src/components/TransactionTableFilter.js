export default function TransactionTableFilter({
  options,
  onSelectedTypeChange,
  onSelectedCategoryChange,
}) {
  return (
    <form>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="ftyp" className="my-2">
            Typ:
          </label>
          <select
            id="ftyp"
            className="form-select"
            onChange={(e) => onSelectedTypeChange(e.target.value)}
          >
            <option value="Wszystko">Wszystko</option>
            <option value="Wydatek">Wydatek</option>
            <option value="Przychód">Przychód</option>
          </select>
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="fkategorie" className="my-2">
            Kategoria:
          </label>
          <select
            id="fkategorie"
            className="form-select"
            onChange={(e) => onSelectedCategoryChange(e.target.value)}
          >
            {options}
          </select>
        </div>
      </div>
    </form>
  );
}
