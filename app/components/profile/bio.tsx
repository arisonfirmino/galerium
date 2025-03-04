const Bio = ({ bio }: { bio: string | null }) => {
  return (
    <div className="text-sm">
      <p className="font-medium">bio</p>
      <p className="text-muted-foreground line-clamp-2">
        {bio ? bio : "Este usuário ainda não adicionou uma bio."}
      </p>
    </div>
  );
};

export default Bio;
