import { useState } from "react";
import TransactionAdder from "./TransactionAdder";
import TransactionTableFilter from "./TransactionTableFilter";
import TransactionTable from "./TransactionTable";
import TransactionSummary from "./TransactionSummary";

export default function EditableTransactionTable() {
  const [transactions, setTransactions] = useState([
    {
      id: 0,
      date: "2024-04-16",
      value: 20,
      type: "Wydatek",
      category: "Jedzenie",
    },
    {
      id: 1,
      date: "2024-04-15",
      value: 30,
      type: "Wydatek",
      category: "Jedzenie",
    },
    {
      id: 2,
      date: "2024-04-16",
      value: 200,
      type: "Wydatek",
      category: "Lekarz",
    },
    {
      id: 3,
      date: "2024-04-16",
      value: 2500,
      type: "Przychód",
      category: "Pensja",
    },
    {
      id: 4,
      date: "2024-04-16",
      value: 1000,
      type: "Przychód",
      category: "Babcia",
    },
    {
      id: 5,
      date: "2024-04-17",
      value: 50,
      type: "Wydatek",
      category: "Transport",
    },
    {
      id: 6,
      date: "2024-04-17",
      value: 150,
      type: "Wydatek",
      category: "Jedzenie",
    },
    {
      id: 7,
      date: "2024-04-18",
      value: 300,
      type: "Wydatek",
      category: "Lekarz",
    },
    {
      id: 8,
      date: "2024-04-18",
      value: 500,
      type: "Wydatek",
      category: "Rachunki",
    },
    {
      id: 9,
      date: "2024-04-19",
      value: 80,
      type: "Wydatek",
      category: "Jedzenie",
    },
    {
      id: 10,
      date: "2024-04-19",
      value: 70,
      type: "Wydatek",
      category: "Ubrania",
    },
    {
      id: 11,
      date: "2024-04-20",
      value: 2500,
      type: "Wydatek",
      category: "Rachunki",
    },
    {
      id: 12,
      date: "2024-04-20",
      value: 100,
      type: "Wydatek",
      category: "Transport",
    },
    {
      id: 13,
      date: "2024-04-21",
      value: 1500,
      type: "Przychód",
      category: "Pensja",
    },
    {
      id: 14,
      date: "2024-04-21",
      value: 200,
      type: "Wydatek",
      category: "Ubrania",
    },
    {
      id: 15,
      date: "2024-04-16",
      value: 100,
      type: "Wydatek",
      category: "Babcia",
    },
  ]);

  // states to filter transactions table
  const [selectedType, setSelectedType] = useState("Wszystko");
  const [selectedCategory, setSelectedCategory] = useState("Wszystko");

  // states to add new transaction
  const [newDate, setNewDate] = useState("");
  const [newValue, setNewValue] = useState(20);
  const [newType, setNewType] = useState("Wydatek");
  const [newCategory, setNewCategory] = useState("");

  // states to edit an existing transaction
  const [editDate, setEditDate] = useState("");
  const [editValue, setEditValue] = useState(-1);
  const [editType, setEditType] = useState("Wydatek");
  const [editCategory, setEditCategory] = useState("");

  // filtered transactions by selected type and category
  let filteredTransactions = transactions;
  if (selectedType === "Wszystko" && selectedCategory !== "Wszystko") {
    filteredTransactions = transactions.filter((transaction) => {
      return transaction.category === selectedCategory;
    });
  } else if (selectedType !== "Wszystko" && selectedCategory === "Wszystko") {
    filteredTransactions = transactions.filter((transaction) => {
      return transaction.type === selectedType;
    });
  } else if (selectedType !== "Wszystko" && selectedCategory !== "Wszystko") {
    filteredTransactions = transactions.filter((transaction) => {
      return (
        transaction.type === selectedType &&
        transaction.category === selectedCategory
      );
    });
  }

  // add a new transaction to the transactions array
  const addTransaction = () => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        id: prevTransactions[prevTransactions.length - 1].id + 1,
        date: newDate,
        value: newValue,
        type: newType,
        category: newCategory,
      },
    ]);
  };

  // delete the transaction with a given id from the transactions array
  const deleteTransaction = (id) => {
    let newTransactions = transactions.filter((transaction) => {
      return transaction.id !== id;
    });
    setTransactions(newTransactions);
  };

  // set the new values of the transactions with a given id with the values from the edit input
  const editTransaction = (id) => {
    let newTransactions = transactions.map((transaction) => {
      if (transaction.id === id) {
        return {
          id: id,
          date: editDate,
          value: editValue,
          type: editType,
          category: editCategory,
        };
      } else {
        return transaction;
      }
    });
    setTransactions(newTransactions);
  };

  // calculate categories set
  let categories = new Set();
  categories.add("Wszystko");

  transactions.forEach((transaction) => {
    categories.add(transaction.category);
  });

  // create JSX options to insert from the categories set
  let options = [];

  categories.forEach((category) => {
    options.push(
      <option key={category} value={category}>
        {category}
      </option>
    );
  });

  // calculate the summary values
  const calculateTransactionsSum = (type) => {
    let sum = 0;

    for (let transaction of filteredTransactions) {
      if (transaction.type === type) sum = sum + transaction.value;
    }
    return sum;
  };

  // render the components
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2 col-sm-12 order-md-last mb-5">
          <h2 className="visually-hidden">Podsumowanie</h2>
          <TransactionSummary
            calculateTransactionsSum={calculateTransactionsSum}
          />
        </div>
        <div className="col-md-10 col-sm-12">
          <h2 className="my-3">Dodaj nową transakcję</h2>
          <TransactionAdder
            options={options}
            onNewDateChange={setNewDate}
            onNewValueChange={setNewValue}
            onNewTypeChange={setNewType}
            onNewCategoryChange={setNewCategory}
            onAddTransaction={addTransaction}
          />

          <h2 className="mt-3">Filtruj listę transakcji</h2>
          <TransactionTableFilter
            options={options}
            onSelectedTypeChange={setSelectedType}
            onSelectedCategoryChange={setSelectedCategory}
          />

          <h2 className="visually-hidden">Tabela transakcji</h2>
          <TransactionTable
            transactions={filteredTransactions}
            selectedType={selectedType}
            selectedCategory={selectedCategory}
            onDeleteTransaction={deleteTransaction}
            options={options}
            onEditDateChange={setEditDate}
            onEditValueChange={setEditValue}
            onEditTypeChange={setEditType}
            onEditCategoryChange={setEditCategory}
            onSaveEditTransaction={editTransaction}
          />
        </div>
      </div>
    </div>
  );
}
