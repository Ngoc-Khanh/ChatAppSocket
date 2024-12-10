"use client";

import { MessageAPI } from "@/api/message.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { IData, IMessageResponse, IMessageSent } from "@/data/types/message.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Paperclip, Plus, Send, User, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useSocket } from "@/providers/socket.provider";

const formSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Please enter a message" })
    .max(500, { message: "Message is too long" })
    .trim(),
});

export default function ConversationForm() {
  const { id } = useParams<{ id: string }>();
  const { socket } = useSocket();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const { data: messages, isLoading } = useQuery<IMessageResponse>({
    queryKey: ["messages", id],
    queryFn: () =>
      id ? MessageAPI.fetchMessages(id) : Promise.resolve("No ID provided"),
    enabled: !!id,
  });

  const [chatMessages, setChatMessages] = useState<IMessageResponse["data"]>(
    []
  );
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const isMessageEmpty = !form.watch("message")?.trim();

  useEffect(() => {
    document.body.classList.add("overflow-y-hidden");
    return () => document.body.classList.remove("overflow-y-hidden");
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }

    if (messages?.data) {
      setChatMessages(messages.data);
    }
  }, [messages]);

  useEffect(() => {
    socket?.on("message", (message: IMessageResponse["data"][0]) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { ...message, role: "receiver" },
      ]);
    });
    return () => {
      socket?.off("message");
    };
  }, []);

  const handleSendMessage = (data: z.infer<typeof formSchema>) => {
    const newMessage: IData = {
      role: "sender",
      content: data.message,
      timestamp: new Date().toISOString(),
    };

    socket?.emit("message", newMessage);
    setChatMessages([...chatMessages, newMessage]);

    const saveMessage: IMessageSent = {
      conversation_id: Number(id),
      message: data.message,
    };
    MessageAPI.saveMessage(saveMessage);
    form.reset({ message: "" });
  };

  return (
    <div className="h-full flex-grow flex">
      <div className="w-full max-w-6xl mx-auto flex flex-col">
        <ScrollArea
          className="flex-grow mb-8 h-[70vh] h-max-[70vh] p-4 overflow-y-auto"
          ref={scrollAreaRef}
        >
          {isLoading && (
            <div className="flex gap-2 h-[70vh] justify-center items-center">
              <Loader2 className="animate-spin" />
              <span>Loading...</span>
            </div>
          )}
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 mb-4 ${
                message.role === "receiver" ? "justify-start" : "justify-end"
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
        </ScrollArea>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSendMessage)}
            className="flex p-4 border-t sticky bottom-0 bg-background"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-end justify-between w-full gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="w-12 h-10 flex-shrink-0"
                      >
                        <Paperclip className="h-4 w-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        className="h-10 flex-shrink-0"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Projects
                      </Button>
                      <Textarea
                        placeholder="Type the message here..."
                        className="flex-grow resize-none min-h-[40px]"
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
                      <Button
                        type="submit"
                        size="icon"
                        className="w-12 h-10 flex-shrink-0"
                        disabled={isMessageEmpty}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
