import { comingSoon } from "@/lib/fonts";
import { SignIn } from "@clerk/nextjs";

export default function AuthLoginPage() {
  const buttonCn = "rounded-sm bg-pink-200  border-pink-300 border-solid border-2 shadow-none! hover:bg-pink-300 font-bold"
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-pink-50">
      <SignIn
        appearance={{
          elements: {
            cardBox: `${comingSoon.className} border-pink-200 border-solid border-2 bg-pink-100 rounded-sm shadow-none`,
            card: "rounded-sm p-6 bg-pink-100",
            input: "border-2 bg-pink-100 border-pink-200 rounded-sm p-2",
            socialButtonsBlockButton: `${buttonCn} p-3`,
            formButtonPrimary: `${buttonCn} !font-black p-3`,
            alternativeMethodsBlockButton: `${buttonCn}`,
          },
        }}
      />
    </div>
  );
}
