import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IConversation } from "@/data/types/conversations.type";
import { ConversationAPI } from "@/api/conversations.api";
import { useStateUser } from "@/providers/user.provider";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export function NavConversation() {
  const { user } = useStateUser();

  const { data: conversation, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: ConversationAPI.getConversations,
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });

  const friendAccount = useMemo(
    () => (item: IConversation) => {
      return item.user1_name !== user?.name ? item.user1_name : item.user2_name;
    },
    [user]
  );

  const formatTime = useMemo(
    () => (datetime: string) => {
      const now = new Date();
      const date = new Date(datetime);
      const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      const diffDays = Math.floor(diffMinutes / (60 * 24));

      if (diffDays > 7) {
        return date.toLocaleDateString("en-GB"); // formats as dd/mm/yyyy
      } else if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      } else if (diffMinutes >= 60) {
        const hours = Math.floor(diffMinutes / 60);
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
      } else {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const isPM = hours >= 12;
        const formattedHours = hours % 12 || 12;
        return `${formattedHours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")} ${isPM ? "PM" : "AM"}`;
      }
    },
    []
  );
  
  return (
    <>
      {isLoading ? (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 p-2 py-3 whitespace-nowrap border-b c text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <div className="flex items-center space-x-2">
                <Skeleton className="h-10 w-10 rounded-3xl items-center" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        conversation?.data.map((item: IConversation) => (
          <Link
            key={item.conversation_id}
            to={`/conversation/${item.conversation_id}`}
            className="flex items-center justify-between gap-2 p-2 py-3 whitespace-nowrap border-b c text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10 rounded-3xl items-center">
                <AvatarImage src="" alt={friendAccount(item)} />
                <AvatarFallback className="rounded-3xl">
                  {friendAccount(item)
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="gap-2 items-start">
                <span className="line-clamp-1 text-sm font-semibold whitespace-break-spaces">
                  {friendAccount(item)}
                </span>
                <div className="line-clamp-1 text-xs text-gray-500 whitespace-break-spaces">
                  <i>{item.last_message}</i>
                </div>
              </div>
            </div>
            <span className="ml-auto text-xs">
              {formatTime(item.last_message_time)}
            </span>
          </Link>
        ))
      )}
    </>
  );
}
