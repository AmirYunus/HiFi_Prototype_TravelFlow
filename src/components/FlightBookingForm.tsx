import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useForm, Controller } from 'react-hook-form';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AutoComplete } from '@/components/ui/autocomplete';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Plane } from 'lucide-react';

// Mock data for demonstration
const mockAirports = [
  { code: 'JFK', name: 'New York JFK' },
  { code: 'LAX', name: 'Los Angeles International' },
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'CDG', name: 'Paris Charles de Gaulle' },
  { code: 'DXB', name: 'Dubai International' },
];

const mockPolicyRules = [
  {
    id: '1',
    condition: (booking: FlightBooking) =>
      booking.class === 'first' && 
      new Date(booking.dateRange.startDate).getDay() === 0,
    message: 'First class bookings are not allowed on Sundays',
    severity: 'error' as 'error' | 'warning' | 'info',
  },
];

interface Airport {
  code: string;
  name: string;
}

interface FlightBooking {
  fromLocation: Airport;
  toLocation: Airport;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  class: 'economy' | 'business' | 'first';
}

const classOptions = [
  { value: 'economy', label: 'Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First Class' },
];

export interface PolicyRule {
  id: string;
  condition: (booking: FlightBooking) => boolean;
  message: string;
  severity: 'info' | 'warning' | 'error';
}

export default function FlightBookingForm() {
  const [policyViolations, setPolicyViolations] = useState<PolicyRule[]>([]);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<FlightBooking>({
    defaultValues: {
      fromLocation: { code: '', name: '' },
      toLocation: { code: '', name: '' },
      dateRange: {
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      class: 'economy',
    },
  });

  const watchedFields = watch();

  useEffect(() => {
    const violations = mockPolicyRules.filter(rule => rule.condition(watchedFields));
    setPolicyViolations(violations);
  }, [watchedFields]);

  const onSubmit = async (data: FlightBooking) => {
    console.log('Booking submitted:', data);
    // Handle booking submission
  };

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="fromLocation"
            control={control}
            rules={{ required: 'From location is required' }}
            render={({ field }) => (
              <AutoComplete
                label="From"
                options={mockAirports}
                {...field}
                error={errors.fromLocation?.message}
              />
            )}
          />
          <Controller
            name="toLocation"
            control={control}
            rules={{ required: 'To location is required' }}
            render={({ field }) => (
              <AutoComplete
                label="To"
                options={mockAirports}
                {...field}
                error={errors.toLocation?.message}
              />
            )}
          />
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <Controller
            name="dateRange"
            control={control}
            rules={{ required: 'Date range is required' }}
            render={({ field }) => (
              <DateRangePicker
                ranges={[{
                  startDate: field.value.startDate,
                  endDate: field.value.endDate,
                  key: 'selection'
                }]}
                onChange={(ranges) => {
                  if (ranges.selection) {
                    field.onChange({
                      startDate: ranges.selection.startDate,
                      endDate: ranges.selection.endDate
                    });
                  }
                }}
                minDate={new Date()}
                maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
                className="w-full"
              />
            )}
          />
        </div>

        <Controller
          name="class"
          control={control}
          rules={{ required: 'Class is required' }}
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Class</label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.class && (
                <p className="text-sm text-red-500">{errors.class.message}</p>
              )}
            </div>
          )}
        />

        {policyViolations.length > 0 && (
          <div className="space-y-2">
            {policyViolations.map((violation) => (
              <div
                key={violation.id}
                className={cn(
                  "p-4 rounded-lg flex items-center space-x-3",
                  {
                    'bg-red-50 text-red-800': violation.severity === 'error',
                    'bg-yellow-50 text-yellow-800': violation.severity === 'warning',
                    'bg-blue-50 text-blue-800': violation.severity === 'info',
                  }
                )}
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{violation.message}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            className="w-32"
          >
            Save Draft
          </Button>
          <Button
            type="submit"
            className="w-32 bg-blue-600 hover:bg-blue-700"
            disabled={policyViolations.some(v => v.severity === 'error')}
          >
            <Plane className="mr-2 h-4 w-4" />
            Book Flight
          </Button>
        </div>
      </form>
    </Card>
  );
}