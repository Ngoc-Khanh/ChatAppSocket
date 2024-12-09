import FriendCard from "./friend-card";

const mockFriends = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 28,
    location: "New York",
    interests: ["Reading", "Hiking"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 32,
    location: "Los Angeles",
    interests: ["Photography", "Cooking"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Carol Williams",
    age: 25,
    location: "Chicago",
    interests: ["Music", "Travel"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
];

export default function FriendList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockFriends.map((friend) => (
        <FriendCard key={friend.id} friend={friend} />
      ))}
    </div>
  );
}
