import { Minus, Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { useState } from "react";

function App() {
  const [goal, setGoal] = useState(300);
  return (
    <div className="w-full h-dvh">
      <div className="w-screen h-full p-4 lg:p-12">
        <div className="w-full h-full flex flex-col justify-between items-center">
          <h1 className="bg-ben text-transparent bg-clip-text font-extrabold text-center p-2 xl:p-4 text-5xl tracking-[-0.4rem] leading-9 sm:text-7xl sm:tracking-[-0.55rem] sm:leading-[3.5rem] md:text-9xl md:tracking-[-0.95rem] md:leading-[6.5rem] xl:text-[12rem] xl:tracking-[-1.5rem] xl:leading-[9.5rem] 2xl:text-[17rem] 2xl:tracking-[-2rem] 2xl:leading-[13.5rem]">
            Password
            <br />
            Generator
          </h1>
          <div>
            <p>write a word that is important to you</p>
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => setGoal(goal - 10)}
                disabled={goal <= 200}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => setGoal(goal + 10)}
                disabled={goal >= 400}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
