import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  EllipsisVertical,
  ImagePlus,
  Loader2,
  Paperclip,
  Phone,
  Plus,
  Send,
  User,
  Users,
  Video,
} from "lucide-react";
import { IData, IMessages, IMessageSent } from "@/data/types/message.type";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { MessageAPI } from "@/api/message.api";
import { useParams } from "react-router-dom";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/providers/socket.provider";

const formSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Please enter a message" })
    .max(500, { message: "Message is too long" })
    .trim(),
});

export default function ConversationFormV2() {
  const { id } = useParams<{ id: string }>();
  const { socket } = useSocket();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const { data: messages, isLoading } = useQuery<{ data: IData }>({
    queryKey: ["messages", id],
    queryFn: () =>
      id ? MessageAPI.fetchMessages(id) : Promise.resolve("No ID provided"),
    enabled: !!id,
  });

  const [chatMessages, setChatMessages] = useState<IData["messages"]>([]);
  const isMessageEmpty = !form.watch("message")?.trim();
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages?.data?.messages) {
      setChatMessages(messages.data.messages);
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    const handleMessage = (message: IData["messages"][0]) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { ...message, role: "receiver" },
      ]);
      scrollToBottom();
    };

    socket?.on("message", handleMessage);
    return () => {
      socket?.off("message", handleMessage);
    };
  }, [socket]);

  const handleSendMessage = (data: z.infer<typeof formSchema>) => {
    const newMessage: IMessages = {
      role: "sender",
      content: data.message,
      timestamp: new Date().toISOString(),
    };

    socket?.emit("message", newMessage);
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    const saveMessage: IMessageSent = {
      conversation_id: Number(id),
      message: data.message,
    };
    MessageAPI.saveMessage(saveMessage);
    form.reset({ message: "" });
    scrollToBottom();
  };

  return (
    <section className="flex h-full w-full gap-6 sm:overflow-hidden">
      <div className="flex w-full flex-col gap-2">
        <div className="sticky top-0 z-10 -mx-4 bg-background px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none">
          <div className="mb-1 w-full flex flex-none justify-between rounded-t-md bg-secondary p-4 shadow-lg">
            <div className="flex gap-3">
              <Button
                size="icon"
                variant="ghost"
                className="-ml-2 h-full sm:hidden"
              >
                <Send />
              </Button>
              <div className="flex items-center gap-2 lg:gap-4">
                <Avatar className="size-9 lg:size-11">
                  <AvatarImage />
                  <AvatarFallback>
                    <Users className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span className="col-start-2 row-span-2 text-sm font-medium lg:text-base">
                    {messages?.data?.chat_with}
                  </span>
                  <span className="col-start-2 row-span-2 row-start-2 line-clamp-1 block max-w-32 text-ellipsis text-nowrap text-xs text-muted-foreground lg:max-w-none lg:text-sm">
                    TITLE
                  </span>
                </div>
              </div>
            </div>

            <div className="-mr-1 flex items-center gap-1 lg:gap-2">
              <Button size="icon" variant="ghost">
                <Phone />
              </Button>
              <Button size="icon" variant="ghost">
                <Video />
              </Button>
              <Button size="icon" variant="ghost">
                <EllipsisVertical />
              </Button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2 rounded-md px-4 pt-0">
            <div className="flex size-full flex-1 flex-shrink-0">
              <div className="relative -mr-4 flex flex-1 flex-col overflow-y-hidden">
                <div className="flex h-[40rem] w-full flex-grow flex-col justify-start gap-4 overflow-y-auto scroll-sidebar py-2 pb-4 pr-4">
                  {isLoading && (
                    <div className="flex gap-2 h-[70vh] w-full justify-center items-center">
                      <Loader2 className="animate-spin" />
                      <span>Loading...</span>
                    </div>
                  )}
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-4 mb-4 ${
                        message.role === "receiver"
                          ? "justify-start"
                          : "justify-end"
                      } break-words`}
                    >
                      {message.role === "receiver" && (
                        <Avatar className="items-center justify-center rounded-lg">
                          <AvatarImage />
                          <AvatarFallback className="rounded-lg font-bold">
                            <Users className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg p-4 max-w-[50%] ${
                          message.role === "receiver"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-primary text-primary-foreground"
                        } break-words`}
                        ref={messageEndRef}
                      >
                        {message.content}
                      </div>
                      {message.role === "sender" && (
                        <Avatar className="items-center justify-center rounded-lg">
                          <AvatarImage />
                          <AvatarFallback className="rounded-lg font-bold">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSendMessage)}
            className="flex flex-wrap w-full gap-2 border-t bg-background pt-4 sticky bottom-0 sm:gap-4"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex flex-1 items-center gap-2 rounded-md border border-input px-2 py-1 sm:gap-4 lg:gap-4">
                      <div className="space-x-1">
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="h-8 rounded-md sm:inline-flex"
                        >
                          <Plus size={20} className="stroke-muted-foreground" />
                        </Button>
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="hidden h-8 rounded-md lg:inline-flex"
                        >
                          <ImagePlus
                            size={20}
                            className="stroke-muted-foreground"
                          />
                        </Button>
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="hidden h-8 rounded-md lg:inline-flex"
                        >
                          <Paperclip
                            size={20}
                            className="stroke-muted-foreground"
                          />
                        </Button>
                      </div>
                      <label className="flex-1">
                        <Textarea
                          placeholder="Type the message here..."
                          className="w-full bg-inherit resize-none min-h-[40px] max-h-[200px] focus-visible:outline-none"
                          {...field}
                          rows={1}
                          onInput={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => {
                            const textarea = e.target;
                            textarea.style.height = "auto";
                            textarea.style.height = `${Math.min(
                              textarea.scrollHeight,
                              200
                            )}px`;
                          }}
                          onKeyDown={(
                            e: React.KeyboardEvent<HTMLTextAreaElement>
                          ) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              form.handleSubmit(handleSendMessage)();
                            }
                          }}
                        />
                      </label>
                      <Button
                        type="submit"
                        size="icon"
                        className="hidden sm:inline-flex"
                        disabled={isMessageEmpty}
                      >
                        <Send size={20} />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </section>
  );
}
