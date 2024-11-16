import FlightBookingForm from './components/FlightBookingForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 pt-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Your Flight</h1>
            <p className="text-lg text-gray-600">Find and book the perfect flight for your journey</p>
          </div>
          <FlightBookingForm />
        </div>
      </main>
    </div>
  );
}

export default App;