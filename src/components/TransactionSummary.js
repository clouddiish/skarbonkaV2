import TransactionSummaryCard from "./TransactionSummaryCard";

export default function TransactionSummary({ calculateTransactionsSum }) {
  let income = calculateTransactionsSum("Przychód");
  let spending = calculateTransactionsSum("Wydatek");

  return (
    <div className="row">
      <TransactionSummaryCard title="Przychody" value={income} />
      <TransactionSummaryCard title="Wydatki" value={spending} />
      <TransactionSummaryCard title="Bilans" value={income - spending} />
    </div>
  );
}
