import Header from "@/app/components/header/header";
import ThemeSwitch from "@/app/components/theme-switch";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-5 p-5">
      <div className="flex items-center gap-5">
        <Header />
        <ThemeSwitch />
      </div>
      {children}
    </main>
  );
};

export default Container;
