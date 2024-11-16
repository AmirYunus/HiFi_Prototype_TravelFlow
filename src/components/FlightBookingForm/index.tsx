import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Plane } from 'lucide-react';

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
import { PolicyViolations } from './PolicyViolations';
import { DateRangeInput } from './DateRangeInput';
import { FlightBooking, PolicyRule } from '@/types/flight';
import { airports, policyRules } from '@/data/mockData';

const classOptions = [
  { value: 'economy', label: 'Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First Class' },
];

export default function FlightBookingForm() {
  const [violations, setViolations] = useState<PolicyRule[]>([]);

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
    const currentViolations = policyRules.filter(rule => rule.condition(watchedFields));
    setViolations(currentViolations);
  }, [watchedFields]);

  const onSubmit = async (data: FlightBooking) => {
    console.log('Booking submitted:', data);
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
                options={airports}
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
                options={airports}
                {...field}
                error={errors.toLocation?.message}
              />
            )}
          />
        </div>

        <Controller
          name="dateRange"
          control={control}
          rules={{ required: 'Date range is required' }}
          render={({ field }) => (
            <DateRangeInput
              startDate={field.value.startDate}
              endDate={field.value.endDate}
              onChange={field.onChange}
              error={errors.dateRange?.message}
            />
          )}
        />

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

        <PolicyViolations violations={violations} />

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
            className="w-32"
            disabled={violations.some(v => v.severity === 'error')}
          >
            <Plane className="mr-2 h-4 w-4" />
            Book Flight
          </Button>
        </div>
      </form>
    </Card>
  );
}