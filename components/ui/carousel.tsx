import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type BaseCarouselProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>

export interface CarouselProps extends BaseCarouselProps {
  children?: React.ReactNode;
  onSelect?: (index: number) => void;
}

export interface CarouselContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface CarouselItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface CarouselDotsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CarouselContext = React.createContext<{
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  numItems: number;
}>({ selectedIndex: 0, setSelectedIndex: () => null, numItems: 0 });

export function Carousel({ className, children, onSelect, ...props }: CarouselProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [numItems, setNumItems] = React.useState(0);

  React.useEffect(() => {
    const items = document.querySelectorAll('[role="group"] > *');
    setNumItems(items.length);
  }, []);

  const handleSelect = React.useCallback((index: number) => {
    setSelectedIndex(index);
    onSelect?.(index);
  }, [onSelect]);

  return (
    <CarouselContext.Provider
      value={{ selectedIndex, setSelectedIndex: handleSelect, numItems }}
    >
      <div className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  children,
  ...props
}: CarouselContentProps) {
  const { selectedIndex } = React.useContext(CarouselContext);

  return (
    <div className={cn("overflow-hidden", className)} {...props}>
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
        role="group"
      >
        {children}
      </div>
    </div>
  );
}

export function CarouselItem({
  className,
  children,
  ...props
}: CarouselItemProps) {
  return (
    <div className={cn("flex-none w-full", className)} {...props}>
      {children}
    </div>
  );
}

export function CarouselPrevious({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { selectedIndex, setSelectedIndex, numItems } =
    React.useContext(CarouselContext);

  return (
    <button
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white",
        className
      )}
      onClick={() =>
        setSelectedIndex((selectedIndex - 1 + numItems) % numItems)
      }
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </button>
  );
}

export function CarouselNext({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { selectedIndex, setSelectedIndex, numItems } =
    React.useContext(CarouselContext);

  return (
    <button
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white",
        className
      )}
      onClick={() => setSelectedIndex((selectedIndex + 1) % numItems)}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
    </button>
  );
}

export function CarouselDots({ className, ...props }: CarouselDotsProps) {
  const { selectedIndex, setSelectedIndex, numItems } =
    React.useContext(CarouselContext);

  return (
    <div
      className={cn(
        "absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2",
        className
      )}
      {...props}
    >
      {Array.from({ length: numItems }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "h-1.5 rounded-full transition-all",
            selectedIndex === index ? "w-4 bg-white" : "w-1.5 bg-white/50"
          )}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
    </div>
  );
}
