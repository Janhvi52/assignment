import { useState, useEffect } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Cookies from 'js-cookie';

const categoryOptions = [
  "Health",
  "Electronics",
  "Travel",
  "Education",
  "Books",
  "Others",
];

const setTransactionsInCookies = (transactions) => {
  Cookies.set('transactions', JSON.stringify(transactions));
};

function getCurrentTimestamp() {
  return new Date().toISOString();
}

function AddTransaction({
  description,
  category,
  dateOfExpense,
  amount,
  setDescription,
  setAmount,
  setCategory,
  setDateOfExpense,
  onSave,
  onClose,
}) {
  return (
    <>
      <h2 className="text-2xl font-bold text-left mb-5">Create New Expense</h2>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
        <form
          onSubmit={(e) => {
            onSave(e);
            onClose();
          }}
          className="flex text-left flex-col mx-auto border-1 border-double border-indigo-600 w-full justify-between my-5"
        >
          <label className="font-bold pb-2">Name</label>
          <input
            type="text"
            className="border bg-slate-200 border-slate-300 rounded-md w-96 px-2 py-2 mb-2"
            placeholder="Name the Expense"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            maxLength="140"
            required
          />
          <label className="font-bold pb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="border bg-slate-200 border-slate-300 rounded-md w-full px-2 py-2 mb-2"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required
          >
            <option value="">Select Category</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label className="font-bold pb-2" htmlFor="date">
            Date of Expense
          </label>
          <input
            type="date"
            id="date"
            className="border bg-slate-200 border-slate-300 rounded-md w-full md:w-auto px-2 py-2 mb-2"
            placeholder="Date of Expense"
            onChange={(e) => setDateOfExpense(e.target.value)}
            value={dateOfExpense}
            required
          />

          <label className="font-bold pb-2">Expense Amount</label>
          <input
            type="number"
            className="border bg-slate-200 border-slate-300 rounded-md w-full px-2 py-2 mb-2"
            placeholder="Expense Amount in INR"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            min="0"
            required
          />
          <button
            className="bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 px-4 py-2 text-white flex items-center"
            type="submit"
          >
            <FaPlus className="mr-2" />
            Create Expense
          </button>
        </form>
      </div>
    </>
  );
}

function EditTransaction({
  description,
  amount,
  category,
  dateOfExpense,
  setDescription,
  setAmount,
  setCategory,
  setDateOfExpense,
  onSave,
  onClose,
}) {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-5">Edit Transaction</h2>
      <form
        onSubmit={(e) => {
          onSave({
            description,
            amount,
            category,
            dateOfExpense,
          });
          onClose();
        }}
        className="flex text-left flex-col mx-auto border-1 border-double border-indigo-600 w-full justify-between my-5"
      >
        <label className="font-bold pb-2">Name</label>
        <input
          type="text"
          className="border bg-slate-200 border-slate-300 rounded-md w-96 px-2 py-2 mb-2"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          maxLength="140"
          required
        />
        <label className="font-bold pb-2" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          className="border bg-slate-200 border-slate-300 rounded-md w-full px-2 py-2 mb-2"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          required
        >
          <option value="">Select Category</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label className="font-bold pb-2" htmlFor="date">
          Date of Expense
        </label>
        <input
          type="date"
          className="border  bg-slate-200 border-slate-300 rounded-md w-full px-2 py-2 mb-2"
          placeholder="Date of Expense"
          onChange={(e) => setDateOfExpense(e.target.value)}
          value={dateOfExpense}
          required
        />
        <label className="font-bold pb-2">Expense Amount</label>

        <input
          type="number"
          className="border bg-slate-200 border-slate-300 rounded-md w-full px-2 py-2 mb-2"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          min="0"
          required
        />
        <button
          className="bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 px-4 py-2 text-white"
          type="submit"
        >
          Save Expense
        </button>
      </form>
    </>
  );
}

