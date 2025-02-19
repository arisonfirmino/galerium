import { Skeleton } from "@/app/components/ui/skeleton";
import { Separator } from "@/app/components/ui/separator";

const Loading = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-5 p-5">
      <div className="flex items-center gap-5">
        <Skeleton className="h-[52px] w-[244px]" />
        <Skeleton className="h-10 w-10" />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <div className="w-full max-w-[448px] space-y-5">
          <Skeleton className="h-[170px] w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="aspect-square w-full md:max-w-[230px]" />
      </div>

      <Separator className="w-full max-w-[698px]" />

      <div className="flex w-full max-w-[698px] items-center gap-5">
        <Skeleton className="h-[52px] w-full" />
        <Skeleton className="h-[52px] w-full" />
        <Skeleton className="h-[52px] w-full" />
      </div>
    </main>
  );
};

export default Loading;
