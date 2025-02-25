import { Skeleton } from "@/app/components/ui/skeleton";

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

      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />

        <div className="flex gap-2.5">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>

        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </main>
  );
};

export default Loading;