function App() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState("");
  const [dateOfExpense, setDateOfExpense] = useState("");
  const [transactions, setTransaction] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isExpenseFound, setIsExpenseFound] = useState(true);
  const loggedInUser = JSON.parse(Cookies.get('loggedInUser'));
  const navigate = useNavigate();

  useEffect(() => {
    const savedTransactions = Cookies.get('transactions');
    if (savedTransactions) {
      setTransaction(JSON.parse(savedTransactions));
    }
  }, []);

  // Save transactions to cookies whenever transactions state changes
  useEffect(() => {
    setTransactionsInCookies(transactions);
  }, [transactions]);

  const editTransaction = (editedTransaction) => {
    const updatedTransactions = transactions.map((t) =>
      t.id === editId ? { ...editedTransaction, updatedAt: getCurrentTimestamp() } : t
    );
    setTransaction(updatedTransactions);
    setEditId(null);
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (editId) {
      const newTransaction = transactions.map((t) =>
        t.id === editId ? { ...t, description, amount, updatedAt: getCurrentTimestamp() } : t
      );
      setTransaction(newTransaction);
      setEditId(null);
    } else {
      const newTransaction = {
        id: Date.now(),
        description,
        category,
        dateOfExpense,
        amount,
        createdBy: loggedInUser.email,
        updatedAt: getCurrentTimestamp(),
      };
      setTransaction([...transactions, newTransaction]);
    }
    setDescription("");
    setAmount(0);
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setDescription(t.description);
    setCategory(t.category);
    setDateOfExpense(t.dateOfExpense);
    setAmount(t.amount);
    setShowEditDialog(true);
  };

  const handleDelete = (id) => {
    setEditId(id);
    setShowDeleteDialog(true);
  };
  const deleteTransaction = (id) => {
    setTransaction((prevTransactions) =>
      prevTransactions.filter((t) => t.id !== id)
    );
    setShowDeleteDialog(false);
    setEditId(null);
  };
  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    const foundExpense = transactions.some((t) =>
      t.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setIsExpenseFound(foundExpense);
  };

  return (
    
    <div className="bg-gray-300 min-h-screen">
      <h1 className="text-3xl font-bold text-center pt-10">
        Personal Finance Tracker
      </h1>
      <div className="container mt-10 mx-auto px-2 md:px-5">
        <div className="p-2 md:p-5 bg-white rounded-lg shadow-lg">
          <div className="my-2 flex flex-col md:flex-row items-center md:space-x-3 justify-between">
            <h2 className="my-4 font-bold text-3xl md:w-1/3">
              MY EXPENSE MANAGER
            </h2>
            <div className="my-4 flex flex-col md:flex-row items-center md:space-x-3 md:w-2/3">
              <div className="w-full md:w-1/2 my-4">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search Expense By Name"
                  className="border border-black-300 rounded-md w-full px-2 py-2 mb-2"
                  value={searchText}
                  maxLength="140"
                  onChange={handleSearch}
                />
              </div>
              <div className="flex flex-wrap md:space-x-3">
                <button
                  className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none text-white border border-black-300 rounded-md w-full md:w-auto px-2 py-2 mb-2"
                  // onClick={handleFilterByDate}
                >
                  Filter by Date of Expense
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-green-200 text-white flex items-center w-full md:w-auto px-2 py-2 mb-2"
                  onClick={() => setShowAddDialog(true)}
                >
                  <FaPlus className="mr-2" />
                  New Expense
                </button>
              </div>
            </div>
          </div>

          {/* Check if any transaction matches the search */}
          {searchText !== "" && (
            <>
              {isExpenseFound ? (
                <div className="p-4 bg-green-100 text-green-800 border border-green-400 rounded">
                  Matching expense found!
                </div>
              ) : (
                <div className="p-4 bg-red-100 text-red-800 border border-red-400 rounded">
                  No such expense found.
                </div>
              )}
            </>
          )}

          <div className="overflow-x-auto max-w-screen-xl mx-auto">
            <table className="w-full table-fixed text-left border border-gray-500 rounded-md mt-4">
              <thead>
                <tr className="bg-gray-400 rounded">
                  <th className="w-1/4 px-4 py-3 border border-gray-500">
                    Name of Expense
                  </th>
                  <th className="w-1/4 px-1 py-2 border border-gray-500">
                    Category
                  </th>
                  <th className="w-1/4 px-2 py-2 border border-gray-500">
                    Date of Expense
                  </th>
                  <th className="w-1/4 px-2 py-2 border border-gray-500">
                    Amount
                  </th>
                  <th className="w-1/4 px-2 py-2 border border-gray-500">
                Created by
              </th>
              <th className="w-1/4 px-2 py-2 border border-gray-500">
                Updated at
              </th>
                  <th className="w-1/4 px-2 py-2 border border-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-gray-300">
                    <td className="py-2 px-2 md:px-4 border border-gray-300">
                      {t.description}
                    </td>
                    <td className="py-2 px-2 md:px-4 border border-gray-300">
                      {t.category}
                    </td>
                    <td className="py-2 px-2 md:px-4 border border-gray-300">
                      {t.dateOfExpense}
                    </td>
                    <td className="py-2 px-2 md:px-4 border border-gray-300">
                      INR {t.amount}
                    </td>
                    <td className="py-2 px-2 md:px-4 border border-gray-300">
                  {t.createdBy === loggedInUser.email ? "me" : t.createdBy}
                </td>
                <td className="py-2 px-2 md:px-4 border border-gray-300">
                  {new Date(t.updatedAt).toLocaleString()}
                </td>
                    <td className="py-2 px-2 md:px-4 border border-gray-300">
                      <div className="flex flex-col md:flex-row md:items-center">
                        <button
                          className="md:mr-4 mb-1 md:mb-0 px-3 py-2 flex items-center"
                          onClick={(e) => handleEdit(t)}
                        >
                          <MdModeEditOutline size={30} />
                        </button>
                        <button
                          className=" px-3 py-1 flex items-center"
                          onClick={(e) => handleDelete(t.id)}
                        >
                          <RiDeleteBin6Fill size={30} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Welcome, {loggedInUser.email}</h2>
      <p className="text-lg text-gray-700 mb-6">You logged in on: {new Date(loggedInUser.loginDate).toLocaleString()}</p>
      <button
        onClick={() => {
          // Handle logout functionality here
          // For example, you can clear the user session and navigate to the login page
          // replace 'login' with your actual login page path
          navigate('/');
        }}
        className="block w-full px-4 py-2 text-center text-white bg-green-500 rounded-lg hover:bg-green-600"
      >
        Logout
      </button>
    </div>
          {showAddDialog && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-5 rounded shadow-lg border border-gray-100">
                <AddTransaction
                  description={description}
                  amount={amount}
                  setDescription={setDescription}
                  setCategory={setCategory}
                  setDateOfExpense={setDateOfExpense}
                  setAmount={setAmount}
                  onSave={(e) => {
                    e.preventDefault();
                    addTransaction(e);
                    setShowAddDialog(false);
                  }}
                  onClose={() => setShowAddDialog(false)}
                />
                <button
                  className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 px-4 py-2 text-white mt-4 w-96"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {showEditDialog && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-5 rounded shadow-lg border border-gray-100">
                <EditTransaction
                  description={description}
                  amount={amount}
                  category={category}
                  dateOfExpense={dateOfExpense}
                  setDescription={setDescription}
                  setCategory={setCategory}
                  setDateOfExpense={setDateOfExpense}
                  setAmount={setAmount}
                  onSave={(editedTransaction) => {
                    editTransaction(editedTransaction);
                    setShowEditDialog(false);
                  }}
                  onClose={() => setShowEditDialog(false)}
                />
                <button
                  className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 px-4 py-2 text-white mt-4 w-96"
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {showDeleteDialog && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-5 rounded shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-center mb-5">
                  Delete Transaction
                </h2>
                <p className="text-center mb-5">
                  Are you sure you want to delete this transaction?
                </p>
                <button
                  className="bg-red-700 hover:bg-red-800 active:bg-red-800 focus:outline-none focus:ring focus:ring-red-300 px-4 py-2 text-white"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  No
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 px-4 py-2 text-white ml-4"
                  onClick={() => {
                    handleDelete(editId);
                    setShowDeleteDialog(false);
                    deleteTransaction(editId);
                    setEditId(null);
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
