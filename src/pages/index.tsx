import { useState } from "react";
import Loading from "./components/Loading";
import Head from "next/head";
import Link from "next/link";
export default function Home() {
  const [budget, setBudget] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [extra, setExtra] = useState<string>("");
  const [response, setResponse] = useState<string>("Nothing to show here!");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse("");
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
    <>
     <Head>
        <title>Event Ease</title>
        <meta name="description" content="helps you to organize your next big event.. " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="bg-white md:w-1/2 flex justify-center items-center px-20 py-10">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="text-4xl font-bold text-[#3B3B3B]">
            Welcome to the Event Ease
          </h1>
          <p className="mt-3 text-lg text-[#3B3B3B]">
            Let us help you plan the perfect event!
          </p>
          <div className="mt-5">
            <label htmlFor="budget" className="font-bold text-[#3B3B3B]">
              Budget:
              <span className="ml-1 text-gray-500 text-sm">(in $)</span>
            </label>
            <input
              autoComplete="off"
              type="number"
              id="budget"
              className="border border-gray-400 rounded-md p-2 w-full mt-2"
              onChange={(event) => setBudget(Number(event.target.value))}
              value={budget}
              required
            />
          </div>
          <div className="mt-5">
            <label htmlFor="location" className="font-bold text-[#3B3B3B]">
              Location:
              <span className="ml-1 text-gray-500 text-sm">(e.g. India)</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              id="location"
              className="border border-gray-400 rounded-md p-2 w-full mt-2"
              onChange={(event) => setLocation(event.target.value)}
              value={location}
              required
            />
          </div>
          <div className="mt-5">
            <label htmlFor="size" className="font-bold text-[#3B3B3B]">
              No. of Guests/Participants:
            </label>
            <input
              autoComplete="off"
              type="text"
              id="size"
              className="border border-gray-400 rounded-md p-2 w-full mt-2"
              onChange={(event) => setSize(event.target.value)}
              value={size}
              required
            />
          </div>
          <div className="mt-5">
            <label htmlFor="type" className="font-bold text-[#3B3B3B]">
              Type of event:
              <span className="ml-1 text-gray-500 text-sm">
                (e.g. hackathon, conference)
              </span>
            </label>
            <input
              autoComplete="off"
              type="text"
              id="type"
              className="border border-gray-400 rounded-md p-2 w-full mt-2"
              onChange={(event) => setType(event.target.value)}
              value={type}
              required
            />
          </div>
          <div className="mt-5">
            <label htmlFor="extra" className="font-bold text-[#3B3B3B]">
              Any other specifications:
            </label>
            <input
              autoComplete="off"
              type="text"
              id="extra"
              className="border border-gray-400 rounded-md p-2 w-full mt-2"
              onChange={(event) => setExtra(event.target.value)}
              value={extra}
              />
          </div>
          <button
            type="submit"
            className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full"
            >
            Generate Plan
          </button>
          <div className="flex justify-center my-10">
            <p>Made By - </p>
            <div className="text-blue-500 font-semibold">
          <Link href="https://twitter.com/theanuragdev"> @theanuragdev</Link>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-[#191825] md:w-1/2 flex justify-center items-center">
        {response && (
          <div className="text-white text-lg p-10">
            {response.split("\n").map((e) => (
              <p>{e}</p>
            ))}
          </div>
        )}
        {loading && (
            <Loading />
        )}
      </div>
    </div>
            </>
  );
}
