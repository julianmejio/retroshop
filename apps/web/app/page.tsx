import ShoppingCartCalculator from "@/components/shopping-cart/shopping-cart-calculator";
import ShoppingCartWelcomeScreen from "@/components/shopping-cart/shopping-cart-welcome-screen";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-background p-4 lg:p-8">
      <div className="w-full max-w-5xl h-full flex flex-row rounded-2xl overflow-hidden shadow-lg">
        {/* Left panel */}
        <div className="w-1/2 flex  py-16 px-8 flex-col">
          <ShoppingCartWelcomeScreen />
        </div>

        {/* Right panel */}
        <div className="w-1/2 flex items-center justify-center py-16 px-8">
          <ShoppingCartCalculator />
        </div>
      </div>
    </div>
  );
}
