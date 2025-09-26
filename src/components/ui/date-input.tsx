import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DateInputProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export function DateInput({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  disabled = false,
  minDate,
  maxDate,
}: DateInputProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [selectedMonth, setSelectedMonth] = React.useState<Date>(
    date || new Date()
  );

  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, "yyyy-MM-dd"));
    } else {
      setInputValue("");
    }
  }, [date]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    // Try to parse the date if it's in a valid format
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime()) && value.length >= 8) {
      onDateChange(parsedDate);
    }
  };

  const handleInputBlur = () => {
    if (!inputValue) {
      onDateChange(undefined);
      return;
    }

    const parsedDate = new Date(inputValue);
    if (!isNaN(parsedDate.getTime())) {
      onDateChange(parsedDate);
    } else {
      // Reset to previous valid date if input is invalid
      setInputValue(date ? format(date, "yyyy-MM-dd") : "");
    }
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(selectedMonth);
    newDate.setFullYear(parseInt(year));
    setSelectedMonth(newDate);
  };

  const handleMonthChange = (month: string) => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(parseInt(month));
    setSelectedMonth(newDate);
  };

  // Generate year options (current year ± 100 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 201 }, (_, i) => currentYear - 100 + i);
  
  // Month options
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className={cn("relative", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex gap-2">
          <Input
            type="date"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleInputBlur}
            placeholder="YYYY-MM-DD"
            disabled={disabled}
            className="flex-1 h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
          />
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-12 px-3 border-2 border-gray-200 hover:border-primary"
              disabled={disabled}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
        </div>
        
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b">
            <div className="flex gap-2">
              <Select
                value={selectedMonth.getMonth().toString()}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={selectedMonth.getFullYear().toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              onDateChange(selectedDate);
              setIsOpen(false);
            }}
            month={selectedMonth}
            onMonthChange={setSelectedMonth}
            disabled={(date) => {
              if (minDate && date < minDate) return true;
              if (maxDate && date > maxDate) return true;
              return false;
            }}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}