import { ReactNode } from "react";
import gm from "/gm.svg";
type generatorType = "password" | "nickname";

export function MainLayout({
  typeGenerator,
  actions,
  children,
}: {
  typeGenerator: generatorType;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <div className="z-10 fixed -right-16 top-64 w-[calc(100vw+10rem)] h-[calc(100vw+10rem)] bg-violet-800 blur-[10rem] opacity-15 rounded-full" />
      <div className="relative z-20 w-full h-dvh">
        <div className="w-screen h-full p-4 lg:p-12">
          <div className="w-full h-full flex flex-col justify-between items-center">
            <div className="flex flex-col items-center gap-y-2">
              <div className="flex items-end">
                <h1 className="bg-ben text-transparent bg-clip-text font-extrabold text-center capitalize p-2 xl:p-4 text-5xl tracking-[-0.4rem] leading-9 sm:text-7xl sm:tracking-[-0.55rem] sm:leading-[3.5rem] md:text-9xl md:tracking-[-0.95rem] md:leading-[6.5rem] xl:text-[12rem] xl:tracking-[-1.5rem] xl:leading-[9.5rem] 2xl:text-[17rem] 2xl:tracking-[-2rem] 2xl:leading-[13.5rem]">
                  {typeGenerator}
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
                {children}
              </div>
            </div>
            {actions}
          </div>
        </div>
      </div>
    </>
  );
}
