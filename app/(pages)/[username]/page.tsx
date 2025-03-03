const Timeline = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const resolvedParams = await params;

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {resolvedParams.username}
    </div>
  );
};

export default Timeline;
