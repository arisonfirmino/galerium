"use client";

import { useState } from "react";

import Link from "next/link";

import { Input } from "@/app/components/ui/input";
import Identify from "@/app/components/identify";

import { User } from "@prisma/client";

interface SearchProps {
  users: User[];
}

const Search = ({ users }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUsers, setFoundUsers] = useState<User[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(value.toLowerCase()) ||
          user.firstName.toLowerCase().includes(value.toLowerCase()),
      );
      setFoundUsers(filtered);
    } else {
      setFoundUsers([]);
    }
  };

  return (
    <div className="fixed top-10 right-10 z-10 hidden w-full max-w-xs flex-col gap-5 xl:flex">
      <Input
        type="search"
        placeholder="Busque por um usuário"
        value={searchTerm}
        onChange={handleSearch}
        className="bg-card rounded-2xl"
      />

      {foundUsers.length > 0 && (
        <ul className="space-y-3">
          {foundUsers.map((user) => (
            <li
              key={user.id}
              className="bg-card rounded-2xl border p-1 shadow-sm"
            >
              <Link href={`/${user.username}`}>
                <Identify user={user} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
