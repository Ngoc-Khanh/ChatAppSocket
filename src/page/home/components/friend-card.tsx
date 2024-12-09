import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Friend {
  id: number;
  name: string;
  age: number;
  location: string;
  interests: string[];
  imageUrl: string;
}

interface FriendCardProps {
  friend: Friend;
}

export default function FriendCard({ friend }: FriendCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={friend.imageUrl} alt={friend.name} />
            <AvatarFallback>
              {friend.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{friend.name}</h3>
            <p className="text-sm text-gray-500">
              {friend.age} • {friend.location}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {friend.interests.map((interest) => (
              <Badge key={interest} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted p-6">
        <Button className="w-full">Add Friend</Button>
      </CardFooter>
    </Card>
  );
}
