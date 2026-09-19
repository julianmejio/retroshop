export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-background p-4 lg:p-8">
      <div className="w-full max-w-5xl h-full flex flex-row rounded-2xl overflow-hidden shadow-lg">
        {/* Left panel */}
        <div className="w-1/2 flex items-center justify-center bg-pink-500 py-16 px-8">
          <p>Offer here</p>
        </div>

        {/* Right panel */}
        <div className="w-1/2 flex items-center justify-center bg-blue-500 py-16 px-8">
          <p>Shopping cart here</p>
        </div>
      </div>
    </div>
  );
}
