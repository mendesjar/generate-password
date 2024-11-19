import { useEffect, useState } from "react";
import { Copy, Minus, Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { faker } from "@faker-js/faker";
import { Input } from "./components/ui/input";
import { evaluatePasswordStrength } from "./utils";

let DEFAULT_INITIAL_VALUE = 5;

function App() {
  const [password, setPassword] = useState<string>(
    faker.string.alphanumeric(DEFAULT_INITIAL_VALUE)
  );
  const [passwordLength, setPasswordLength] = useState(DEFAULT_INITIAL_VALUE);
  const [score, setScore] = useState<string>("");

  useEffect(() => {
    const score = evaluatePasswordStrength(password);
    setScore(score);
  }, [password]);

  return (
    <>
      <div className="z-10 fixed -right-16 top-64 w-[calc(100vw+10rem)] h-[calc(100vw+10rem)] bg-violet-800 blur-[10rem] opacity-15 rounded-full" />
      <div className="relative z-20 w-full h-dvh">
        <div className="w-screen h-full p-4 lg:p-12">
          <div className="w-full h-full flex flex-col justify-between items-center">
            <div className="flex flex-col items-center">
              <h1 className="bg-ben text-transparent bg-clip-text font-extrabold text-center p-2 xl:p-4 text-5xl tracking-[-0.4rem] leading-9 sm:text-7xl sm:tracking-[-0.55rem] sm:leading-[3.5rem] md:text-9xl md:tracking-[-0.95rem] md:leading-[6.5rem] xl:text-[12rem] xl:tracking-[-1.5rem] xl:leading-[9.5rem] 2xl:text-[17rem] 2xl:tracking-[-2rem] 2xl:leading-[13.5rem]">
                Password
                <br />
                Generator
              </h1>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  className="pointer-events-none"
                  type="text"
                  value={password}
                />
                <Button onClick={() => navigator.clipboard.writeText(password)}>
                  <Copy />
                  {score}
                </Button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-3">
              <p className="text-muted-foreground text-center">
                ensure the best security
              </p>
              <div className="flex justify-between">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => {
                      const newLength = passwordLength - 1;
                      setPasswordLength(newLength);
                      setPassword(faker.string.alphanumeric(newLength));
                    }}
                    disabled={passwordLength <= DEFAULT_INITIAL_VALUE}
                  >
                    <Minus />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">
                      {passwordLength}
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
                      setPassword(faker.string.alphanumeric(newLength));
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
