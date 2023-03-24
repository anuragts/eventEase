import { useState } from "react";

export default function Plan() {
  const [budget, setBudget] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [extra, setExtra] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ budget, location, size, type, extra }),
      });
      const data = await res.json();
      setResponse(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
    <div className="flex flex-col items-center justify-center  py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to the Event Ease</h1>
        <p className="mt-3 text-lg">Let us help you plan the perfect event!</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-5"
        >
          <label htmlFor="budget" className="mt-5 font-bold">
            Budget:
            <span className="ml-1 text-gray-500 text-sm">(in $)</span>
          </label>
          <input
            type="number"
            id="budget"
            className="border border-gray-400 rounded-md p-2 w-64"
            onChange={(event) => setBudget(Number(event.target.value))}
            value={budget}
            required
          />
          <label htmlFor="location" className="mt-5 font-bold">
            Location:
            <span className="ml-1 text-gray-500 text-sm">(e.g. India)</span>
          </label>
          <input
            type="text"
            id="location"
            className="border border-gray-400 rounded-md p-2 w-64"
            onChange={(event) => setLocation(event.target.value)}
            value={location}
            required
          />
          <label htmlFor="size" className="mt-5 font-bold">
            No. of Guests/Participants:
          </label>
          <input
            type="text"
            id="size"
            className="border border-gray-400 rounded-md p-2 w-64"
            onChange={(event) => setSize(event.target.value)}
            value={size}
            required
          />
          <label htmlFor="type" className="mt-5 font-bold">
            Type of event :
            <span className="ml-1 text-gray-500 text-sm">
              (e.g. hackathon, conference)
            </span>
          </label>
          <input
            type="text"
            id="type"
            className="border border-gray-400 rounded-md p-2 w-64"
            onChange={(event) => setType(event.target.value)}
            value={type}
            required
          />
          <label htmlFor="extra" className="mt-5 font-bold">
            Any other specifications:
          </label>
          <input
            type="text"
            id="extra"
            className="border border-gray-400 rounded-md p-2 w-64"
            onChange={(event) => setExtra(event.target.value)}
            value={extra}
          />
          <button
            type="submit"
            className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Generate Plan
          </button>
        </form>
        {loading && (
          <p className="text-center my-5 10">Generating a perfect plan...</p>
        )}
      
      </main>
    </div>
    <div className="flex justify-center mx-[6rem] bg-gray-800">
      {response && (
          <div className="mt-5 text-lg">
            {response.split("\n").map((e) => (
              <p>{e}</p>
            ))}
          </div>
        )}
    </div>
    </div>
  );
}
