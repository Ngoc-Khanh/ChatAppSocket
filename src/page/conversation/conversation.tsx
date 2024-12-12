import ConversationForm from "./components/conversation-form";
import ConversationFormV2 from "./components/conversation-form.v2";

export default function ConversationPage() {
  return (
    <div className="flex items-center justify-center py-4">
      <ConversationFormV2 />
      {/* <ConversationForm /> */}
    </div>
  );
}
