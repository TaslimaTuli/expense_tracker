import History from "../Components/History";

export default function Home() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">
            Expense History
        </h1>
        <div >
          <History></History>
        </div>
      </div>
    </div>
  );
}
