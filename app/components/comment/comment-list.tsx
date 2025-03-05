"use client";

import { useState, useEffect } from "react";

import CommentItem from "@/app/components/comment/comment-item";

import { Prisma } from "@prisma/client";

interface CommentListProps {
  comments: Prisma.CommentGetPayload<{
    include: { writer: true };
  }>[];
}

const CommentList = ({ comments }: CommentListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (comments.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [comments]);

  if (comments.length === 0) return null;

  return (
    <ul>
      <li
        key={comments[currentIndex].id}
        className="animate-fade-left animate-duration-800"
      >
        <CommentItem comment={comments[currentIndex]} />
      </li>
    </ul>
  );
};

export default CommentList;
