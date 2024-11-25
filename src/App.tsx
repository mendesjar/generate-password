import { useEffect, useState } from "react";
import { Copy, Minus, Plus, RefreshCcw } from "lucide-react";
import { Button } from "./components/ui/button";
import { faker } from "@faker-js/faker";
import { Input } from "./components/ui/input";
import { evaluatePasswordStrength } from "./utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { Slider } from "./components/ui/slider";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import gm from "/gm.svg";

let DEFAULT_INITIAL_VALUE = 5;

function App() {
  const [password, setPassword] = useState<string>(
    faker.string.sample(DEFAULT_INITIAL_VALUE)
  );
  const [passwordLength, setPasswordLength] = useState(DEFAULT_INITIAL_VALUE);
  const [score, setScore] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);

  useEffect(() => {
    const score = evaluatePasswordStrength(password);
    setScore(score);
  }, [password]);

  function passwordCaracter(
    length = passwordLength,
    numbers = includeNumbers,
    symbols = includeSymbols
  ) {
    let password = faker.string.sample(length);
    if (!symbols) {
      password = faker.string.alphanumeric(length);
    }
    if (!numbers) {
      password = faker.string.sample(100).replace(/\d+/g, "").slice(0, length);
    }
    if (!numbers && !symbols) {
      password = faker.string.alpha(length);
    }
    return password;
  }

  function changePasswordCaracter(
    length = passwordLength,
    numbers = includeNumbers,
    symbols = includeSymbols
  ) {
    const string = passwordCaracter(length, numbers, symbols);
    setTimeout(() => typewriter(string, 0, 50));
  }

  function typewriter(text: string, i = 0, time = 100) {
    if (i < text.length) {
      setPassword(text.slice(0, i + 1));
      setTimeout(() => typewriter(text, i + 1), time);
    }
  }

  return (
    <>
      <div className="z-10 fixed -right-16 top-64 w-[calc(100vw+10rem)] h-[calc(100vw+10rem)] bg-violet-800 blur-[10rem] opacity-15 rounded-full" />
      <div className="relative z-20 w-full h-dvh">
        <div className="w-screen h-full p-4 lg:p-12">
          <div className="w-full h-full flex flex-col justify-between items-center">
            <div className="flex flex-col items-center gap-y-2">
              <div className="flex items-end">
                <h1 className="bg-ben text-transparent bg-clip-text font-extrabold text-center p-2 xl:p-4 text-5xl tracking-[-0.4rem] leading-9 sm:text-7xl sm:tracking-[-0.55rem] sm:leading-[3.5rem] md:text-9xl md:tracking-[-0.95rem] md:leading-[6.5rem] xl:text-[12rem] xl:tracking-[-1.5rem] xl:leading-[9.5rem] 2xl:text-[17rem] 2xl:tracking-[-2rem] 2xl:leading-[13.5rem]">
                  Password
                  <br />
                  Generator
                </h1>
                <img
                  src={gm}
                  alt="logomarca"
                  className="w-4 sm:w-6 md:w-8 xl:w-12 m-2 xl:m-4"
                />
              </div>
              <div className="flex flex-wrap sm:flex-nowrap w-[calc(100%-2rem)] sm:w-full items-center space-y-2 sm:space-x-2 sm:space-y-0">
                <div className="relative w-full">
                  <Input
                    className="pointer-events-none border-2 border-slate-700 border-opacity-15"
                    type="text"
                    value={password}
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() =>
                      changePasswordCaracter(
                        passwordLength,
                        includeNumbers,
                        includeSymbols
                      )
                    }
                  >
                    <span className="text-gray-500 scale-75">
                      <RefreshCcw />
                    </span>
                  </div>
                </div>
                <div
                  className={`w-full h-1 sm:w-1 sm:h-full ${score} rounded-full`}
                />
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => navigator.clipboard.writeText(password)}
                >
                  <Copy className="stroke-[3]" />
                </Button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-3">
              {/* <p className="text-center">
                ensure the best security
              </p> */}
              <div className="flex flex-wrap gap-y-4 justify-center sm:justify-between">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="include-numbers"
                      checked={includeNumbers}
                      onCheckedChange={(checked) => {
                        setIncludeNumbers(checked);
                        changePasswordCaracter(passwordLength, checked);
                      }}
                    />
                    <Label htmlFor="include-numbers">Numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="include-symbols"
                      checked={includeSymbols}
                      onCheckedChange={(checked) => {
                        setIncludeSymbols(checked);
                        changePasswordCaracter(
                          passwordLength,
                          includeNumbers,
                          checked
                        );
                      }}
                    />
                    <Label htmlFor="include-symbols">Symbols</Label>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => {
                      const newLength = passwordLength - 1;
                      setPasswordLength(newLength);
                      changePasswordCaracter(newLength);
                    }}
                    disabled={passwordLength <= DEFAULT_INITIAL_VALUE}
                  >
                    <Minus />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{passwordLength}</TooltipTrigger>
                          <TooltipContent className="bg-slate-700 bg-opacity-10 ">
                            <Slider
                              defaultValue={[passwordLength]}
                              min={5}
                              max={50}
                              onValueChange={(value) => {
                                const newLength = value[0];
                                setPasswordLength(newLength);
                                changePasswordCaracter(newLength);
                              }}
                              className="w-24 my-2"
                              step={1}
                            />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-[0.70rem] uppercase text-muted-foreground">
                      Password length:
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => {
                      const newLength = passwordLength + 1;
                      setPasswordLength(newLength);
                      changePasswordCaracter(newLength);
                    }}
                    disabled={passwordLength >= 50}
                  >
                    <Plus />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
