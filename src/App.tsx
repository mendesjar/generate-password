import { useState } from "react";
import { ALargeSmall, ChevronRight, Repeat1 } from "lucide-react";
import { Button } from "./components/ui/button";
import { NicknameView, PasswordView } from "./views";
import { generatorType } from "./types/generator.type";

const points = [
  "left-[10%] opacity-100",
  "left-[30%] opacity-70",
  "left-[25%] opacity-80",
  "left-[44%] opacity-60",
  "left-[50%] opacity-100",
  "left-[75%] opacity-50",
  "left-[88%] opacity-90",
  "left-[58%] opacity-80",
  "left-[98%] opacity-60",
  "left-[65%] opacity-100",
];

function App() {
  const [typeGenerator, setTypeGenerator] = useState<generatorType>("password");

  return (
    <>
      {typeGenerator === "password" ? (
        <PasswordView typeGenerator={typeGenerator} />
      ) : (
        <NicknameView typeGenerator={typeGenerator} />
      )}
      <Button
        className="group z-50 hidden md:flex fixed m-auto top-0 bottom-0 left-14 rounded-full transition-all hover:pl-9 hover:bg-ben hover:ring-2 ring-violet-500"
        onClick={() => {
          const type = typeGenerator === "password" ? "nickname" : "password";
          setTypeGenerator(type);
        }}
      >
        <div className="hidden group-hover:block points_wrapper overflow-hidden w-full h-full pointer-events-none absolute z-40">
          {points.map((classValues, index) => (
            <i
              key={`points-button-${index}`}
              className={`point animate-floating-points -bottom-3 absolute pointer-events-none w-1 h-1 bg-white rounded-full opacity-100 ${classValues}`}
            />
          ))}
        </div>
        {typeGenerator === "password" ? <ALargeSmall /> : <Repeat1 />}{" "}
        <ChevronRight />
      </Button>
    </>
  );
}

export default App;
