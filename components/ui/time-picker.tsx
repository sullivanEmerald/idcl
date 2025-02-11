"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  // Parse initial value if provided
  const parseTime = (timeStr?: string) => {
    if (!timeStr) return { hour: "12", minute: "00", period: "AM" }
    const [time, meridiem] = timeStr.split(" ")
    const [hr, min] = time.split(":")
    return {
      hour: hr || "12",
      minute: min || "00",
      period: meridiem?.toUpperCase() || "AM"
    }
  }

  const { hour: initialHour, minute: initialMinute, period: initialPeriod } = parseTime(value)
  
  const [hour, setHour] = React.useState(initialHour)
  const [minute, setMinute] = React.useState(initialMinute)
  const [period, setPeriod] = React.useState(initialPeriod)

  const handleTimeChange = (newHour?: string, newMinute?: string, newPeriod?: string) => {
    const h = newHour || hour
    const m = newMinute || minute
    const p = newPeriod || period
    
    if (onChange) {
      onChange(`${h}:${m} ${p}`)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value || <span>Pick a time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-4">
        <div className="flex gap-2">
          <Select
            value={hour}
            onValueChange={(value) => {
              const paddedValue = value.padStart(2, "0")
              setHour(paddedValue)
              handleTimeChange(paddedValue)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <SelectItem
                  key={h}
                  value={h.toString().padStart(2, "0")}
                >
                  {h.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={minute}
            onValueChange={(value) => {
              setMinute(value)
              handleTimeChange(undefined, value)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Minute" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                <SelectItem
                  key={m}
                  value={m.toString().padStart(2, "0")}
                >
                  {m.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={period}
            onValueChange={(value) => {
              setPeriod(value)
              handleTimeChange(undefined, undefined, value)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  )
}
