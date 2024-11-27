import { useState } from "react";
import { Copy, Minus, Plus, RefreshCcw } from "lucide-react";
import { Button } from "../../components/ui/button";
import { faker } from "@faker-js/faker";
import { Input } from "../../components/ui/input";
import { evaluatePasswordStrength } from "../../utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Slider } from "../../components/ui/slider";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import { MainLayout } from "@/layout";

let DEFAULT_INITIAL_VALUE = 5;

function PasswordView() {
  const [password, setPassword] = useState<string>(
    faker.string.sample(DEFAULT_INITIAL_VALUE)
  );
  const [passwordLength, setPasswordLength] = useState(DEFAULT_INITIAL_VALUE);
  const [score, setScore] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);

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
    const score = evaluatePasswordStrength(string);
    setScore(score);
    setTimeout(() => typewriter(string, 0, 50));
  }

  function typewriter(text: string, i = 0, time = 100) {
    if (i < text.length) {
      setPassword(text.slice(0, i + 1));
      setTimeout(() => typewriter(text, i + 1), time);
    }
  }

  return (
    <MainLayout
      typeGenerator="password"
      actions={
        <div className="w-full flex flex-col gap-y-3">
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
                      <TooltipTrigger className="bg-transparent">
                        {passwordLength}
                      </TooltipTrigger>
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
      }
    >
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
          <span className="text-gray-500 scale-75 transition-transform origin-center hover:-rotate-12">
            <RefreshCcw className="stroke-[3]" />
          </span>
        </div>
      </div>
      <div className={`w-full h-1 sm:w-1 sm:h-full ${score} rounded-full`} />
      <Button
        className="w-full sm:w-auto"
        onClick={() => {
          toast.success("Copied password", {
            duration: 1500,
            description: "Password copied to clipboard",
          });
          navigator.clipboard.writeText(password);
        }}
      >
        <Copy className="stroke-[3]" />
      </Button>
    </MainLayout>
  );
}

export default PasswordView;
