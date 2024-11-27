import { useState } from "react";
import { Copy, RefreshCcw } from "lucide-react";
import { Button } from "../../components/ui/button";
import { faker } from "@faker-js/faker";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { MainLayout } from "@/layout";

function NicknameView() {
  const [nickname, setNickname] = useState<string>(faker.string.sample());

  function changeNicknameCaracter() {
    setNickname(faker.string.sample());
  }

  return (
    <MainLayout typeGenerator="nickname">
      <div className="relative w-full">
        <Input
          className="pointer-events-none border-2 border-slate-700 border-opacity-15"
          type="text"
          value={nickname}
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={() => changeNicknameCaracter()}
        >
          <span className="text-gray-500 scale-75 transition-transform origin-center hover:-rotate-12">
            <RefreshCcw className="stroke-[3]" />
          </span>
        </div>
      </div>
      <div className={`w-full h-1 sm:w-1 sm:h-full rounded-full`} />
      <Button
        className="w-full sm:w-auto"
        onClick={() => {
          toast.success("Copied password", {
            duration: 1500,
            description: "Password copied to clipboard",
          });
          navigator.clipboard.writeText(nickname);
        }}
      >
        <Copy className="stroke-[3]" />
      </Button>
    </MainLayout>
  );
}

export default NicknameView;
