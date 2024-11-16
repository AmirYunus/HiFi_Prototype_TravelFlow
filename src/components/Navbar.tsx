import { Plane, User, Menu, Hotel, Car } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-blue-600 p-2 text-white">
              <Plane className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-gray-900">TravelFlow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className="bg-blue-600 text-white hover:text-blue-700 hover:bg-blue-50 flex items-center gap-2 font-medium"
            >
              <Plane className="h-4 w-4" />
              Flights
            </Button>
            <Button 
              variant="ghost" 
              className="bg-blue-600 text-white hover:text-blue-700 hover:bg-blue-50 flex items-center gap-2 font-medium"
            >
              <Hotel className="h-4 w-4" />
              Hotels
            </Button>
            <Button 
              variant="ghost" 
              className="bg-blue-600 text-white hover:text-blue-700 hover:bg-blue-50 flex items-center gap-2 font-medium"
            >
              <Car className="h-4 w-4" />
              Car Rental
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <p className="font-medium text-gray-900">John Doe</p>
                <p className="text-gray-500">Premium Member</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-blue-600">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-6">
                <Button 
                  variant="ghost" 
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center gap-2 justify-start font-medium"
                >
                  <Plane className="h-4 w-4" />
                  Flights
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center gap-2 justify-start font-medium"
                >
                  <Hotel className="h-4 w-4" />
                  Hotels
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center gap-2 justify-start font-medium"
                >
                  <Car className="h-4 w-4" />
                  Car Rental
                </Button>
                <div className="h-px bg-gray-200" />
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-gray-500">Premium Member</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
} 